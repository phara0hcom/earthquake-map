import dayjs from 'dayjs';
import React from 'react';
import { Popup } from 'react-map-gl';

import { QueryFeatureObj } from '../../api/earthquakeData';

import './PopUpToolTip.scss';
import classes from './PopUpToolTip.module.scss';
import TextLink from '../buttons/TextLink';
import MagnitudeComp from '../MagnitudeComp';

type PopUpToolTipProps = {
  feature: QueryFeatureObj;
  lng: number;
  lat: number;
  onClose: () => void;
};

const PopUpToolTip: React.FC<PopUpToolTipProps> = ({
  feature,
  lng,
  lat,
  onClose
}) => {
  console.log({ feature });
  return (
    <Popup
      tipSize={5}
      anchor="bottom"
      longitude={lng}
      latitude={lat}
      closeOnClick={false}
      onClose={onClose}
    >
      <div className={classes.popUpDescription}>
        <div className={classes.title}>{feature.properties.place}</div>
        <div className={classes.mag}>
          <div>Magnitude: </div>
          <MagnitudeComp mag={feature.properties.mag} />
        </div>
        <div>
          Date:
          {` ${dayjs(feature.properties.time).format('YYYY-MM-DD HH:mm:ss')}`}
        </div>
        <div>
          <TextLink url={feature.properties.url} target="_new">
            More details
          </TextLink>
        </div>
      </div>
    </Popup>
  );
};

export default PopUpToolTip;
