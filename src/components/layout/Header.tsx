import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Bell, LogOut, Moon, Sun, User, X } from 'lucide-react';
import { mockDashboardStats } from '@/helpers/mockData';

const Header: React.FC = () => {
    const { admin, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = mockDashboardStats.recentActivity;

    return (
        <header className="bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 px-6 py-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
                {/* Page title - will be dynamic based on route */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {admin?.name}</p>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-4">
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                        title={`Switch to ${theme === 'purple' ? 'black' : 'purple'} theme`}
                    >
                        {theme === 'purple' ? (
                            <Moon className="text-gray-700 dark:text-gray-300" size={20} />
                        ) : (
                            <Sun className="text-gray-700 dark:text-gray-300" size={20} />
                        )}
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors relative"
                        >
                            <Bell className="text-gray-700 dark:text-gray-300" size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-900 border border-gray-200 dark:border-dark-700 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
                                <div className="p-4 border-b border-gray-100 dark:border-dark-800 flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                                    <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map((n) => (
                                        <div key={n.id} className="p-4 border-b border-gray-50 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors cursor-pointer">
                                            <p className="text-sm text-gray-900 dark:text-white">{n.description}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {new Date(n.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 text-center bg-gray-50 dark:bg-dark-800">
                                    <button className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Admin profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-dark-700">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                            <User className="text-white" size={20} />
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{admin?.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{admin?.role.replace('_', ' ')}</p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
