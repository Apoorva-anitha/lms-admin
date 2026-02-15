import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, User, Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

const Settings: React.FC = () => {
    const { admin } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [profileData, setProfileData] = useState({
        name: admin?.name || '',
        email: admin?.email || '',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        courseAssignments: true,
        studentUpdates: false,
        systemAlerts: true,
    });

    const handleProfileSave = () => {
        alert('Profile updated successfully!');
    };

    const handlePasswordChange = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        alert('Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleNotificationSave = () => {
        alert('Notification preferences saved!');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Manage your admin preferences and system configuration
                </p>
            </div>

            {/* Profile Settings */}
            <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                        <User className="text-primary-600 dark:text-primary-400" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Profile Settings</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="w-full px-4 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="w-full px-4 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        />
                    </div>

                    <button
                        onClick={handleProfileSave}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                        <Save size={16} />
                        Save Profile
                    </button>
                </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <Palette className="text-purple-600 dark:text-purple-400" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Appearance</h3>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Current: {theme === 'purple' ? 'Purple (Light)' : 'Black (Dark)'}
                            </p>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                        >
                            Toggle Theme
                        </button>
                    </div>
                </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Bell className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h3>
                </div>

                <div className="space-y-4">
                    <label className="flex items-center justify-between cursor-pointer">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={notifications.emailNotifications}
                            onChange={(e) =>
                                setNotifications({ ...notifications, emailNotifications: e.target.checked })
                            }
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Course Assignments</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Notify when courses are assigned
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            checked={notifications.courseAssignments}
                            onChange={(e) =>
                                setNotifications({ ...notifications, courseAssignments: e.target.checked })
                            }
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Student Updates</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Notify about student progress
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            checked={notifications.studentUpdates}
                            onChange={(e) =>
                                setNotifications({ ...notifications, studentUpdates: e.target.checked })
                            }
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                        />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">System Alerts</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Important system messages</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={notifications.systemAlerts}
                            onChange={(e) =>
                                setNotifications({ ...notifications, systemAlerts: e.target.checked })
                            }
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                        />
                    </label>

                    <button
                        onClick={handleNotificationSave}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                        <Save size={16} />
                        Save Preferences
                    </button>
                </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <Shield className="text-green-600 dark:text-green-400" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, currentPassword: e.target.value })
                            }
                            className="w-full px-4 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className="w-full px-4 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                            }
                            className="w-full px-4 py-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                        />
                    </div>

                    <button
                        onClick={handlePasswordChange}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                        <Shield size={16} />
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
