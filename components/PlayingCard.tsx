import React from 'react';

const PlayerCard: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-xl rounded-lg p-6 w-64">
                <div className="flex items-start justify-between">
                    <div className="text-red-500 text-6xl">♦️</div>
                    <div className="text-gray-800 font-bold text-xl">
                        TOMMY ROSE
                    </div>
                </div>
                <div className="my-4">
                    <div className="flex items-center">
                        <div className="text-red-500 text-sm">♦️</div>
                        <div className="ml-2 text-gray-700">
                            Trent Alexander-Arnold
                        </div>
                        <div className="ml-auto text-gray-800 font-bold">1</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-red-500 text-sm">♦️</div>
                        <div className="ml-2 text-gray-700">
                            Michail Antonio
                        </div>
                        <div className="ml-auto text-gray-800 font-bold">2</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-red-500 text-sm">♦️</div>
                        <div className="ml-2 text-gray-700">Antony</div>
                        <div className="ml-auto text-gray-800 font-bold">1</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-red-500 text-sm">♦️</div>
                        <div className="ml-2 text-gray-700">Serge Aurier</div>
                        <div className="ml-auto text-gray-800 font-bold">3</div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-gray-800 font-bold text-lg">Total</div>
                    <div className="text-gray-800 font-bold text-lg">8</div>
                </div>
                <div className="flex items-center justify-end">
                    <div className="text-red-500 text-6xl rotate-180">♦️</div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
