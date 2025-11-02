import React, { useState, useEffect } from 'react';
import { BuildingOfficeIcon, TagIcon } from './icons';

const eventTemplates = [
    { type: 'new_company', icon: BuildingOfficeIcon, message: (name) => `New Company: ${name} has joined the platform.` },
    { type: 'new_promotion', icon: TagIcon, message: (name) => `Promotion Alert: ${name} launched a new promotion.` },
];
const companyNames = ['Sotra', 'KBS', 'Royal Express', 'Matunda Express', 'Omega Car'];

const generateRandomEvent = () => {
    const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
    const companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
    return {
        id: Date.now() + Math.random(),
        icon: template.icon,
        message: template.message(companyName),
        time: new Date(),
    };
};

const formatTimeAgo = (date: Date) => {
    // FIX: Use getTime() for date arithmetic to satisfy TypeScript's type checker.
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 5) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
}

const ActivityFeed = () => {
    const [activities, setActivities] = useState<any[]>([]);
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        // Generate initial activities
        setActivities(Array(3).fill(0).map(generateRandomEvent));

        const interval = setInterval(() => {
            setActivities(prev => [generateRandomEvent(), ...prev.slice(0, 10)]);
        }, 5000 + Math.random() * 3000); // every 5-8 seconds

        const timer = setInterval(() => setTime(Date.now()), 5000); // Update timestamps every 5s

        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-bold mb-4 dark:text-white">Platform Activity</h3>
            <div className="space-y-4 h-72 overflow-y-auto custom-scrollbar">
                {activities.map(act => (
                    <div key={act.id} className="flex items-start space-x-3 animate-fade-in">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                            <act.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-800 dark:text-gray-200">{act.message}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{formatTimeAgo(act.time)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;