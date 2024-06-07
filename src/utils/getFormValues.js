export function getFormValues(form) {
  return Object.fromEntries(new FormData(form));
}
