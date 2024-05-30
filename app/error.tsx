'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto ">
      <h2>Что-то пошло не так</h2>
      <div>{error.message}</div>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Обновить
      </button>
    </div>
  )
}
