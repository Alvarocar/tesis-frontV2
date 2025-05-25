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
    <form className={className} onSubmit={(e) => {
      e.preventDefault()
      onSearch?.(inputRef.current?.value ?? '');
    }}>
        <div className={"flex gap-2"}>
            <Input ref={inputRef} placeholder={placeholder} />
            <Button type="submit"><SearchIcon/></Button>
        </div>
    </form>
    )
})

export default Search;
