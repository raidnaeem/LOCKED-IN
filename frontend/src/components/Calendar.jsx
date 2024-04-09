import React from 'react';

const Calendar = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-4/5 md:w-1/1 bg-stone-400 shadow border border-black p-8 text-center">
        <div className="text-white text-5xl md:text-4xl font-normal font-montagu-slab">
          MONTH
        </div>
        <div className="text-white text-5xl md:text-4xl font-normal font-montagu-slab">
          YEAR
        </div>
        <div className="mt-8">
          <div className="w-12 h-12 bg-zinc-300 bg-opacity-50 rounded-full mx-auto"></div>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-amber-300 rounded-full"></div>
            <div className="text-white text-3xl md:text-2xl font-normal font-roboto ml-4">
              Add Event
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="w-12 h-12 bg-zinc-300 bg-opacity-50 rounded-full mx-auto"></div>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-amber-300 rounded-full"></div>
            <div className="w-8 h-8 bg-pink-50 border border-white rounded-full ml-2"></div>
            <div className="text-white text-3xl md:text-2xl font-normal font-roboto ml-4">
              Search Event
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
