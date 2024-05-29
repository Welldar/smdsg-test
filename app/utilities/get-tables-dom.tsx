import { ZipInfo } from 'unzipit'

export async function getTablesDOM(
  filenames: string[],
  entriesTable: ZipInfo['entries']
) {
  const uniqueFileNames = [...new Set(filenames)]
  const tablesHTML = await Promise.all(
    uniqueFileNames.map((filename) => entriesTable[filename + '.html'].text())
  )
  const parser = new DOMParser()
  const tablesDOM = tablesHTML.map(
    (tableHTML, ind) =>
      [
        uniqueFileNames[ind],
        parser.parseFromString(tableHTML, 'text/html'),
      ] as const
  )
  return new Map(tablesDOM)
}
