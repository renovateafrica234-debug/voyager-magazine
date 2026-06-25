import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { action, articleId, content } = await req.json();

    if (action === 'apply_direct') {
      const { error } = await supabase
        .from('articles')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', articleId);

      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Changes applied.' });
    }

    return NextResponse.json({ success: true, message: 'Changes discarded.' });
  } catch (error) {
    console.error('Apply error:', error);
    return NextResponse.json({ error: 'Failed to apply changes.' }, { status: 500 });
  }
}
