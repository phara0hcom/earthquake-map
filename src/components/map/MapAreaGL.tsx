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
import { QueryFeatureObj, QueryResponse } from '../../api/earthquakeData';
import { magnitudeScaleColors } from '../../constants';
import { DateSelectObj } from '../../hooks/useDateSelect';
import { ViewportObj } from '../../hooks/useMapViewport';
import FromToInfoBox from './FromToInfoBox';

import HoverToolTip from './HoverToolTip';
import MagnitudeScale from './MagnitudeScale';

import classes from './MapAreaGL.module.scss';
import PopUpToolTip from './PopUpToolTip';
import ToggleTable from './ToggleTable';

type MapAreaProps = {
  viewport: ViewportObj;
  setViewport: React.Dispatch<React.SetStateAction<ViewportObj>>;
  mapsApiKey: string;
  geoData: QueryResponse | null;
  dateRange: DateSelectObj;
  openDateSelect: () => void;
  openDateTable: () => void;
};

const MapArea: React.FC<MapAreaProps> = ({
  viewport,
  setViewport,
  mapsApiKey,
  geoData,
  dateRange,
  openDateSelect,
  openDateTable
}) => {
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
      setViewport({
        longitude: clickedFeature.geometry.coordinates[0],
        latitude: clickedFeature.geometry.coordinates[1],
        zoom: 5
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
          <NavigationControl showCompass={false} />
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
                      [0, magnitudeScaleColors[0]],
                      [1, magnitudeScaleColors[1]],
                      [2, magnitudeScaleColors[2]],
                      [3, magnitudeScaleColors[3]],
                      [4, magnitudeScaleColors[4]],
                      [5, magnitudeScaleColors[5]],
                      [6, magnitudeScaleColors[6]],
                      [7, magnitudeScaleColors[7]],
                      [8, magnitudeScaleColors[8]]
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
            <FromToInfoBox onClick={openDateSelect} dateRange={dateRange} />
            <ToggleTable onClick={openDateTable} />
            <MagnitudeScale scaleColors={magnitudeScaleColors} />
          </>
        ) : null}
      </ReactMapGL>
    </div>
  );
};
export default MapArea;
