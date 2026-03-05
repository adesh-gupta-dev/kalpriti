export function buildPreviewDocument(code = "") {
  const trimmed = code.trim();
  if (!trimmed) {
    return `
      <!doctype html>
      <html>
        <head>
          <style>
            body { font-family: ui-sans-serif, system-ui; padding: 2rem; color: #334155; }
          </style>
        </head>
        <body>
          <h2>Preview will appear here</h2>
          <p>Start generating code with AI prompts.</p>
        </body>
      </html>
    `;
  }

  if (trimmed.includes("<html") || trimmed.includes("<!doctype html")) {
    return code;
  }

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        ${code}
      </body>
    </html>
  `;
}
