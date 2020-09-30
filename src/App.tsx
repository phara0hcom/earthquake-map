import React, { useState } from 'react';

import MapArea from './components/map/MapArea';
import DateRangeSelect from './components/UI/DateRangeSelect';

import { mapsApiKey } from './keys';
import useMapFilter from './hooks/useMapFilter';

import classes from './App.module.scss';
import useMapData from './hooks/useMapData';
import LoadingModal from './components/UI/LoadingModal';
import QueryTable from './components/table/QueryTable';
import useMapViewport from './hooks/useMapViewport';

import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import useClickState from './hooks/useClickState';

const App: React.FC = () => {
  const [viewport, setViewport] = useMapViewport({
    latitude: 35.6762,
    longitude: 139.6503,
    zoom: 2
  });
  const [clickState, setClickState] = useClickState({
    clickedFeature: null,
    lng: 0,
    lat: 0
  });
  const { mapFilter, setMapFilter } = useMapFilter();
  const apiData = useMapData(mapFilter);
  const [showDateInput, setShowDateInput] = useState(false);
  const [showTable, setShowTable] = useState(false);

  return (
    <div className={classes.App}>
      <LoadingModal show={apiData.calling} />

      <DateRangeSelect
        show={showDateInput}
        handleClose={(): void => setShowDateInput(false)}
        useMapFilter={{ mapFilter, setMapFilter }}
      />

      <QueryTable
        setClickState={setClickState}
        showTable={showTable}
        setViewport={setViewport}
        geoData={apiData.data}
        orderBy={mapFilter.sortBy}
        setMapFilter={setMapFilter}
        closeTable={(): void => setShowTable(false)}
      />
      <MapArea
        viewport={viewport}
        clickStateObj={[clickState, setClickState]}
        setViewport={setViewport}
        mapsApiKey={mapsApiKey}
        geoData={apiData.data}
        mapFilter={mapFilter}
        openDateSelect={(): void => setShowDateInput(true)}
        openDateTable={(): void => setShowTable(true)}
      />
      {/* 
      TODO: Add Magnitude filter

      TODO: Description

      TODO: hide Magnitude scale on click

      TODO: Add detail call on popUp 

      TODO: Add Testing

      TODO: Table on click item zoom in map
    */}
    </div>
  );
};

export default App;
