import axios, { AxiosResponse } from 'axios';
import { Point } from 'geojson';

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

export type QueryFeatureObj = {
  properties: FeatureProperties;
  geometry: {
    coordinates: [number, number];
  };
};

export type QueryResponse = GeoJSON.FeatureCollection<Point, FeatureProperties>;

export const queryEarthquakeData = (params: {
  format: 'geojson' | 'csv' | 'kml' | 'quakeml' | 'text' | 'xml';
  starttime?: string;
  endtime?: string;
}): Promise<AxiosResponse<QueryResponse>> =>
  axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', { params });

export default { queryEarthquakeData };
