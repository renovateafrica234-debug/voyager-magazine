import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerClient } from '@/lib/supabase';

const TIER_MAP: Record<number, string> = {
  500:  'starter',
  900:  'premium',
  1500: 'founder',
};

function getTierFromAmount(amountKobo: number): string {
  const naira = amountKobo / 100;
  return TIER_MAP[naira] || 'starter';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature') || '';
    const secret = process.env.PAYSTACK_SECRET_KEY || '';

    const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');

    if (hash !== signature) {
      console.error('Paystack webhook: invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);
    const { event: eventType, data } = event;

    console.log(`Paystack webhook received: ${eventType}`);

    const supabase = createServerClient();

    if (eventType === 'charge.success') {
      const { reference, amount, customer, metadata } = data;
      const user_id = metadata?.user_id;
      const tier = metadata?.tier || getTierFromAmount(amount);
      const email = customer?.email;

      if (!user_id) {
        console.error('Webhook: no user_id in metadata', metadata);
        return NextResponse.json({ received: true, warning: 'No user_id' });
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          subscription_tier: tier,
          subscription_status: 'active',
          updated_at: new Date().toISOString(),
        })
        .eq('id', user_id);

      if (profileError) {
        console.error('Webhook: profile update failed', profileError);
        return NextResponse.json({ error: 'Profile update failed' }, { status: 500 });
      }

      await supabase.from('payment_logs' as any).upsert({
        user_id,
        tier,
        amount: amount / 100,
        reference,
        status: 'success',
        email,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'reference' }).catch(console.error);

      console.log(`✅ Subscription updated: user ${user_id} → ${tier}`);
    }

    if (eventType === 'subscription.disable' || eventType === 'invoice.payment_failed') {
      const user_id = data?.metadata?.user_id || data?.customer?.metadata?.user_id;
      if (user_id) {
        await supabase
          .from('profiles')
          .update({ subscription_status: 'inactive', updated_at: new Date().toISOString() })
          .eq('id', user_id)
          .catch(console.error);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
