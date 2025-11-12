// services/apiService.ts - REAL BACKEND API CLIENT

const BASE_URL = '/api/v1';
let TOKEN: string | null = null;

// Helper to handle API responses
const handleResponse = async (response: Response) => {
    // .json() can only be called once, so we need to handle no-content responses
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return { success: true, data: {} };
    }
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
};

// FIX: Added simulateLatency helper function.
const simulateLatency = (ms = 500) => new Promise(res => setTimeout(res, ms));


// Main fetch function
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    if (TOKEN) {
        headers['Authorization'] = `Bearer ${TOKEN}`;
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    return handleResponse(response);
};

// --- AUTH ---
export const setAuthToken = (token: string | null) => {
    TOKEN = token;
};

export const login = (credentials: any) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
export const register = (userData: any) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(userData) });
export const getCurrentUser = async () => {
    const { data } = await apiFetch('/auth/me');
    return data;
};
export const updatePassword = (passwords: any) => apiFetch('/auth/updatepassword', { method: 'PUT', body: JSON.stringify(passwords) });


// --- TRIPS ---
export const searchTrips = async (from: string, to: string, date: string) => {
    const params = new URLSearchParams({ from, to, date });
    const { data } = await apiFetch(`/trips/search?${params.toString()}`);
    return data;
};
export const getTripDetails = async (tripId: string) => {
    const { data } = await apiFetch(`/trips/${tripId}`);
    return data;
};
export const confirmBoarding = async (tripId: string, ticketId: string) => {
    const { data } = await apiFetch(`/trips/${tripId}/boardings`, {
        method: 'POST',
        body: JSON.stringify({ ticketId }),
    });
    return data;
}

// --- BOOKINGS ---
export const createBooking = async (bookingData: any) => {
    const { data } = await apiFetch('/bookings', { method: 'POST', body: JSON.stringify(bookingData) });
    return data;
};
export const getMyBookings = async () => {
    const { data } = await apiFetch('/bookings');
    return data;
};

// --- COMPANIES (Public) ---
export const getCompanies = async () => {
    const { data } = await apiFetch('/companies');
    return data;
};
export const getCompanyById = async (id: string) => {
    const { data } = await apiFetch(`/companies/${id}`);
    return data;
};

// --- WALLET ---
export const getWalletHistory = async () => {
    const { data } = await apiFetch('/wallet/history');
    return data;
};
export const topUpWallet = async (amount: number) => {
    const { data } = await apiFetch('/wallet/topup', { method: 'POST', body: JSON.stringify({ amount }) });
    return data;
};

// --- MESSAGES ---
export const submitContactMessage = (messageData: any) => apiFetch('/messages', { method: 'POST', body: JSON.stringify(messageData) });
export const adminGetMessages = async () => {
    const { data } = await apiFetch('/messages');
    return data;
};
export const adminUpdateMessage = (id: string, updateData: any) => apiFetch(`/messages/${id}`, { method: 'PUT', body: JSON.stringify(updateData) });


// --- ADMIN ---
export const adminGetCompanies = async () => {
    const { data } = await apiFetch('/admin/companies');
    return data;
};
export const adminCreateCompany = (companyData: any) => apiFetch('/admin/companies', { method: 'POST', body: JSON.stringify(companyData) });
export const adminUpdateCompany = (id: string, companyData: any) => apiFetch(`/admin/companies/${id}`, { method: 'PUT', body: JSON.stringify(companyData) });
export const adminDeleteCompany = (id: string) => apiFetch(`/admin/companies/${id}`, { method: 'DELETE' });

export const adminGetAllDrivers = async () => {
    const { data } = await apiFetch('/admin/drivers');
    return data;
};
export const adminCreateDriver = (driverData: any) => apiFetch('/admin/drivers', { method: 'POST', body: JSON.stringify(driverData) });
export const adminUpdateDriver = (id: string, driverData: any) => apiFetch(`/admin/drivers/${id}`, { method: 'PUT', body: JSON.stringify(driverData) });
export const adminDeleteDriver = (id: string) => apiFetch(`/admin/drivers/${id}`, { method: 'DELETE' });

// FIX: Added missing admin functions for agent management.
export const adminGetAllAgents = async () => {
    const { data } = await apiFetch('/admin/agents');
    return data;
};
export const adminUpdateAgent = (id: string, agentData: any) => apiFetch(`/admin/agents/${id}`, { method: 'PUT', body: JSON.stringify(agentData) });
export const adminDeleteAgent = (id: string) => apiFetch(`/admin/agents/${id}`, { method: 'DELETE' });


export const adminGetAllUsers = async () => {
    const { data } = await apiFetch('/admin/users');
    return data;
};

export const adminGetDashboardAnalytics = async () => {
    // This endpoint doesn't exist on the backend, so we return a structured empty state.
    await simulateLatency();
    return {
        stats: { companies: 0, drivers: 0 },
        revenueData: [],
        passengerData: [],
        companyRevenue: [],
    };
};
export const adminCreateAgent = async (agentData: any) => {
    const { data } = await apiFetch('/admin/agents', { method: 'POST', body: JSON.stringify(agentData) });
    return data;
}

// --- COMPANY ---
export const companyGetMyDrivers = async () => {
    const { data } = await apiFetch('/companies/mydrivers');
    return data;
}
export const companyCreateDriver = (driverData: any) => apiFetch('/companies/mydrivers', { method: 'POST', body: JSON.stringify(driverData) });
export const companyUpdateDriver = (id: string, driverData: any) => apiFetch(`/companies/mydrivers/${id}`, { method: 'PUT', body: JSON.stringify(driverData) });
export const companyDeleteDriver = (id: string) => apiFetch(`/companies/mydrivers/${id}`, { method: 'DELETE' });


// --- DEBUG ---
export const seedDatabase = () => apiFetch('/debug/seed', { method: 'POST' });