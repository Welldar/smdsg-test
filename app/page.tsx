'use client'
import styles from './page.module.css'
import { populateTemplateHTML } from './populateTemplate'

export default function Home() {
  return (
    <main className={styles.main}>
      <>
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            const table = e.currentTarget.elements.namedItem(
              'table'
            ) as HTMLInputElement

            const template = e.currentTarget.elements.namedItem(
              'template'
            ) as HTMLInputElement

            const templateDoc = await populateTemplateHTML(
              table.value,
              template.value
            )

            const iframe = document.createElement('iframe')
            iframe.style.display = 'block'
            iframe.style.margin = '0 auto'
            iframe.style.width = '794px'
            iframe.style.maxWidth = '100%'
            iframe.style.height = '1123px'

            iframe.srcdoc = templateDoc ?? 'Something went wrong'

            document.body.append(iframe)
          }}
        >
          <HrefInput
            name="table"
            pattern="https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9\-_]+).+"
          />
          <HrefInput
            name="template"
            pattern="https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9\-_]+).+"
          />

          <button type="submit">Предварительный просмотр</button>
          <button type="submit">Получить файл</button>
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
