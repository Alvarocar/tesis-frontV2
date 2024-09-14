import { Input } from "antd"
import { isEmpty } from "lodash"
import { forwardRef, useImperativeHandle, useState } from "react"

type Props = {
  onChange: (value: string) => void
}

const SkillInput = forwardRef<{ clean: () => void }, Props>(function SkillInput(props, ref) {

  const [value, setValue] = useState('')
  
  useImperativeHandle(ref, () => ({
    clean: () => {
      setValue('')
    }
  }), [])
  
  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    if (!isEmpty(value))
    props.onChange(value)
  }

  return (
    <Input value={value} onChange={e => setValue(e.target.value)} onKeyDown={handleEnter} />
  )
})

export default SkillInput
