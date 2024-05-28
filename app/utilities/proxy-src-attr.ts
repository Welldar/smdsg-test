export function proxySrc(rows: HTMLTableRowElement[]) {
  rows
    .map((row) => row.querySelectorAll('[src]'))
    .forEach((mediaList) =>
      mediaList.forEach((media) => {
        const src = media.getAttribute('src')

        if (!src) return

        const searchParams = new URLSearchParams({ url: src })
        media.setAttribute('src', `/api/proxy?${searchParams}`)
      })
    )
}
