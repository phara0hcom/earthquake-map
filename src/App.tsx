import React, { useState } from 'react';

import MapArea from './components/map/MapAreaGL';
import DateRangeSelect from './components/UI/DateRangeSelect';
import Modal from './components/UI/Modal';

import { mapsApiKey } from './api/keys';
import useDateSelect from './hooks/useDateSelect';

import classes from './App.module.scss';
import useMapData from './hooks/useMapData';
import LoadingModal from './components/UI/LoadingModal';
import QueryTable from './components/table/QueryTable';
import useMapViewport from './hooks/useMapViewport';

import '../node_modules/mapbox-gl/dist/mapbox-gl.css';

const App: React.FC = () => {
  const [viewport, setViewport] = useMapViewport({
    latitude: 35.6762,
    longitude: 139.6503,
    zoom: 2
  });
  const useDateRange = useDateSelect();
  const apiData = useMapData(useDateRange.dateRange);
  const [showDateInput, setShowDateInput] = useState(false);
  const [showTable, setShowTable] = useState(false);

  return (
    <div className={classes.App}>
      <LoadingModal show={apiData.calling} />
      <Modal
        show={showDateInput}
        clickToClose={(): void => setShowDateInput(false)}
      >
        <DateRangeSelect
          handleClose={(): void => setShowDateInput(false)}
          useDateSelect={useDateRange}
        />
      </Modal>
      <QueryTable
        showTable={showTable}
        setViewport={setViewport}
        geoData={apiData.data}
        closeTable={(): void => setShowTable(false)}
      />
      <MapArea
        viewport={viewport}
        setViewport={setViewport}
        mapsApiKey={mapsApiKey}
        geoData={apiData.data}
        dateRange={useDateRange.dateRange}
        openDateSelect={(): void => setShowDateInput(true)}
        openDateTable={(): void => setShowTable(true)}
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
