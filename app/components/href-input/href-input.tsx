import { FormControl, FloatingLabel } from 'react-bootstrap'
export function HrefInput({
  name,
  pattern,
}: {
  name: string
  pattern: string
}) {
  const defaultValue =
    name == 'table'
      ? 'https://docs.google.com/spreadsheets/d/1JoLAETB4v7Qo5FSnSXzKjFAnSflFo456/edit#gid=1209941521'
      : 'https://docs.google.com/document/d/1HW2UK2nPiWZdKsDcsiFZsWLhGTDuGt6e/edit'

  return (
    <FloatingLabel label={name == 'table' ? 'Таблица' : 'Шаблон'}>
      <FormControl
        type="text"
        name={name}
        placeholder={name == 'table' ? 'Таблица' : 'Шаблон'}
        required
        pattern={pattern}
        defaultValue={defaultValue}
      />
    </FloatingLabel>
  )
}
