import { format } from "date-fns";
import classNames from "classnames";
import { es } from "date-fns/locale";
import { CalendarIcon, Trash2, X } from "lucide-react";
import { FieldError } from "react-hook-form";
import { forwardRef, useState } from "react";
import { stubUndefined } from "@app/util/stub";
import { Button } from "@app/components/ui/button";
import SpanishCalendar from "../calendar/SpanishCalendar/SpanishCalendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@app/components/ui/popover";

type Props = {
  value?: Date | null;
  onChange?: (value?: Date | null) => void;
  label?: string;
  error?: FieldError;
  startMonth?: Date;
  endMonth?: Date;
  showClearButton?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DatePicker = forwardRef<any, Props>(function DatePicker(
  {
    value,
    onChange = stubUndefined,
    label = "Selecciona una fecha",
    error,
    endMonth,
    startMonth,
    showClearButton = false,
  },
  ref
) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const handleClear = () => {
    onChange(null);
  };

  return (
    <Popover open={open} onOpenChange={toggle}>
      <PopoverTrigger asChild>
        <div>
          <Button
            ref={ref}
            type="button"
            variant={"outline"}
            className={classNames(
              "w-[240px] justify-start text-left font-normal relative",
              !value && "text-muted-foreground",
              error ? "border border-red-500" : ""
            )}
          >
            <CalendarIcon />
            {value ? (
              format(value, "PPP", { locale: es })
            ) : (
              <span>{label}</span>
            )}
            {showClearButton && value ? (
              <Button
                variant="ghost"
                size="sm"
                type="button"
                className="absolute right-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              >
                <X className="ml-auto h-4 w-4 hover:text-red-500" />
              </Button>
            ) : null}
          </Button>
          {error ? <p className="text-red-500">{error.message}</p> : null}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 relative" align="start">
        <SpanishCalendar
          mode="single"
          captionLayout="dropdown"
          defaultMonth={value ?? undefined}
          startMonth={startMonth}
          endMonth={endMonth}
          selected={value ?? undefined}
          onSelect={(value) => {
            toggle();
            onChange(value);
          }}
        />
      </PopoverContent>
    </Popover>
  );
});

export default DatePicker;
