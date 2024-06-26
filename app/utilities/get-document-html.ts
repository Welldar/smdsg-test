import { makeExportUrl } from './make-export-url'
import { populateTemplateHTML } from './populate-template'

export async function getDocumentHTML(
  form: HTMLFormElement,
  options = { removePadding: false }
) {
  const table = form.elements.namedItem('table') as HTMLInputElement
  const template = form.elements.namedItem('template') as HTMLInputElement
  const [tableUrl, templateUrl] = [
    makeExportUrl(table.value),
    makeExportUrl(template.value),
  ]

  if (!tableUrl || !templateUrl) return

  const doc = await populateTemplateHTML(tableUrl, templateUrl)

  if (!doc) return

  const style = `
  <style type="text/css">
    html {
      overflow: hidden;
    }

    table {
      width: 100%;
    }

    table, td, th {
      border: 1px solid;
      border-collapse: collapse;
      padding: 5px !important;
    }

    .table-wrapper {
      display: block;
      overflow-x: scroll;
      box-sizing: content-box;
      padding: 5px;
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

  const ind = doc.indexOf('</head>')

  return doc.slice(0, ind) + style + doc.slice(ind)
}
