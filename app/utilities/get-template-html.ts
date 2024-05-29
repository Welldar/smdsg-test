import type { ZipInfo } from 'unzipit'

export function getTemplateHTML(entries: ZipInfo['entries']) {
  for (const [name, entry] of Object.entries(entries)) {
    if (name.includes('.html')) {
      return entry.text()
    }
  }
}
