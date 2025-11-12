export interface User {
    id: number;
    name: string;
    email: string;
    password_hash?: string;
    phone_number?: string;
    role: 'passenger' | 'driver' | 'agent' | 'company' | 'admin';
    avatar_url: string;
    status: 'Active' | 'Suspended' | 'Pending';
    company_id?: number;
    created_at: string;
    updated_at: string;
}
