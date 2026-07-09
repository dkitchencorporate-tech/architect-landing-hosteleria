import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Vercel inyecta automáticamente los encabezados de geolocalización en cada petición
    const city = req.headers.get('x-vercel-ip-city') || req.headers.get('x-real-ip-city') || 'Madrid';
    const country = req.headers.get('x-vercel-ip-country') || req.headers.get('x-real-ip-country') || 'ES';
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    return NextResponse.json({
      city: decodeURIComponent(city),
      country_name: country === 'ES' ? 'España' : country,
      ip: ip.split(',')[0].trim()
    });
  } catch (err: any) {
    return NextResponse.json({
      city: 'Madrid',
      country_name: 'España',
      error: err.message
    });
  }
}
