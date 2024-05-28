'use client'
import { MouseEventHandler } from 'react'
import { getTemplateHTML } from './utilities/getTemplate'
import { asBlob } from 'html-docx-js/dist/html-docx'
import { Button as B } from 'react-bootstrap'

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
          <B variant="secondary">haha</B>
        </form>
      </>
    </main>
  )
}

function HrefInput({ name, pattern }: { name: string; pattern: string }) {
  const defaultValue =
    name == 'table'
      ? 'https://docs.google.com/spreadsheets/d/1JoLAETB4v7Qo5FSnSXzKjFAnSflFo456/edit#gid=1209941521'
      : 'https://docs.google.com/document/d/1HW2UK2nPiWZdKsDcsiFZsWLhGTDuGt6e/edit'

  return (
    <input
      type="text"
      name={name}
      placeholder={name == 'table' ? 'Таблица' : 'Шаблон'}
      required
      pattern={pattern}
      defaultValue={defaultValue}
    />
  )
}

function Button({
  children,
  clickHandler,
}: {
  children: React.ReactNode
  clickHandler: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button type="button" onClick={clickHandler}>
      {children}
    </button>
  )
}
