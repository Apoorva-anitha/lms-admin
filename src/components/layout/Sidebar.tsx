import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    ClipboardList,
    BarChart3,
    Settings,
    Menu,
    X,
    GraduationCap,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/courses', icon: BookOpen, label: 'Courses' },
        { path: '/students', icon: Users, label: 'Students' },
        { path: '/assignments', icon: ClipboardList, label: 'Assignments' },
        { path: '/analytics', icon: BarChart3, label: 'Analytics' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-dark-800 shadow-lg text-gray-700 dark:text-gray-300"
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen bg-white dark:bg-dark-900 border-r border-gray-200 dark:border-dark-700 transition-all duration-300 z-40 ${isMobileOpen ? 'w-64' : 'w-0'
                    } lg:w-auto ${isOpen ? 'lg:w-64' : 'lg:w-20'}`}
            >
                {/* Desktop toggle button - positioned relative to sidebar edge */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="hidden lg:flex absolute -right-4 top-10 z-50 w-8 h-8 items-center justify-center rounded-full bg-white dark:bg-dark-800 shadow-lg border border-gray-100 dark:border-dark-700 text-gray-700 dark:text-gray-300 hover:text-primary-600 transition-all duration-300 hover:scale-110"
                    title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>

                <div className="flex flex-col h-full overflow-hidden">
                    {/* Logo */}
                    <div className={`border-b border-gray-200 dark:border-dark-700 transition-all duration-300 ${isOpen || isMobileOpen ? 'p-6' : 'p-4'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/20">
                                <GraduationCap className="text-white" size={24} />
                            </div>
                            {(isOpen || isMobileOpen) && (
                                <div className="flex flex-col overflow-hidden animate-fade-in">
                                    <h1 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">LMS Admin</h1>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap uppercase tracking-tighter">St. Joseph's</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 overflow-y-auto">
                        <ul className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);

                                return (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active
                                                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                                                }`}
                                            title={!isOpen && !isMobileOpen ? item.label : ''}
                                        >
                                            <Icon size={20} className="flex-shrink-0" />
                                            {(isOpen || isMobileOpen) && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Footer */}
                    {(isOpen || isMobileOpen) && (
                        <div className="p-4 border-t border-gray-200 dark:border-dark-700">
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                © 2024 St. Joseph's LMS
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
