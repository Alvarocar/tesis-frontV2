import { DatePicker } from "antd"
import dayjs from "dayjs"
import { isEmpty } from "lodash"

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

  const finalValue = value != null && !isEmpty(value) ? dayjs(value) : undefined
  return (
    <DatePicker 
      className={className}
      onChange={onChange}
      value={finalValue}  
    />
  )
}

export default CustomDatePicker