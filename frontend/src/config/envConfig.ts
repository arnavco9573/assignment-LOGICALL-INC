const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
  console.error("VITE_BACKEND_URL is not set in your .env file!");
}

export const PUBLIC_BACKEND_URL = backendUrl;