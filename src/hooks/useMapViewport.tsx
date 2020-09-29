import { useState } from 'react';

export type ViewportObj = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type UseMapViewport = [
  ViewportObj,
  React.Dispatch<React.SetStateAction<ViewportObj>>
];

const useMapViewport = (init: ViewportObj): UseMapViewport => {
  const [viewport, setViewport] = useState(init);

  return [viewport, setViewport];
};

export default useMapViewport;
