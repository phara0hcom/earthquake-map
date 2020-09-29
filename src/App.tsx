import React, { useState } from 'react';

import MapArea from './components/map/MapAreaGL';
import DateRangeSelect from './components/UI/DateRangeSelect';
import Modal from './components/UI/Modal';

import { mapsApiKey } from './api/keys';
import useDateSelect from './hooks/useDateSelect';

import classes from './App.module.scss';
import useMapData from './hooks/useMapData';
import LoadingModal from './components/UI/LoadingModal';

const App: React.FC = () => {
  const useDateRange = useDateSelect();
  const apiData = useMapData(useDateRange.dateRange);
  const [showDateInput, setDateInput] = useState(false);

  return (
    <div className={classes.App}>
      <LoadingModal show={apiData.calling} />
      <Modal
        show={showDateInput}
        clickToClose={(): void => setDateInput(false)}
      >
        <DateRangeSelect
          handleClose={(): void => setDateInput(false)}
          useDateSelect={useDateRange}
        />
      </Modal>
      <MapArea
        mapsApiKey={mapsApiKey}
        geoData={apiData.data}
        dateRange={useDateRange.dateRange}
        openDateSelect={(): void => setDateInput(true)}
      />
      {/* 
      TODO: add Table

      TODO: add Table onClick zoom

      TODO: add Table sort

      TODO: Description

      TODO: hide Magnitude scale
      
      TODO: Add filter

      TODO: Add Testing

      TODO: Table on click item zoom in map
    */}
    </div>
  );
};

export default App;
