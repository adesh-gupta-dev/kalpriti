import { buildPreviewDocument } from "../../../utils/preview";

export function buildPreviewDocumentWithBridge(code = "") {
  const safeHtml = buildPreviewDocument(code);
  const script = `
    <script>
      (function () {
        function post(type, payload) {
          window.parent.postMessage({ source: "kalpriti-preview", type: type, payload: payload }, "*");
        }

        var originalLog = console.log;
        var originalWarn = console.warn;
        var originalError = console.error;

        console.log = function () {
          post("log", Array.prototype.slice.call(arguments).map(String).join(" "));
          originalLog.apply(console, arguments);
        };

        console.warn = function () {
          post("warn", Array.prototype.slice.call(arguments).map(String).join(" "));
          originalWarn.apply(console, arguments);
        };

        console.error = function () {
          post("error", Array.prototype.slice.call(arguments).map(String).join(" "));
          originalError.apply(console, arguments);
        };

        window.addEventListener("error", function (event) {
          post("runtime-error", event.message || "Script error");
        });

        window.addEventListener("unhandledrejection", function (event) {
          var reason = event.reason;
          post("promise-error", String(reason && reason.message ? reason.message : reason));
        });
      })();
    <\/script>
  `;

  if (/<\/body>/i.test(safeHtml)) {
    return safeHtml.replace(/<\/body>/i, `${script}</body>`);
  }

  return `${safeHtml}${script}`;
}
