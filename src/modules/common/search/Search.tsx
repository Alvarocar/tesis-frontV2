import {forwardRef, useImperativeHandle, useRef} from "react";
import classNames from "classnames";
import {SearchIcon} from "lucide-react";
import {Input} from "@app/components/ui/input";
import {Button} from "@app/components/ui/button";

interface Props {
  onSearch?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

interface Methods {
  set: (value?: string) => void;
}

const Search = forwardRef<Methods, Props>(({ onSearch, className, placeholder }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    set: (value) => {
      if (!inputRef.current || !value) return;
      inputRef.current.value = value
    }
  }))

  return (
        <div className={classNames("flex gap-2", className)}>
            <Input ref={inputRef} placeholder={placeholder} />
            <Button onClick={() => {
              onSearch?.(inputRef.current?.value ?? '');
            }}><SearchIcon/></Button>
        </div>
    )
})

export default Search;
