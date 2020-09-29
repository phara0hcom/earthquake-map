import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import {
  OrderByQuery,
  queryEarthquakeData,
  QueryResponse
} from '../api/earthquakeData';

import { DateSelectObj } from './useMapFilter';

dayjs.extend(utc);

export type UseMapGeoData = {
  data: QueryResponse | null;
  calling: boolean;
};

const useMapData = ({
  dateRange,
  sortBy
}: {
  dateRange: DateSelectObj;
  sortBy: OrderByQuery;
}): UseMapGeoData => {
  const [mapData, setMapData] = useState({
    data: null,
    calling: false
  } as UseMapGeoData);

  useEffect(() => {
    // fetch data
    let current = true;
    setMapData((prev) => ({
      ...prev,
      calling: true
    }));

    const { startDate, endDate } = dateRange;

    const startUtc = dayjs(startDate)
      .startOf('day')
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss');
    const endUtc = dayjs(endDate)
      .endOf('day')
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss');
    queryEarthquakeData({
      format: 'geojson',
      ...(startDate ? { starttime: startUtc } : {}),
      ...(endDate ? { endtime: endUtc } : {}),
      ...(sortBy ? { orderby: sortBy } : { orderby: 'time' })
    }).then((res) => {
      if (current) {
        setMapData({
          calling: false,
          data: res.data
        });
      }
    });
    return (): void => {
      current = false;
    };
  }, [dateRange, sortBy]);

  return mapData;
};

export default useMapData;
