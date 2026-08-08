export function setTitle(title) {
  const appTitle = import.meta.env.VITE_APP_TITLE;

  document.title = title ? `${title} - ${appTitle}` : appTitle;
}
