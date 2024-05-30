import { FormControl, FloatingLabel } from 'react-bootstrap'
export function HrefInput({
  name,
  pattern,
}: {
  name: string
  pattern: string
}) {
  return (
    <FloatingLabel label={name == 'table' ? 'Таблица' : 'Шаблон'}>
      <FormControl
        type="text"
        name={name}
        placeholder={name == 'table' ? 'Таблица' : 'Шаблон'}
        required
        pattern={pattern}
      />
    </FloatingLabel>
  )
}
