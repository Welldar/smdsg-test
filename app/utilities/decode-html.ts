export function decodeHTML(rawHTML: string) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = rawHTML
  return textArea.value
}
