import dayjs from 'dayjs';
import { useState } from 'react';

export type DateSelectObj = { startDate: Date; endDate: Date };

export type UseDateSelect = {
  dateRange: DateSelectObj;
  setDateRange: React.Dispatch<React.SetStateAction<DateSelectObj>>;
};

const useDateSelect = (): UseDateSelect => {
  const today = new Date();
  const minus30days = dayjs().subtract(30, 'day').toDate();
  const [dateRange, setDateRange] = useState({
    startDate: minus30days,
    endDate: today
  });

  return { dateRange, setDateRange };
};

export default useDateSelect;
