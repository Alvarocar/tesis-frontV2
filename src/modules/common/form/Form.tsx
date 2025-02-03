import { forwardRef } from "react";
import classNames from "classnames";
import { FieldError } from "react-hook-form";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import RichText from "./children/RichText/RichText";

const Form = { };

interface IFormInput extends React.ComponentProps<typeof Input> {
  error?: FieldError;
  label?: React.ReactNode;
  classNameWrapper?: string;
}

const InputField = forwardRef<any, IFormInput>(function ({ error, label, classNameWrapper,...rest }, ref) {
  return (
    <div className={classNameWrapper}>
      {label && <Label htmlFor={rest.id} >{label}</Label>}
      <Input className={classNames("focus-visible:ring-0 bg-white", {
        "border-red-500": error,
      })} {...rest} ref={ref} />
      {error && <span className="text-red-500" >{error.message}</span>}
    </div>
  )
});

InputField.displayName = "InputField";

export default Object.assign(Form, { InputField, RichText });
