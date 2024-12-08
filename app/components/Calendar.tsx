'use client';

import React, { useEffect, useState } from 'react';
import useTodoStore from '../store/todoStore';

const Calendar: React.FC = () => {
  const { setSelectedDate } = useTodoStore();
  const [selectedDate, setSelectedDateState] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const storedDate = localStorage.getItem('selectedDate');
    if (storedDate) {
      setSelectedDateState(storedDate);
    }
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setSelectedDateState(newDate);
    setSelectedDate(newDate);
  };

  return (
    <div className="flex justify-center items-center space-x-4 mb-6">
      <label htmlFor="calendar" className="text-lg font-medium">
        Select Date:
      </label>
      <input
        type="date"
        id="calendar"
        value={selectedDate}
        onChange={handleDateChange}
        className="border border-gray-300 p-2 rounded-md"
      />
    </div>
  );
};

export default Calendar;
