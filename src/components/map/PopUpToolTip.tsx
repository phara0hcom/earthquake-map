import dayjs from 'dayjs';
import React from 'react';
import { Popup } from 'react-map-gl';

import { QueryFeatureObj } from '../../api/earthquakeData';

import './PopUpToolTip.scss';
import classes from './PopUpToolTip.module.scss';
import TextLink from '../buttons/TextLink';

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
}) => (
  <Popup
    tipSize={5}
    anchor="bottom"
    longitude={lng}
    latitude={lat}
    closeOnClick={false}
    onClose={onClose}
  >
    <div className={classes.popUpDescription}>
      <div>{feature.properties.place}</div>
      <div>Type: {feature.properties.type}</div>
      <div>Magnitude: {feature.properties.mag}</div>
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

export default PopUpToolTip;
