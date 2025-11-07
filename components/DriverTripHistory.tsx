import React from 'react';

const DriverTripHistory = ({ tripHistory }) => {
    if (!tripHistory || tripHistory.length === 0) {
        return <p>No trip history available.</p>;
    }

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold dark:text-gray-200 mb-6">My Trip History</h1>
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="p-3">Date</th>
                                <th className="p-3">Route</th>
                                <th className="p-3">Passengers</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tripHistory.map(trip => (
                                <tr key={trip.id} className="border-t dark:border-gray-700">
                                    <td className="p-3 whitespace-nowrap">{new Date(trip.date).toLocaleDateString()}</td>
                                    <td className="p-3 font-semibold dark:text-white">{trip.route}</td>
                                    <td className="p-3">{trip.status === 'Completed' ? trip.passengers : 'N/A'}</td>
                                    <td className="p-3">
                                         <span className={`px-2 py-1 text-xs font-semibold rounded-full ${trip.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>
                                            {trip.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DriverTripHistory;
