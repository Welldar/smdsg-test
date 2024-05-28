'use client'
import { getTemplateHTML } from './utilities/get-template'
import { asBlob } from 'html-docx-js/dist/html-docx'
import { HrefInput } from './components/href-input/href-input'
import { Button } from './components/button/button'

export default function Home() {
  return (
    <main>
      <>
        <form onSubmit={async (e) => e.preventDefault()}>
          <HrefInput
            name="table"
            pattern="https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9\-_]+).+"
          />
          <HrefInput
            name="template"
            pattern="https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9\-_]+).+"
          />

          <Button
            clickHandler={async (e) => {
              const templateDoc = await getTemplateHTML(e.currentTarget.form!)

              if (!templateDoc) return

              const iframe = document.createElement('iframe')
              iframe.style.display = 'block'
              iframe.style.margin = '0 auto'
              iframe.style.width = '794px'
              iframe.style.maxWidth = '100%'
              iframe.style.height = '1123px'

              iframe.srcdoc = templateDoc

              document.body.append(iframe)
            }}
          >
            Предварительный просмотр
          </Button>
          <Button
            clickHandler={async (e) => {
              const templateDoc = await getTemplateHTML(e.currentTarget.form!)

              if (!templateDoc) return

              const fileBuffer = asBlob(templateDoc)
              const a = document.createElement('a')
              a.href = URL.createObjectURL(fileBuffer)
              a.download = 'document.docx'
              a.click()
            }}
          >
            Получить файл
          </Button>
        </form>
      </>
    </main>
  )
}
