import React, { useState } from 'react';
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer
} from 'react-map-gl';

import classes from './MapAreaGL.module.scss';

type MapAreaProps = {
  mapsApiKey: string;
  geoData: GeoJSON.FeatureCollection<GeoJSON.Geometry> | null;
};

const MapArea: React.FC<MapAreaProps> = ({ mapsApiKey, geoData }) => {
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
        onViewportChange={(nextViewport): void => setViewport(nextViewport)}
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
        {geoData ? (
          <Source type="geojson" data={geoData}>
            <Layer
              type="circle"
              id="earthquake"
              source="Point"
              paint={{
                'circle-color': {
                  property: 'mag',
                  stops: [
                    [0, '#3288bd'],
                    [1, '#59bbc5'],
                    [2, '#abdda4'],
                    [3, '#ddf84f'],
                    [4, '#ffffbf'],
                    [5, '#fcc101'],
                    [6, '#f49543'],
                    [7, '#fa4c16'],
                    [8, '#d53e4f']
                  ]
                },
                'circle-opacity': 0.8
              }}
            />
          </Source>
        ) : null}
      </ReactMapGL>
    </div>
  );
};
export default MapArea;
