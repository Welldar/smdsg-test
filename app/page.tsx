'use client'
import { HrefInput } from './components/href-input/href-input'
import { Form, Stack } from 'react-bootstrap'
import { GetFileButton, PreviewButton } from './components/buttons/main-buttons'
import { useState } from 'react'

export default function Home() {
  const [validated, setValidated] = useState(false)

  const clickHandler = () => setValidated(true)

  return (
    <main>
      <>
        <Form
          noValidate
          validated={validated}
          onSubmit={async (e) => e.preventDefault()}
        >
          <Stack gap={2} className="mx-auto  p-0 col-lg-8 container-lg">
            <HrefInput
              name="table"
              pattern="https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9\-_]+).+"
            />
            <HrefInput
              name="template"
              pattern="https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9\-_]+).+"
            />
            <Stack direction="horizontal" gap={2} className="ms-auto">
              <PreviewButton clickHandler={clickHandler} />
              <GetFileButton clickHandler={clickHandler} />
            </Stack>
          </Stack>
        </Form>
      </>
    </main>
  )
}
