import {useEffect, useRef} from "react";
import {useJobFilters} from "@app/hooks/useJobFilters";
import { Search } from "@app/modules/common/search";

interface Props {
  className?: string;
}

const JobSearch: React.FC<Props> = ({ className }) => {
  const { filters: { q }, setFilter } = useJobFilters()
  const ref = useRef<React.ComponentRef<typeof Search>>(null)

  useEffect(() => {
    ref.current?.set(q);
  }, [q]);

  return (
    <Search placeholder="Buscar..." ref={ref} className={className} onSearch={(query) => setFilter("q", query)} />
  )
}

export default JobSearch;
