import { Calendar } from "@app/components/ui/calendar";
import { es } from "react-day-picker/locale";

const SpanishCalendar: React.FC<React.ComponentProps<typeof Calendar>> = (props) => {
  return (
    <Calendar
      locale={es}
      showOutsideDays={false}
      {...props}
    />
  )
}

export default SpanishCalendar;
