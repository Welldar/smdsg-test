export function getFilteredTable(
  tbody: HTMLTableSectionElement,
  [, column1, row1, column2 = column1, row2 = row1]: string[]
) {
  const rows = getQueriedRange<HTMLTableRowElement>(tbody, 'tr', row1, row2)
    .map((row) =>
      getQueriedRange<HTMLTableCellElement>(row, 'td', column1, column2)
    )
    .filter(isNotEmptyRow)

  const filteredTableElements = filterEmptyColumns(rows).map((row) => {
    const tableRow = document.createElement('tr')

    tableRow.append(...row.map((cell) => cell.cloneNode(true)))

    return tableRow
  })
  const table = document.createElement('table')

  table.append(...filteredTableElements)

  return table
}

function isNotEmptyRow(row: HTMLTableCellElement[]) {
  for (let i = 0; i < row.length; i++) {
    if (row[i].childNodes.length != 0) return true
  }

  return false
}

function isEmptyColumn(table: HTMLTableCellElement[][], ind: number) {
  for (let i = 0; i < table.length; i++) {
    if (table[i][ind].childNodes.length != 0) return false
  }

  return true
}

function filterEmptyColumns(table: HTMLTableCellElement[][]) {
  for (let i = 0; i < table[0].length; ) {
    if (isEmptyColumn(table, i)) {
      table = table.map((row) => row.filter((_, ind) => ind != i))
    } else i++
  }

  return table
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
