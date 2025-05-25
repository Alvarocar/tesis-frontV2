import {useEffect, useRef} from "react";
import {useJobFilters} from "@app/hooks/useJobFilters";
import { Search } from "@app/modules/common/search";
import { usePathname } from "wouter/use-browser-location";
import { ROUTES_PATHS } from "@app/constants/routes.constant";

interface Props {
  className?: string;
}

const whiteListPathNames = [ROUTES_PATHS.VACANTES, ROUTES_PATHS.HOME]

const JobSearch: React.FC<Props> = ({ className }) => {
  const { filters: { q }, setFilter } = useJobFilters()
  const pathname = usePathname()
  const path = whiteListPathNames.includes(pathname) ? pathname : ROUTES_PATHS.HOME
  const ref = useRef<React.ComponentRef<typeof Search>>(null)

  useEffect(() => {
    ref.current?.set(q);
  }, [q]);

  return (
    <Search placeholder="Buscar..." ref={ref} className={className} onSearch={(query) => setFilter("q", query, path)} />
  )
}

export default JobSearch;
