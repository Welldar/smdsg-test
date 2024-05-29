export function proxySrc(media: Element) {
  const src = media.getAttribute('src')

  if (!src) return

  const searchParams = new URLSearchParams({ url: src })

  media.setAttribute('src', `/proxy?${searchParams}`)
  media.setAttribute('crossorigin', 'anonymous')
}
