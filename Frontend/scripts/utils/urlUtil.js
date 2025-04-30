export function getParamsFromURL() {
  const params = new URLSearchParams(window.location.search);
  const data = {};
  for (const [key, value] of params.entries()) {
    data[key] = value;
  }
  return data;
}
