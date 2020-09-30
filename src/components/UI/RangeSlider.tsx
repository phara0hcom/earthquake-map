import React from 'react';
import { Range } from 'rc-slider';
import Switch from 'rc-switch';

import InputComp from './InputComp';

import '../../../node_modules/rc-slider/assets/index.css';
import '../../../node_modules/rc-switch/assets/index.css';
import classes from './RangeSlider.module.scss';

type SliderRangeValue = {
  inputMin: number;
  inputMax: number;
  value: number[];
  isOn: boolean;
};

export interface RangeSliderProps {
  min: number;
  max: number;
  steps: number;
  value: SliderRangeValue;
  onSliderChange: React.Dispatch<React.SetStateAction<SliderRangeValue>>;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  value,
  onSliderChange,
  steps
}) => {
  const handleSliderChange = (val: number[]): void => {
    onSliderChange({
      inputMin: val[0],
      inputMax: val[1],
      value: val,
      isOn: true
    });
  };

  const changeInput = (type: 'inputMin' | 'inputMax') => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const val = +event.target.value;
    onSliderChange((prev) => {
      const newValue = [...prev.value];
      const index = type === 'inputMin' ? 0 : 1;
      newValue[index] = val;
      return {
        ...prev,
        [type]: val,
        value: newValue,
        isOn: true
      };
    });
  };

  const onChangeSwitch = (val: boolean): void => {
    onSliderChange((prev) => ({
      ...prev,
      isOn: val
    }));
  };

  return (
    <>
      <div className={classes.inputs}>
        <Switch
          className={classes.switch}
          checked={value.isOn}
          onChange={onChangeSwitch}
          onClick={onChangeSwitch}
        />
        <InputComp
          disabled={!value.isOn}
          label="min"
          type="number"
          id="rangeMin"
          value={value.inputMin}
          className={classes.rangeInput}
          onChange={changeInput('inputMin')}
        />
        <InputComp
          disabled={!value.isOn}
          label="max"
          type="number"
          id="rangeMax"
          value={value.inputMax}
          className={classes.rangeInput}
          onChange={changeInput('inputMax')}
        />
      </div>
      <Range
        disabled={!value.isOn}
        min={min}
        max={max}
        step={steps}
        allowCross={false}
        value={value.value}
        onChange={handleSliderChange}
      />
    </>
  );
};

export default RangeSlider;
