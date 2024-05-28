import { populateTemplateHTML } from './populate-template'

export async function getTemplateHTML(form: HTMLFormElement) {
  if (!form.reportValidity()) return

  const table = form.elements.namedItem('table') as HTMLInputElement
  const template = form.elements.namedItem('template') as HTMLInputElement

  return populateTemplateHTML(table.value, template.value)
}
