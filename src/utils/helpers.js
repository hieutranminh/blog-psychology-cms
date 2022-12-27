import sanitizeHtml from 'sanitize-html'

export const handleSanitizeHtml = (html) => {
  const optionSanitize = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      '*': ['href', 'align', 'alt', 'center', 'border', 'src', 'style']
    },
    enforceHtmlBoundary: true
  }

  return sanitizeHtml(html, optionSanitize)
}

export const uid = () => {
  const head = Date.now().toString(36)
  const tail = Math.random().toString(36).substr(2)
  return head + tail
}
