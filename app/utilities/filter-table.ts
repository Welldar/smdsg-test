export function isNotEmptyRow(row: HTMLTableRowElement) {
  return row.children.length != row.querySelectorAll('td:empty').length
}

export function filterEmptyColumns(table: HTMLTableElement) {
  const columnLen = table.children.item(0)?.children.length

  if (!columnLen) return

  for (let i = 1; i <= columnLen; ) {
    const emptyColumnCells = table.querySelectorAll(
      `tr td:nth-child(${i}):empty`
    )

    if (emptyColumnCells.length == table.children.length)
      emptyColumnCells.forEach((cell) => cell.remove())
    else i++
  }
}
