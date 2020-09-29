import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import {
  OrderByQuery,
  queryEarthquakeData,
  QueryResponse
} from '../api/earthquakeData';

import { DateSelectObj } from './useDateSelect';

dayjs.extend(utc);

export type UseMapGeoData = {
  data: QueryResponse | null;
  calling: boolean;
};

const useMapData = (
  date: DateSelectObj,
  orderBy: OrderByQuery = 'time'
): UseMapGeoData => {
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

    const { startDate, endDate } = date;

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
      ...(orderBy ? { orderby: orderBy } : { orderby: 'time' })
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
  }, [date, orderBy]);

  return mapData;
};

export default useMapData;
