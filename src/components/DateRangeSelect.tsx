import React, { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';

import { UseDateSelect } from '../hooks/useDateSelect';
import InputComp from './InputComp';

import classes from './DateRangeSelect.module.scss';

import '../../node_modules/react-day-picker/lib/style.css';
import './dayPicker.scss';

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

type HasErrorState = {
  hasError: boolean;
  errorMsg: null | string;
  startDateError: boolean;
  endDateError: boolean;
};

type DateSelectProps = {
  useDateSelect: UseDateSelect;
};

const DateSelect: React.FC<DateSelectProps> = ({ useDateSelect }) => {
  const today = new Date();
  const todayDayJs = dayjs().endOf('day');
  const { dateRange, setDateRange } = useDateSelect;
  const { startDate, endDate } = dateRange;
  const modifiers = { start: startDate, end: endDate };

  const [inputError, setError] = useState({
    hasError: false,
    errorMsg: null,
    startDateError: false,
    endDateError: false
  } as HasErrorState);
  const [inputs, setInputs] = useState({
    startDate: dayjs(startDate).format('YYYY-MM-DD'),
    endDate: dayjs(endDate).format('YYYY-MM-DD')
  });

  const isValidDate = (
    start: string | Date,
    end: string | Date,
    current?: Date | string
  ): string | null => {
    const startDayJs =
      typeof start === 'string' ? dayjs(start, 'YYYY-MM-DD') : dayjs(start);
    const endDayJs =
      typeof end === 'string' ? dayjs(end, 'YYYY-MM-DD') : dayjs(end);
    const dayDiff = endDayJs.diff(startDayJs, 'day');

    if (!dayjs(current).isSameOrBefore(todayDayJs)) {
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
      from: startDate,
      to: endDate
    });
    const errorMsg = isValidDate(range.from, range.to, day);

    if (!errorMsg) {
      setDateRange({
        startDate: range.from,
        endDate: range.to
      });
      setInputs({
        startDate: dayjs(range.from).format('YYYY-MM-DD'),
        endDate: dayjs(range.to).format('YYYY-MM-DD')
      });
    }

    setError((prev) => ({ ...prev, hasError: !!errorMsg, errorMsg }));
  };

  const changeInput = (type: 'startDate' | 'endDate') => (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const val = event.target.value;
    setInputs((prev) => ({ ...prev, [type]: val }));
    const validDateStr = dayjs(val, 'YYYY-MM-DD').isValid();

    // TODO: add manual input validation
    if (validDateStr) {
      let otherType: null | string = null;
      let otherInputVal: null | Date = null;
      const start = type === 'startDate' ? val : startDate;
      const end = type === 'endDate' ? val : endDate;
      let errorMsg = isValidDate(start, end, val);
      if (errorMsg) {
        const startDateInput = type === 'startDate' ? val : inputs.startDate;
        const endDateInput = type === 'endDate' ? val : inputs.endDate;
        const errorMsgInput = isValidDate(startDateInput, endDateInput, val);
        if (!errorMsgInput) {
          errorMsg = errorMsgInput;
          otherType = type === 'startDate' ? 'endDate' : 'startDate';
          otherInputVal = new Date(
            type === 'startDate' ? endDateInput : startDateInput
          );
        }
      }

      setError((prev) => ({
        ...prev,
        [`${type}Error`]: !!errorMsg,
        ...(otherType ? { [`${otherType}Error`]: false } : {}),
        hasError: false,
        errorMsg
      }));
      if (!errorMsg) {
        setDateRange((prev) => ({
          ...prev,
          [type]: new Date(val),
          ...(otherType ? { [`${otherType}`]: otherInputVal } : {})
        }));
      }
    } else {
      setError((prev) => ({
        ...prev,
        [`${type}Error`]: true,
        errorMsg: 'Error: please enter a valid date'
      }));
    }
  };

  return (
    <>
      <div className={classes.inputsWrapper}>
        <InputComp
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
          selectedDays={[startDate, { from: startDate, to: endDate }]}
          modifiers={modifiers}
          onDayClick={handleDayClick}
          fixedWeeks
        />
      </div>
    </>
  );
};

export default DateSelect;
