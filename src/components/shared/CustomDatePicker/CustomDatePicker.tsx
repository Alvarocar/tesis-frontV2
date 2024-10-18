import { DatePicker } from "antd"
import dayjs from "dayjs"

type Props = {
  value?: string | dayjs.Dayjs
  onChange?: (value: dayjs.Dayjs) => void
  className?: string
}


const CustomDatePicker: React.FC<Props> = ({
  className,
  value,
  onChange,
}) => {

  const finalValue = typeof value === 'string' ? dayjs(value) : undefined

  return (
    <DatePicker 
      className={className}
      onChange={onChange}
      value={finalValue}  
    />
  )
}

export default CustomDatePicker