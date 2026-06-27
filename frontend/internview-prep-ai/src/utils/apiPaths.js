/**
 * In dev, empty string uses the Vite origin + proxy so /api → backend (see vite.config.js).
 * Set VITE_API_URL in .env for production or a fixed API host.
 */
const envUrl = import.meta.env.VITE_API_URL;
export const BASE_URL =
  envUrl !== undefined && String(envUrl).trim() !== ''
    ? String(envUrl).replace(/\/$/, '')
    : import.meta.env.DEV
      ? ''
      : 'http://localhost:8000';
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        GET_PROFILE: "/api/auth/profile",
    },
    IMAGE: {
        UPLOAD: "/api/auth/upload-profile-image",
    },
    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions",
        GENERATE_EXPLANATION: "/api/ai/generate-explanation",
    },
    SESSIONS: {
        CREATE: "/api/sessions/create",
        GET_ALL: "/api/sessions/my-sessions",
        GET_BY_ID: (id) => `/api/sessions/${id}`,
        UPDATE: (id) => `/api/sessions/${id}`,
        DELETE: (id) => `/api/sessions/${id}`,
    },
    QUESTIONS: {
        ADD_TO_SESSION: "/api/questions/add",
        PIN: (id) => `/api/questions/${id}/pin`,
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`,
    },
    UPLOAD_IMAGE: "/api/auth/upload-profile-image",
};
