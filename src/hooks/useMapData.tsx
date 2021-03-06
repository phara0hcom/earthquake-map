import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import { queryEarthquakeData, QueryResponse } from '../api/earthquakeData';

import { MapFilterObj } from './useMapFilter';

dayjs.extend(utc);

export type UseMapGeoData = {
  data: QueryResponse | null;
  calling: boolean;
};

const useMapData = ({
  dateRange,
  sortBy,
  magnitudeRange
}: MapFilterObj): UseMapGeoData => {
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
      ...(sortBy ? { orderby: sortBy } : { orderby: 'time' }),
      ...(magnitudeRange ? { maxmagnitude: magnitudeRange.max } : {}),
      ...(magnitudeRange ? { minmagnitude: magnitudeRange.min } : {})
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
  }, [dateRange, sortBy, magnitudeRange]);

  return mapData;
};

export default useMapData;
