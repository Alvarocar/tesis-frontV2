import {forwardRef, useImperativeHandle, useRef} from "react";
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
    <form
      role="search"
      className={className}
      onSubmit={(e) => {
        e.preventDefault()
        onSearch?.(inputRef.current?.value ?? '');
      }}
    >
        <div className={"flex gap-2"}>
            <label htmlFor="job-search" className="sr-only">
              {placeholder ?? "Buscar"}
            </label>
            <Input
              id="job-search"
              ref={inputRef}
              type="search"
              placeholder={placeholder}
            />
            <Button type="submit" aria-label="Buscar">
              <SearchIcon aria-hidden="true" />
            </Button>
        </div>
    </form>
    )
})

export default Search;
