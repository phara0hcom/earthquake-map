import React, { useState } from 'react';
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
  PointerEvent
} from 'react-map-gl';
import { FeatureProperties, QueryFeatureObj } from '../api/earthquakeData';

import HoverToolTip from './HoverToolTip';

import classes from './MapAreaGL.module.scss';
import PopUpToolTip from './PopUpToolTip';

type MapAreaProps = {
  mapsApiKey: string;
  geoData: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    FeatureProperties
  > | null;
};

const MapArea: React.FC<MapAreaProps> = ({ mapsApiKey, geoData }) => {
  const [viewport, setViewport] = useState({
    latitude: 35.6762,
    longitude: 139.6503,
    zoom: 5
  });
  const [hoverState, setHoverState] = useState({
    hoveredFeature: null,
    x: 0,
    y: 0
  } as { hoveredFeature: null | QueryFeatureObj; x: number; y: number });
  const [clickState, setClickState] = useState({
    clickedFeature: null,
    lng: 0,
    lat: 0
  } as { clickedFeature: null | QueryFeatureObj; lng: number; lat: number });

  const onHoverMap = (event: PointerEvent): void => {
    const {
      features,
      srcEvent: { offsetX, offsetY }
    } = event;

    const hoveredFeature: QueryFeatureObj =
      features && features.find((f) => f.layer.id === 'earthquake');

    if (!clickState.clickedFeature) {
      setHoverState({ hoveredFeature, x: offsetX, y: offsetY });
    }
  };

  const onClickMap = (event: PointerEvent): void => {
    const { features } = event;

    const clickedFeature: QueryFeatureObj =
      features && features.find((f) => f.layer.id === 'earthquake');

    setHoverState({ hoveredFeature: null, x: 0, y: 0 });

    if (clickedFeature) {
      setClickState({
        clickedFeature,
        lng: clickedFeature.geometry.coordinates[0],
        lat: clickedFeature.geometry.coordinates[1]
      });
    } else {
      setClickState({ clickedFeature: null, lng: 0, lat: 0 });
    }
  };

  const calcCircleRadius = (zoom: number): number => {
    if (zoom < 5) {
      return 5;
    }

    return (zoom / 5) * 6;
  };

  const { hoveredFeature } = hoverState;
  const hoverX = hoverState.x;
  const hoverY = hoverState.y;
  const { clickedFeature } = clickState;
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
        onHover={onHoverMap}
        onClick={onClickMap}
        interactiveLayerIds={['earthquake']}
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
          <>
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
                  'circle-opacity': 0.8,
                  'circle-radius': calcCircleRadius(viewport.zoom)
                }}
              />
            </Source>
            {hoveredFeature ? (
              <HoverToolTip
                hoveredFeature={hoveredFeature}
                x={hoverX}
                y={hoverY}
              />
            ) : null}
            {clickedFeature ? (
              <PopUpToolTip
                lat={clickState.lat}
                lng={clickState.lng}
                feature={clickedFeature}
                onClose={(): void =>
                  setClickState({ clickedFeature: null, lat: 0, lng: 0 })
                }
              />
            ) : null}
          </>
        ) : null}
      </ReactMapGL>
    </div>
  );
};
export default MapArea;
