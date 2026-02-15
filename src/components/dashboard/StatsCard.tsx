import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'purple' | 'blue' | 'green' | 'orange';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, color = 'purple' }) => {
    const colorClasses = {
        purple: 'from-primary-500 to-primary-700',
        blue: 'from-blue-500 to-blue-700',
        green: 'from-green-500 to-green-700',
        orange: 'from-orange-500 to-orange-700',
    };

    return (
        <div className="bg-white dark:bg-dark-900 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>

                    {trend && (
                        <div className="mt-2 flex items-center gap-1">
                            <span
                                className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
                        </div>
                    )}
                </div>

                <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={28} />
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
