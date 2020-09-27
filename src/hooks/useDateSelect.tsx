import { useState } from 'react';

export type DateSelectObj = { startDate: Date; endDate: Date };

export type UseDateSelect = {
  dateRange: DateSelectObj;
  setDateRange: React.Dispatch<React.SetStateAction<DateSelectObj>>;
};

const useDateSelect = (): UseDateSelect => {
  const today = new Date();
  const [dateRange, setDateRange] = useState({
    startDate: today,
    endDate: today
  });

  return { dateRange, setDateRange };
};

export default useDateSelect;
