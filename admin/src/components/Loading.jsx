import React from 'react';

const Loading = () => {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-opacity-50 bg-gray-800 z-50">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    );
  };

export default Loading