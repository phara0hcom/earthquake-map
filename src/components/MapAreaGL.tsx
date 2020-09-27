import React, { useState } from 'react';
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';

import classes from './MapAreaGL.module.scss';

type MapAreaProps = {
  mapsApiKey: string;
};

const MapArea: React.FC<MapAreaProps> = ({ mapsApiKey }) => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <div style={{ flex: '1 1 auto' }}>
      <ReactMapGL
        mapboxApiAccessToken={mapsApiKey}
        width="100%"
        height="100%"
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <div className={classes.geoLocateStyle}>
          <GeolocateControl />
        </div>
        <div className={classes.fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className={classes.navStyle}>
          <NavigationControl />
        </div>
        <div className={classes.scaleControlStyle}>
          <ScaleControl />
        </div>
      </ReactMapGL>
    </div>
  );
};
export default MapArea;
