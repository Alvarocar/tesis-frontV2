
export const toUrlParams = (init: Record<string, string> = {}) => {
  const params = new URLSearchParams(Object.entries(init).filter(([_, value]) => value != undefined))
  return '?' + params.toString();
}