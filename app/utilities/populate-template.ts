import { unzip } from 'unzipit'
import { decodeHTML } from './decode-html'
import { filterEmptyColumns, isNotEmptyRow } from './table-filters'
import { getTemplateHTML } from './get-template-html'
import { proxySrc } from './proxy-src-attr'
import { getTablesDOM } from './get-tables-dom'

export async function populateTemplateHTML(
  tableUrl: string,
  templateUrl: string
) {
  const [{ entries: entriesTables }, { entries: entriesTemplate }] =
    await Promise.all([unzip(tableUrl), unzip(templateUrl)])
  const templateRawHTML = getTemplateHTML(entriesTemplate)

  if (!templateRawHTML) return

  const templateHTML = decodeHTML(await templateRawHTML)
  const placeholders = [...templateHTML.matchAll(/{[^{}]+(?:-\d+){2,4}}/gi)]
  const placeholderParams = placeholders.map((regExpExec) =>
    regExpExec[0].slice(1, -1).split('-')
  )
  const tablesDOM = await getTablesDOM(
    placeholderParams.map(([filename]) => filename),
    entriesTables
  )

  return placeholderParams.reduce(function replacePlaceholders(
    template,
    params,
    ind
  ) {
    const [filename, column1, row1] = params
    const column2 = params[3] ?? column1
    const row2 = params[4] ?? row1
    const tbody = tablesDOM.get(filename)?.querySelector('tbody')

    if (!tbody) throw new Error('Probably not correct table')

    const rows = getQueriedRange<HTMLTableRowElement>(tbody, 'tr', row1, row2)
      .map((row) => row.cloneNode(true) as HTMLTableRowElement)
      .map((row) => {
        const cells = getQueriedRange(row, 'td', column1, column2).map(
          (cell) => cell.cloneNode(true) as HTMLTableCellElement
        )

        row.replaceChildren(...cells)

        return row
      })
      .filter(isNotEmptyRow)

    const table = document.createElement('table')
    table.append(...rows)

    filterEmptyColumns(table)
    table.querySelectorAll('[src]').forEach(proxySrc)

    const placeholder = placeholders[ind][0]
    const value = getReplaceValue(table)

    return template.replaceAll(placeholder, value)
  }, templateHTML)
}

function getReplaceValue(table: HTMLTableElement) {
  if (table.children.length == 1) {
    return table.children.item(0)!.innerHTML
  } else if (table.children.length > 1) {
    const div = document.createElement('div')

    div.className = 'table-wrapper'
    div.append(table)

    return div.outerHTML
  } else return ''
}

function getQueriedRange<T extends HTMLElement>(
  root: Element,
  type: string,
  start: string,
  end: string
) {
  return [
    ...root.querySelectorAll(
      `${type}:nth-of-type(n + ${start}):nth-of-type(-n + ${end})`
    ),
  ] as T[]
}
