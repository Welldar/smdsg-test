export function isNotEmptyRow(row: HTMLTableRowElement) {
  return row.children.length != row.querySelectorAll('td:empty').length
}

export function filterEmptyColumns(rows: HTMLTableRowElement[]) {
  const fragment = document.createDocumentFragment()
  fragment.append(...rows)

  for (let i = 1; i <= rows[0].children.length; ) {
    const emptyColumnCells = fragment.querySelectorAll(
      `tr td:nth-child(${i}):empty`
    )

    if (emptyColumnCells.length == rows.length)
      emptyColumnCells.forEach((cell) => cell.remove())
    else i++
  }

  return [...fragment.querySelectorAll('tr')]
}
