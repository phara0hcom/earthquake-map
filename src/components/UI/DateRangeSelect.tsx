import React, { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';

import { MagnitudeRange, UseMapFilterObj } from '../../hooks/useMapFilter';
import InputComp from './InputComp';

// default day-picker css
import '../../../node_modules/react-day-picker/lib/style.css';
// overwrite day-picker css
import './dayPicker.scss';
// component styles
import classes from './DateRangeSelect.module.scss';
import ButtonComp from '../buttons/ButtonComp';
import { dateRegex } from '../../constants';
import RangeSlider from './RangeSlider';
import Modal from './Modal';

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

type HasErrorState = {
  hasError: boolean;
  errorMsg: null | string;
  startDateError: boolean;
  endDateError: boolean;
};

type DateSelectProps = {
  useMapFilter: UseMapFilterObj;
  handleClose: () => void;
  show: boolean;
};

const DateSelect: React.FC<DateSelectProps> = ({
  useMapFilter,
  handleClose,
  show
}) => {
  const today = new Date();
  const todayDayJs = dayjs().endOf('day');
  const {
    mapFilter: { dateRange, magnitudeRange },
    setMapFilter
  } = useMapFilter;
  const [sliderVal, setSlider] = useState({
    inputMin: magnitudeRange && magnitudeRange.min ? magnitudeRange.min : 1,
    inputMax: magnitudeRange && magnitudeRange.max ? magnitudeRange.max : 10,
    value: [
      magnitudeRange && magnitudeRange.min ? magnitudeRange.min : 1,
      magnitudeRange && magnitudeRange.max ? magnitudeRange.max : 10
    ],
    isOn: !!magnitudeRange
  });
  const [inputError, setError] = useState({
    hasError: false,
    errorMsg: null,
    startDateError: false,
    endDateError: false
  } as HasErrorState);

  const [inputs, setInputs] = useState({
    startDate: dayjs(dateRange.startDate).format('YYYY-MM-DD'),
    endDate: dayjs(dateRange.endDate).format('YYYY-MM-DD')
  });
  const [picker, setPicker] = useState({
    from: dateRange.startDate,
    to: dateRange.endDate
  });

  const isValidDateRange = (
    start: string | Date,
    end: string | Date,
    current?: Date | string
  ): string | null => {
    let startDayJs = dayjs(start);
    let endDayJs = dayjs(end);
    if (typeof start === 'string') {
      if (!dateRegex.test(start)) return 'Error: invalid From Date';
      startDayJs = dayjs(start, 'YYYY-MM-DD');
    }
    if (typeof end === 'string') {
      if (!dateRegex.test(end)) return 'Error: invalid From To';
      endDayJs = dayjs(end, 'YYYY-MM-DD');
    }

    const dayDiff = endDayJs.diff(startDayJs, 'day');
    const currentDayJs =
      typeof current === 'string'
        ? dayjs(current, 'YYYY-MM-DD')
        : dayjs(current);

    if (current && !currentDayJs.isSameOrBefore(todayDayJs)) {
      // error not in the future
      return 'Error: Future dates not allowed';
    }

    if (dayDiff > 30) {
      return 'Error: Max range is 30 days';
    }
    if (dayDiff < 0) {
      return 'Error: End date can not be before the Start date';
    }

    return null;
  };

  const handleDayClick = (day: Date): void => {
    const range = DateUtils.addDayToRange(day, {
      ...picker
    });
    const errorMsg = isValidDateRange(range.from, range.to, day);

    setInputs({
      startDate: dayjs(range.from).format('YYYY-MM-DD'),
      endDate: dayjs(range.to).format('YYYY-MM-DD')
    });
    setPicker({ ...range });

    setError((prev) => ({ ...prev, hasError: !!errorMsg, errorMsg }));
  };

  const changeInput = (type: 'startDate' | 'endDate') => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let errorMsg: null | string = null;
    const val = event.target.value;
    setInputs((prev) => ({ ...prev, [type]: val }));

    const validDateStr = dateRegex.test(val);

    // TODO: add manual input validation
    if (validDateStr) {
      let otherType: null | string = null;

      const start = type === 'startDate' ? val : inputs.startDate;
      const end = type === 'endDate' ? val : inputs.endDate;
      errorMsg = isValidDateRange(start, end, val);
      if (errorMsg) {
        const startDateInput = type === 'startDate' ? val : inputs.startDate;
        const endDateInput = type === 'endDate' ? val : inputs.endDate;
        const errorMsgInput = isValidDateRange(
          startDateInput,
          endDateInput,
          val
        );
        if (!errorMsgInput) {
          errorMsg = errorMsgInput;
          otherType = type === 'startDate' ? 'endDate' : 'startDate';
        }
      }

      setError((prev) => ({
        ...prev,
        [`${type}Error`]: !!errorMsg,
        ...(otherType ? { [`${otherType}Error`]: false } : {}),
        hasError: false,
        errorMsg
      }));
    } else {
      errorMsg = 'Error: please enter a valid date';
      setError((prev) => ({
        ...prev,
        [`${type}Error`]: true,
        errorMsg
      }));
    }

    const pickerKey = type === 'startDate' ? 'from' : 'to';
    setPicker((prev) => ({
      ...prev,
      [pickerKey]: errorMsg ? null : dayjs(val, 'YYYY-MM-DD').toDate()
    }));
  };

  const handleSubmit = (): void => {
    handleClose();
    let newMagnitudeRange: MagnitudeRange = null;
    if (sliderVal.isOn) {
      newMagnitudeRange = {
        min: sliderVal.value[0],
        max: sliderVal.value[1]
      };
    }
    setMapFilter((prev) => ({
      ...prev,
      dateRange: {
        startDate: dayjs(inputs.startDate, 'YYYY-DD-MM').toDate(),
        endDate: dayjs(inputs.endDate, 'YYYY-DD-MM').toDate()
      },
      magnitudeRange: newMagnitudeRange
    }));
  };

  const { from, to } = picker;
  const modifiers = { start: from, end: to };
  return (
    <Modal className={classes.modal} show={show} clickToClose={handleClose}>
      <div className={classes.dateRangeWrapper}>
        <div className={classes.title}>Magnitude filter</div>
        <div className={classes.magRangeWrap}>
          <RangeSlider
            min={1}
            max={10}
            value={sliderVal}
            steps={0.5}
            onSliderChange={setSlider}
          />
        </div>
        <div className={classes.title}>Date Range</div>
        <div className={classes.inputsWrapper}>
          <InputComp
            label="From"
            required
            autoFocus
            type="text"
            placeholder="YYYY-MM-DD"
            id="inputStart"
            className={classes.dateInput}
            hasError={inputError.startDateError}
            value={inputs.startDate}
            max={todayDayJs.format('YYYY-MM-DD')}
            onChange={changeInput('startDate')}
          />
          <InputComp
            label="To"
            required
            type="text"
            placeholder="YYYY-MM-DD"
            id="inputEnd"
            hasError={inputError.endDateError}
            className={classes.dateInput}
            value={inputs.endDate}
            max={todayDayJs.format('YYYY-MM-DD')}
            onChange={changeInput('endDate')}
          />
        </div>
        <div className={classes.pickerWrapper}>
          <div className={classes.pickerError}>
            {inputError.errorMsg ? inputError.errorMsg : '\u00A0'}
          </div>
          <DayPicker
            className={`selectable${inputError.hasError ? 'Error' : ''}`}
            numberOfMonths={2}
            toMonth={today}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={handleDayClick}
            fixedWeeks
          />
        </div>
        <div className={classes.buttonWrap}>
          <ButtonComp
            onClick={handleSubmit}
            disabled={!!isValidDateRange(inputs.startDate, inputs.endDate)}
            id="submitDates"
          >
            Submit
          </ButtonComp>
          <ButtonComp secondary onClick={handleClose} id="cancelDates">
            Cancel
          </ButtonComp>
        </div>
      </div>
    </Modal>
  );
};

export default DateSelect;
