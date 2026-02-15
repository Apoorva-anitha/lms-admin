import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Admin } from '@/types';

interface AuthContextType {
    admin: Admin | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin for testing
const mockAdmin: Admin = {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@sjce.edu',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [admin, setAdmin] = useState<Admin | null>(() => {
        const savedAdmin = localStorage.getItem('admin');
        return savedAdmin ? JSON.parse(savedAdmin) : null;
    });

    const login = async (email: string, password: string): Promise<void> => {
        // TODO: Replace with actual API call
        // For now, mock login
        if (email && password) {
            setAdmin(mockAdmin);
            localStorage.setItem('admin', JSON.stringify(mockAdmin));
            localStorage.setItem('authToken', 'mock-token-123');
        } else {
            throw new Error('Invalid credentials');
        }
    };

    const logout = () => {
        setAdmin(null);
        localStorage.removeItem('admin');
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider
            value={{
                admin,
                isAuthenticated: !!admin,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
