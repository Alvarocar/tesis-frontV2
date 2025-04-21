import { useCallback, useMemo } from "react";
import { useSearch } from "wouter";


export const useJobFilters = () => {
  const search = useSearch();

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


  const setFilter = useCallback((attr: 'q' | 'page', value: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set(attr, value)
    window.history.replaceState(null, '', url.toString())
  }, [])

  return { filters, setFilter }
};