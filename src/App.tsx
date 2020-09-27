import React from 'react';

import DateRangeSelect from './components/DateRangeSelect';
import MapArea from './components/MapAreaGL';

import { mapsApiKey } from './api/keys';
import useDateSelect from './hooks/useDateSelect';

import classes from './App.module.scss';

const App: React.FC = () => {
  const useDateRange = useDateSelect();

  return (
    <div className={classes.App}>
      <DateRangeSelect useDateSelect={useDateRange} />
      <MapArea mapsApiKey={mapsApiKey} />
      {/* 
      TODO: add Api call Hooks
      TODO: add Api data to map
      TODO: add custom components 
      TODO: Date select in Modal
      TODO: Add filter
      TODO: Add Testing
      TODO: add Table
      TODO: Table on click item zoom in map
    */}
    </div>
  );
};

export default App;
