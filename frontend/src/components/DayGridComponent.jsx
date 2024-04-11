import React from 'react';

const DayGridComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-4/5 md:w-11/12 bg-white shadow-lg rounded-lg p-8">
        {/* Day grid content */}
        <div className="grid grid-cols-7 gap-4">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="h-40 flex flex-col justify-center items-center bg-orange-300 bg-opacity-40 border border-black rounded"
              style={{
                opacity: 0.8,
                marginBottom: '16px',
              }}
            >
              {/* Day number */}
              <span
                className="text-lg font-semibold"
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                Day {index + 1}
              </span>
              {/* Additional content for each day */}
              {/* Example: You can add events or other details here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayGridComponent;