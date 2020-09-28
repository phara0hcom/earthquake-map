import axios, { AxiosResponse } from 'axios';

export const queryEarthquakeData = (params: {
  format: 'geojson' | 'csv' | 'kml' | 'quakeml' | 'text' | 'xml';
  starttime?: string;
  endtime?: string;
}): Promise<AxiosResponse<GeoJSON.FeatureCollection<GeoJSON.Geometry>>> =>
  axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', { params });

export default { queryEarthquakeData };
