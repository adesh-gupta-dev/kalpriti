const HTML_PATTERN = /<\/?[a-z][\s\S]*>/i;
const CSS_PATTERN = /(^|\n)\s*[.#]?[a-z0-9_-]+\s*\{[\s\S]*\}/i;
const JS_PATTERN = /\b(function|const|let|var|import|export|=>|document\.|window\.|console\.)\b/i;

export function detectCodeLanguage(code = "") {
  const sample = code.trim();

  if (!sample) {
    return "html";
  }

  if (HTML_PATTERN.test(sample) || sample.startsWith("<!doctype html")) {
    return "html";
  }

  if (CSS_PATTERN.test(sample) && !JS_PATTERN.test(sample)) {
    return "css";
  }

  if (JS_PATTERN.test(sample)) {
    return "javascript";
  }

  return "html";
}
