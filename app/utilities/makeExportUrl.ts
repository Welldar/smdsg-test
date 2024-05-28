export function makeExportUrl(url: string) {
  const exportZip = '/export?format=zip'
  const href =
    /https:\/\/docs\.google\.com\/(?:spreadsheets|document)\/d\/(?:[a-zA-Z0-9\-_]+)/i.exec(
      url
    )

  if (!href) return

  return href[0] + exportZip
}
