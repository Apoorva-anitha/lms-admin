import React from 'react';
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';

const Analytics: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Track student progress and course performance
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                            <TrendingUp className="text-primary-600 dark:text-primary-400" size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Completion Trends</h3>
                    </div>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        Chart placeholder - Connect to backend for real data
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                            <Users className="text-blue-600 dark:text-blue-400" size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Student Engagement</h3>
                    </div>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        Chart placeholder - Connect to backend for real data
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <BookOpen className="text-green-600 dark:text-green-400" size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Course Performance</h3>
                    </div>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        Chart placeholder - Connect to backend for real data
                    </div>
                </div>

                <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                            <BarChart3 className="text-orange-600 dark:text-orange-400" size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Department Stats</h3>
                    </div>
                    <div className="h-64 flex items-center justify-center text-gray-400">
                        Chart placeholder - Connect to backend for real data
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
