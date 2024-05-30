import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) return NextResponse.json('', { status: 400 })

  const mediaResponse = await fetch(url, { cache: 'no-cache' })

  return new NextResponse(await mediaResponse.blob(), {
    headers: { 'Access-Control-Allow-Origin': '*' },
  })
}
