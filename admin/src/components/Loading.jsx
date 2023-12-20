import React from 'react';
import '../App.css'

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-50 bg-gray-800 z-50">
            <div class="relative">
                <div class="w-10 h-10 border-purple-200 border-2 rounded-full"></div>
                <div class="w-10 h-10 border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>
        </div>
    );
};

export default Loading