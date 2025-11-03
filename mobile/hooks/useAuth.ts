import React, { createContext, useState, useContext } from 'react';

type UserRole = 'passenger' | 'admin' | 'company' | 'driver' | 'agent';

interface User {
    name: string;
    email: string;
    role: UserRole;
    avatarUrl: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
});

const defaultUser: User = {
    name: 'Kalisa Jean',
    email: 'kalisa.j@example.com',
    role: 'passenger',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop',
};

// FIX: Explicitly type the `children` prop to resolve multiple TypeScript errors.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(defaultUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);