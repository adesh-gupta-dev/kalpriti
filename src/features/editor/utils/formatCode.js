const parserByLanguage = {
  html: "html",
  css: "css",
  javascript: "babel",
};

export async function formatCodeWithPrettier(code, language = "html") {
  const parser = parserByLanguage[language] || "html";
  const [prettier, prettierPluginBabel, prettierPluginEstree, prettierPluginHtml, prettierPluginPostcss] =
    await Promise.all([
      import("prettier/standalone"),
      import("prettier/plugins/babel"),
      import("prettier/plugins/estree"),
      import("prettier/plugins/html"),
      import("prettier/plugins/postcss"),
    ]);

  return prettier.format(code, {
    parser,
    plugins: [
      prettierPluginBabel.default,
      prettierPluginEstree.default,
      prettierPluginHtml.default,
      prettierPluginPostcss.default,
    ],
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    printWidth: 100,
  });
}
