import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Courses from '@/pages/Courses';
import Students from '@/pages/Students';
import Assignments from '@/pages/Assignments';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import Loader from '@/components/common/Loader';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // For now, auto-login for development
    // TODO: Replace with actual login page
    if (!isAuthenticated) {
        return <Navigate to="/auto-login" replace />;
    }

    return <>{children}</>;
};

// Auto-login component for development
const AutoLogin: React.FC = () => {
    const { login } = useAuth();

    React.useEffect(() => {
        // Auto-login with mock credentials
        login('admin@sjce.edu', 'password').then(() => {
            window.location.href = '/';
        });
    }, [login]);

    return <Loader fullPage text="Logging in..." />;
};

function AppRoutes() {
    return (
        <Routes>
            <Route path="/auto-login" element={<AutoLogin />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/courses"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Courses />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/students"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Students />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/assignments"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Assignments />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/analytics"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Analytics />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Settings />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router>
                    <AppRoutes />
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
