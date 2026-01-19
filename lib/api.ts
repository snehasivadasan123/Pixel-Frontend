export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || API_BASE_URL;

export interface User {
    user_id: string;
    user_name: string;
    email: string;
    credit: number;
    created: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user?: User; // Sometimes user details might be sent, or fetched separately
}

export interface Mockup {
    id: number;
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
    bg_color?: string;
    image?: string; // Result image URL
    mockup?: string; // Result mockup URL
    error_message?: string;
    // Add other fields as needed
}

export const getAccessToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('access_token');
    }
    return null;
};

export const setAccessToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', token);
    }
};

export const clearAccessToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
    }
};

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
    skipAuth?: boolean;
}

export const apiFetch = async (endpoint: string, options: FetchOptions = {}) => {
    const token = getAccessToken();
    const headers = { ...options.headers };

    if (token && !options.skipAuth) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Bypass ngrok browser warning
    headers['ngrok-skip-browser-warning'] = 'true';

    // Ensure Content-Type is JSON unless strictly not needed (e.g. FormData)
    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    // Bypass ngrok browser warning (for free tier)
    headers['ngrok-skip-browser-warning'] = 'true';
    headers['User-Agent'] = 'pixelweave-client'; // Custom UA often bypasses checks

    const config: RequestInit = {
        ...options,
        headers,
    };

    let response;
    try {
        console.log(`[API] Fetching: ${API_BASE_URL}${endpoint}`);
        console.log('[API] Headers:', headers);
        response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        console.log(`[API] Response Status: ${response.status}`);
    } catch (error) {
        console.error('[API] Network Error:', error);
        throw new Error(`Network error: Unable to reach ${API_BASE_URL}${endpoint}. check your internet connection or server URL.`);
    }

    if (response.status === 401) {
        // Handle unauthorized - maybe clear token or redirect
        // clearAccessToken();
        // window.location.href = '/login'; // Optional: auto-redirect
        throw new Error('Unauthorized');
    }

    // Allow callers to handle non-200, or throw here
    if (!response.ok) {
        let errorMessage = 'An error occurred';
        try {
            const errorText = await response.text();
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorData.detail || JSON.stringify(errorData);
            } catch {
                // If not JSON, use the text body (could be HTML)
                // Truncate if too long to avoid huge alerts
                errorMessage = errorText.slice(0, 500) || response.statusText;
            }
        } catch (e) {
            errorMessage = response.statusText;
        }
        console.error('[API] Error Response:', errorMessage);
        throw new Error(errorMessage);
    }

    return response.json();
};
