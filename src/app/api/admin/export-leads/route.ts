import { NextResponse } from 'next/server';
import { getLeadAnalytics } from '@/lib/analytics';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { from, to, columns } = body || {};
    if (!from || !to) return NextResponse.json({ status: 'error', message: 'missing range' }, { status: 400 });

    const { leads } = await getLeadAnalytics(from, to);

    const cols = Array.isArray(columns) && columns.length ? columns : ['name','phone','email','source','utm_source','utm_campaign','created_at'];

    // Build CSV rows
    const rows = leads.map(l => cols.map((c: string) => (l[c] ?? '')));
    const header = cols;

    // csv-stringify is not in deps; build simple CSV
    const csv = [header.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\n');

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="leads_export_${from}_${to}.csv"`,
      },
    });
  } catch (err: any) {
    console.error('[export-leads] error', err);
    return NextResponse.json({ status: 'error', message: 'internal' }, { status: 500 });
  }
}
