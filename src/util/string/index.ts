
export const cleanEmptyTags = (content: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, "text/html");
  doc.body.querySelectorAll("*").forEach(el => {
    if (!el.textContent?.trim() && el.childNodes.length === 0) {
      el.remove();
    }
  })
  return doc.body.innerHTML;
}