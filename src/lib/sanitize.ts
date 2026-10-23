import DOMPurify from "isomorphic-dompurify";

/**
 * Safely sanitizes HTML content to prevent Cross-Site Scripting (XSS)
 * while preserving all legitimate styling, tags, and formatting.
 */
export function sanitizeHtml(dirty?: string | null): string {
  if (!dirty) return "";
  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel", "data-filename"],
  });
}

