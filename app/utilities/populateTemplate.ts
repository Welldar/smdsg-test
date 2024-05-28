import { unzip } from 'unzipit'
import { decodeHTML } from './decodeHTML'
import { makeExportUrl } from './makeExportUrl'
import { filterEmptyColumns, isNotEmptyRow } from './filterTable'
import { getMainHTMLFile } from './getMainFile'
import { proxySrc } from './proxySrc'

export async function populateTemplateHTML(
  tableUserUrl: string,
  templateUserUrl: string
) {
  const [tableUrl, templateUrl] = [
    makeExportUrl(tableUserUrl),
    makeExportUrl(templateUserUrl),
  ]

  if (!tableUrl || !templateUrl) return

  const [{ entries: entriesTable }, { entries: entriesTemplate }] =
    await Promise.all([unzip(tableUrl), unzip(templateUrl)])

  const templateEntry = getMainHTMLFile(entriesTemplate)

  if (!templateEntry) return

  const templateDoc = decodeHTML(await templateEntry.text())
  const placeholders = [...templateDoc.matchAll(/{[^{}]+(?:-\d+){2,4}}/gi)]
  const placeholderParams = placeholders.map((regExpExec) =>
    regExpExec[0].slice(1, -1).split('-')
  )
  const tablesPending = new Map<string, Promise<string>>()

  placeholderParams.forEach((params) => {
    const [filename] = params

    if (tablesPending.has(filename)) return

    tablesPending.set(filename, entriesTable[filename + '.html'].text())
  })

  const tablesDOM = new Map(
    await Promise.all(
      [...tablesPending.entries()].map(async (tableRecord) => {
        const [filename, tablePromise] = tableRecord
        const tableHTML = await tablePromise
        const parser = new DOMParser()
        const document = parser.parseFromString(tableHTML, 'text/html')

        return Promise.all([filename, document])
      })
    )
  )

  return placeholderParams.reduce((template, params, ind) => {
    let [filename, column1, row1, column2, row2] = params

    column2 = column2 ? column2 : column1
    row2 = row2 ? row2 : row1

    let rows = [...tablesDOM.get(filename)!.querySelectorAll('tr')]
      .slice(+row1, +row2 + 1)
      .map((row) => {
        const newRow = row.cloneNode(true) as HTMLTableRowElement
        newRow.replaceChildren(
          ...[...row.querySelectorAll('td')].slice(
            // rewrite to css selector nth-child
            +column1 - 1,
            +column2
          )
        )

        return newRow
      })
      .filter(isNotEmptyRow)

    rows = filterEmptyColumns(rows)
    proxySrc(rows)

    const placeholder = placeholders[ind][0]

    let variable = ''

    if (rows.length == 1) {
      variable = rows[0].innerHTML
    } else if (rows.length > 1) {
      const table = document.createElement('table')

      table.append(...rows)
      variable = table.outerHTML
    }

    return template.replaceAll(placeholder, variable)
  }, templateDoc)
}
