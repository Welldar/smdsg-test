'use client'
import { MouseEventHandler } from 'react'

export function Button({
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
