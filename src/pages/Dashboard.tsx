import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, ClipboardList, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { mockDashboardStats } from '@/helpers/mockData';

const Dashboard: React.FC = () => {
    const stats = mockDashboardStats;
    const navigate = useNavigate();

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Students"
                    value={stats.totalStudents}
                    icon={Users}
                    color="purple"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatsCard
                    title="Total Courses"
                    value={stats.totalCourses}
                    icon={BookOpen}
                    color="blue"
                    trend={{ value: 5, isPositive: true }}
                />
                <StatsCard
                    title="Active Assignments"
                    value={stats.activeAssignments}
                    icon={ClipboardList}
                    color="green"
                />
                <StatsCard
                    title="Completion Rate"
                    value={`${stats.completionRate}%`}
                    icon={TrendingUp}
                    color="orange"
                    trend={{ value: 3.2, isPositive: true }}
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {stats.recentActivity.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-dark-800 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                        >
                            <div className="w-2 h-2 mt-2 rounded-full bg-primary-500" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {activity.description}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {new Date(activity.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => navigate('/courses')}
                    className="p-6 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl text-white hover:shadow-lg transition-all hover:scale-105"
                >
                    <h4 className="text-lg font-bold mb-2">Add New Course</h4>
                    <p className="text-sm opacity-90">Create and configure a new course</p>
                </button>
                <button
                    onClick={() => navigate('/assignments')}
                    className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl text-white hover:shadow-lg transition-all hover:scale-105"
                >
                    <h4 className="text-lg font-bold mb-2">Assign Courses</h4>
                    <p className="text-sm opacity-90">Assign courses to students</p>
                </button>
                <button
                    onClick={() => navigate('/analytics')}
                    className="p-6 bg-gradient-to-br from-green-500 to-green-700 rounded-xl text-white hover:shadow-lg transition-all hover:scale-105"
                >
                    <h4 className="text-lg font-bold mb-2">View Analytics</h4>
                    <p className="text-sm opacity-90">Check student progress and stats</p>
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
