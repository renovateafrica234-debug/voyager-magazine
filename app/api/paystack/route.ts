import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

const PLAN_MAP: Record<string, { name: string; amount: number }> = {
  starter:  { name: 'Voyager Starter',  amount: 50000  },
  premium:  { name: 'Voyager Premium',  amount: 90000  },
  founder:  { name: 'Voyager Founder',  amount: 150000 },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tier, user_id, email } = body as { tier: string; user_id: string; email: string };

    if (!tier || !user_id || !email) {
      return NextResponse.json({ error: 'tier, user_id, and email are required' }, { status: 400 });
    }

    const plan = PLAN_MAP[tier];
    if (!plan) {
      return NextResponse.json({ error: `Invalid tier. Choose: ${Object.keys(PLAN_MAP).join(', ')}` }, { status: 400 });
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      return NextResponse.json({ error: 'Paystack not configured' }, { status: 500 });
    }

    const callback_url = `${process.env.NEXT_PUBLIC_APP_URL || 'https://voyager-magazine.vercel.app'}/profile?payment=success`;

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: plan.amount,
        callback_url,
        metadata: {
          user_id,
          tier,
          plan_name: plan.name,
          custom_fields: [
            { display_name: 'Plan', variable_name: 'plan', value: plan.name },
            { display_name: 'User ID', variable_name: 'user_id', value: user_id },
          ],
        },
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      console.error('Paystack init error:', paystackData);
      return NextResponse.json({ error: 'Paystack initialization failed', detail: paystackData.message }, { status: 502 });
    }

    try {
      const supabase = createServerClient();
      await supabase.from('payment_logs' as any).insert({
        user_id,
        tier,
        amount: plan.amount / 100,
        reference: paystackData.data.reference,
        status: 'pending',
        created_at: new Date().toISOString(),
      });
    } catch (_) {
      // Non-critical
    }

    return NextResponse.json({
      success: true,
      authorization_url: paystackData.data.authorization_url,
      reference: paystackData.data.reference,
      access_code: paystackData.data.access_code,
    });

  } catch (error) {
    console.error('Paystack POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
