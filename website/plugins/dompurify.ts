import DOMPurify from "dompurify";

export default defineNuxtPlugin(async () => {
  let sanitize: typeof DOMPurify.sanitize;

  if (process.server) {
    const { JSDOM } = await import("jsdom");
    sanitize = DOMPurify(new JSDOM("").window).sanitize;
  } else {
    sanitize = DOMPurify.sanitize;
  }

  function sanitizeHtml(str: string) {
    return sanitize(str, { USE_PROFILES: { html: true } });
  }

  return { provide: { sanitizeHtml } };
});
