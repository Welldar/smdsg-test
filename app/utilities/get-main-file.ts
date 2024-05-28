import type { ZipInfo } from 'unzipit'

export function getMainHTMLFile(entries: ZipInfo['entries']) {
  for (const [name, entry] of Object.entries(entries)) {
    if (name.includes('.html')) {
      return entry
    }
  }
}
