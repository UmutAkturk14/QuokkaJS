export function createElement(
  tag: string,
  options: { id?: string; className?: string; textContent?: string } = {},
  dataset?: Record<string, string>
): HTMLElement {
  const el: HTMLElement = document.createElement(tag);

  if (typeof options.id !== 'undefined') {
    el.id = options.id;
  }
  if (typeof options.className !== 'undefined') {
    el.className = options.className;
  }
  if (typeof options.textContent !== 'undefined') {
    el.textContent = options.textContent;
  }

  if (dataset) {
    Object.entries(dataset).forEach(([key, value]: [string, string]) => el.setAttribute(`data-${key}`, value));
  }

  return el;
}
