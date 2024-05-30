export function proxySrc(media: Element) {
  const src = media.getAttribute('src')

  if (!src) return

  const searchParams = new URLSearchParams({ url: src })

  // had to make it an absolute url to make img work in .docx
  media.setAttribute(
    'src',
    `https://smdsg-test.vercel.app/api/proxy?${searchParams}`
  )
  media.setAttribute('crossorigin', 'anonymous')
}
