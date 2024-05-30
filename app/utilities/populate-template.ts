import { unzip } from 'unzipit'
import { decodeHTML } from './decode-html'
import { getFilteredTable } from './get-filtered-table'
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
    const [filename] = params
    const tbody = tablesDOM.get(filename)?.querySelector('tbody')

    if (!tbody) throw new Error('Probably not correct table')

    const table = getFilteredTable(tbody, params)

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
