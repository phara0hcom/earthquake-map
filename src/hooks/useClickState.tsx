import { useState } from 'react';
import { QueryFeatureObj } from '../api/earthquakeData';

export type ClickStateObj = {
  clickedFeature: null | QueryFeatureObj;
  lng: number;
  lat: number;
};

export type SetClickState = React.Dispatch<React.SetStateAction<ClickStateObj>>;

export type UseClickState = [ClickStateObj, SetClickState];

const useClickState = (init: ClickStateObj): UseClickState => {
  const [clickState, setClickState] = useState({ ...init } as ClickStateObj);

  return [clickState, setClickState];
};

export default useClickState;
