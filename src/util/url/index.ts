
export const toUrlParams = (init: string[][] | Record<string, string> | string | URLSearchParams) => {
  const params = new URLSearchParams(init)
  return '?' + params.toString();
}