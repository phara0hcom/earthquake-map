import dayjs from 'dayjs';
import { useState } from 'react';
import { OrderByQuery } from '../api/earthquakeData';

export type DateSelectObj = { startDate: Date; endDate: Date };
export type MagnitudeRange = { min: number; max: number } | null;
export type MapFilterObj = {
  dateRange: DateSelectObj;
  sortBy: OrderByQuery;
  magnitudeRange: MagnitudeRange;
};

export type SetMapFilter = React.Dispatch<React.SetStateAction<MapFilterObj>>;

export type UseMapFilterObj = {
  mapFilter: MapFilterObj;
  setMapFilter: SetMapFilter;
};

const useMapFilter = (): UseMapFilterObj => {
  const today = new Date();
  const minus30days = dayjs().subtract(30, 'day').toDate();
  const [mapFilter, setMapFilter] = useState({
    dateRange: {
      startDate: minus30days,
      endDate: today
    },
    sortBy: 'time',
    magnitudeRange: null
  } as MapFilterObj);

  return { mapFilter, setMapFilter };
};

export default useMapFilter;
