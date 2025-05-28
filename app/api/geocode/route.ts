import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address parameter is required' }, { status: 400 });
  }

  try {
    const normalized = address.toLowerCase().trim();
    if (normalized === 'n/a' || normalized === 'virtual' || normalized === '') {
      return NextResponse.json({ lat: 42.3601, lng: -71.0589 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const encoded = encodeURIComponent(address);
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${apiKey}`
    );
    const data = await res.json();

    if (data.status === 'OK' && data.results.length > 0) {
      return NextResponse.json(data.results[0].geometry.location);
    } else {
      console.error('Geocoding error for address:', address, data.error_message || data.status);
      return NextResponse.json(
        { lat: 42.3601, lng: -71.0589, error: data.error_message || data.status },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error in geocoding API:', error);
    return NextResponse.json(
      { lat: 42.3601, lng: -71.0589, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
