'use client'
import { asBlob } from 'html-docx-js/dist/html-docx'
import { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { getTemplateHTML } from '@/app/utilities/get-template'
import { Modal } from 'react-bootstrap'

export function GetFileButton() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button
      variant="outline-primary"
      type="button"
      onClick={async (e) => {
        setIsLoading(true)

        const templateDoc = await getTemplateHTML(e.currentTarget.form!)

        if (!templateDoc) return setIsLoading(false)

        const fileBuffer = asBlob(templateDoc)
        const a = document.createElement('a')

        a.href = URL.createObjectURL(fileBuffer)
        a.download = 'document.docx'
        a.click()

        setIsLoading(false)
      }}
    >
      <span className="position-relative">
        <span
          className={`text-center position-absolute top-50 start-50 translate-middle ${isLoading ? '' : 'invisible '}`}
        >
          <span className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </span>
        </span>
        <span className={isLoading ? 'invisible ' : ''}>Получить файл</span>
      </span>
    </Button>
  )
}

export function PreviewButton() {
  const [showModal, setShowModal] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  return (
    <>
      <Button
        variant="primary"
        type="button"
        onClick={async (e) => {
          handleShow()

          const templateDoc = await getTemplateHTML(e.currentTarget.form!, {
            removePadding: true,
          })
          if (!templateDoc) return handleClose()

          const iframe = document.createElement('iframe')
          iframe.style.display = 'block'
          iframe.style.margin = '0 auto'
          iframe.style.width = '794px'
          iframe.style.maxWidth = '100%'
          iframe.style.height = '1123px'
          iframe.srcdoc = templateDoc

          ref.current?.replaceChildren(iframe)
        }}
      >
        Предварительный просмотр
      </Button>
      <Modal show={showModal} size="lg" centered onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body ref={ref}>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
