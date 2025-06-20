function getBaseApiUrl(value: string) {
  if (value !== null && value !== undefined) {
    return `${value}api`;
  } else {
    return undefined;
  }
}

export const BASE_API_URL = getBaseApiUrl(import.meta.env.VITE_BASE_API_URL);
