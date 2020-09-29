import React from 'react';

import classes from './MagnitudeScale.module.scss';

type MagnitudeScaleProps = {
  scaleColors: Array<string>;
};

const MagnitudeScale: React.FC<MagnitudeScaleProps> = ({ scaleColors }) => {
  // const [showAll, setShowAll] = useState(true);

  const nrRender = (nr: number): string => {
    if (nr === 0) return `< ${nr}`;
    if (nr === scaleColors.length - 1) return `${nr} >`;
    return `${nr}`;
  };

  return (
    <div className={classes.magWrapper}>
      <div className={classes.magTitle}>Magnitude</div>
      <div className={classes.magColorsWrap}>
        {scaleColors.map((color, nr) => (
          <div key={`color${nr + 1}`} className={classes.magWrap}>
            <div
              style={{ backgroundColor: color }}
              className={classes.magColor}
            />
            <div className={classes.magNr}>{nrRender(nr)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagnitudeScale;
