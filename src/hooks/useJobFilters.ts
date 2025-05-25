import { useCallback, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { toUrlParams } from "@app/util/url";

export const useJobFilters = () => {
  const search = useSearch();
  const [,setLocation] = useLocation();
  const filters = useMemo(() => {
    const params = new URLSearchParams(search)
    let page = params.get('page')
    if (!page) {
      const newURL = new URL(window.location.href)
      newURL.searchParams.set('page', '1')
      window.history.replaceState(null, '', newURL.toString())
      page = '1'
    }
    return {
      q: params.get('q') ?? undefined,
      page: Number(page),
    }
  }, [search])


  const setFilter = useCallback((attr: 'q' | 'page', value: string, path?: string) => {
    const url = path ?? new URL(window.location.href).pathname
    setLocation(url + toUrlParams({ [attr]: value }))
  }, [])

  return { filters, setFilter }
};