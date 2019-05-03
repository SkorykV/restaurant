import React from 'react'
import PropTypes from 'prop-types'
import {timeShape} from "../../constants";


export const InputTime = ({precision=5, min={h: 0, m: 0}, max={h: 24, m: 0}, value={h: 11, m: 15}, onChange=f=>f}) => {

    const hours = [...Array(max.h - min.h+1)].map((_, i) => i+min.h);
    const intervals = 60 / precision;
    const minutes = [...Array(intervals)].map((_, i) => i*precision);

    const valueHour = (value && (value.h !== undefined)) ? (value.h < 10 ? '0' + value.h : '' + value.h) : '--';
    const valueMinute = (value && (value.m !== undefined)) ? (value.m < 10 ? '0' + value.m : '' + value.m) : '--';

    const getTimeValue = (hour, minute) =>  {
        if(hour === min.h && minute !== undefined && minute < min.m) {
            return {h: hour, m: undefined}
        }
        if(hour === max.h && minute !== undefined && minute > max.m) {
            return {h: hour, m: undefined}
        }
        return {h: hour, m: minute}
    };

    const handleHourChange = (event) => {
        const newValue = +event.target.value;
        const minutesValue = (value && value.m !== undefined) ? value.m : undefined;
        if(!Number.isInteger(newValue) || newValue < min.h || newValue > max.h) {
            return
        }
        onChange(getTimeValue(newValue, minutesValue));
    };

    const handleMinuteChange = (event) => {
        event.preventDefault();
        const newValue = +event.target.value;
        const hourValue = (value && value.h !== undefined) ? value.h : undefined;
        if(!Number.isInteger(newValue) || newValue < 0 || newValue > 59) {
            return
        }
        const time = getTimeValue(hourValue, newValue);
        if(time.m !== undefined) {
            onChange(time);
        }
    };

    return (
        <span className="input-time">
            <div className="label">
                {`${valueHour}:${valueMinute}`}
            </div>
            <div className="inputs">
                <span className="hours-label">
                    Година:
                    <select size={5} onChange={handleHourChange}>
                        {
                            hours.map(
                                hour => (
                                    <option value={hour} selected={value && value.h === hour} key={hour}>
                                        {hour < 10 ? '0' + hour : hour}
                                    </option>
                                )
                            )
                        }
                    </select>
                </span>

                <span className="minutes-label">
                    Хвилина:
                    <select size={5} onChange={handleMinuteChange}>
                        {
                            minutes.map(
                                minute => (
                                    <option
                                        value={minute}
                                        selected={value && value.m === minute}
                                        disabled={
                                            (value && value.h === min.h && minute < min.m) ||
                                            (value && value.h === max.h && minute > max.m)
                                        }
                                        key={minute}
                                    >
                                        {minute < 10 ? '0' + minute : minute}
                                    </option>
                                )
                            )
                        }
                    </select>
                </span>
            </div>
        </span>
    )
};

InputTime.propTypes = {
    precision: PropTypes.number,
    min: PropTypes.shape(timeShape),
    max: PropTypes.shape(timeShape),
    value: PropTypes.shape(timeShape),
    onChange: PropTypes.func,
};
