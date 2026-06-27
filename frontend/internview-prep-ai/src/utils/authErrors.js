import { BASE_URL } from './apiPaths';

function labelApiBase() {
  if (BASE_URL) return BASE_URL;
  if (typeof window !== 'undefined') return window.location.origin;
  return 'this app';
}

function pickMessage(data) {
  if (data == null) return null;
  if (typeof data === 'string') {
    const t = data.trim();
    return t.length > 0 && !t.startsWith('<!') ? t.slice(0, 400) : null;
  }
  if (typeof data !== 'object') return null;

  const candidates = [data.message, data.msg, data.error];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c;
    if (Array.isArray(c)) {
      const joined = c.map(String).filter(Boolean).join(', ');
      if (joined) return joined;
    }
    if (c && typeof c === 'object' && typeof c.message === 'string') return c.message;
  }
  return null;
}

const statusHints = {
  400: 'Bad request',
  401: 'Invalid credentials or not authorized',
  403: 'Forbidden',
  404: 'API route not found — is the backend running the same version?',
  413: 'Request too large',
  429: 'Too many requests',
  500: 'Server error',
  502: 'Bad gateway — API may be down',
  503: 'Service unavailable',
};

/** Human-readable message from axios errors (auth forms). */
export function getAuthErrorMessage(error) {
  const data = error.response?.data;

  if (error.response) {
    const status = error.response.status;
    const fromBody = pickMessage(data);
    if (fromBody) return fromBody;
    const hint = statusHints[status] || 'Request failed';
    return `${hint} (HTTP ${status}). API: ${labelApiBase()}`;
  }

  if (
    error.code === 'ERR_NETWORK' ||
    error.message === 'Network Error' ||
    error.code === 'ECONNABORTED' ||
    error.code === 'ECONNREFUSED'
  ) {
    return `Cannot reach the API (${labelApiBase()}). Start the backend (npm run dev in /backend) and, in dev, use the Vite proxy — keep the frontend URL as http://localhost:5173.`;
  }

  return `No response from server. Start the backend and open the app from the Vite dev URL so /api is proxied. Expected API base: ${labelApiBase()}`;
}
