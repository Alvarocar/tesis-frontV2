import React from "react";

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

export const formatFeedBack = (feedBack: string) => {
  return feedBack.split(/[\\n]*([a-zA-Zà-üÀ-ÜÑñ\s]+:)/).map((item, index) => {
    if (item.trim().length === 0) return null;
    if (item.trim().endsWith(':')) return React.createElement('strong', { key: index }, item)
    return item;
  })
}
