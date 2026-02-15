import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    fullPage?: boolean;
    text?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', fullPage = false, text }) => {
    const sizeClasses = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-16 h-16 border-4',
    };

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                className={`${sizeClasses[size]} border-primary-500 border-t-transparent rounded-full animate-spin`}
            />
            {text && <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>}
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 bg-white dark:bg-dark-950 flex items-center justify-center z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default Loader;
