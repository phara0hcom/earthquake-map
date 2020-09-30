import axios, { AxiosResponse } from 'axios';
import { Feature, Point } from 'geojson';

export type FeatureProperties = {
  alert: string;
  cdi: string;
  code: string;
  detail: string;
  dmin: number;
  felt: string;
  gap: number;
  ids: string;
  mag: number;
  magType: string;
  mmi: string;
  net: string;
  nst: string;
  place: string;
  rms: number;
  sig: number;
  sources: string;
  status: string;
  time: number;
  title: string;
  tsunami: number;
  type: string;
  types: string;
  tz: string;
  updated: number;
  url: string;
};

export type QueryFeatureObj = Feature<Point, FeatureProperties>;

export type OrderByQuery = 'time' | 'time-asc' | 'magnitude' | 'magnitude-asc';

export type QueryResponse = GeoJSON.FeatureCollection<Point, FeatureProperties>;

export const queryEarthquakeData = (params: {
  format: 'geojson' | 'csv' | 'kml' | 'quakeml' | 'text' | 'xml';
  starttime?: string;
  endtime?: string;
  orderby?: OrderByQuery;
  minmagnitude?: number;
  maxmagnitude?: number;
}): Promise<AxiosResponse<QueryResponse>> =>
  axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', { params });

export const getDetails = (
  url: string
): Promise<AxiosResponse<QueryResponse>> => axios.get(url);

export default { queryEarthquakeData };
