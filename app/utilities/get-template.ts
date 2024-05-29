import { populateTemplateHTML } from './populate-template'

export async function getTemplateHTML(
  form: HTMLFormElement,
  options = { removePadding: false }
) {
  if (!form.reportValidity()) return

  const table = form.elements.namedItem('table') as HTMLInputElement
  const template = form.elements.namedItem('template') as HTMLInputElement

  const style = `
  <style type="text/css">
    table, td, th {
      border: 1px solid;
      border-collapse: collapse;
      padding: 5px !important;
    }

    .table-wrapper {
      display: block;
      overflow-x: auto;
    }

    ${
      options.removePadding
        ? `body {
            padding: 8px !important;
            margin: auto;
          }`
        : ''
    }
  </style>`

  let doc = await populateTemplateHTML(table.value, template.value)

  if (!doc) return

  const ind = doc.indexOf('</head>')

  return doc.slice(0, ind) + style + doc.slice(ind)
}
