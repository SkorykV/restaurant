import React, { Component } from 'react'

import PropTypes from "prop-types";

import { Marker } from "./Marker";


export class RangeFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMarker: null,
            ...this.initInputs(),
        };

        this.bar = React.createRef();

        this.handleRangeClick = this.handleRangeClick.bind(this);

        this.handleLeftMarkerPositionChange = this.handleLeftMarkerPositionChange.bind(this);
        this.handleRightMarkerPositionChange = this.handleRightMarkerPositionChange.bind(this);

        this.handleSelectMinMarker = () => this.handleSelectMarker('min');
        this.handleSelectMaxMarker = () => this.handleSelectMarker('max');

        this.handleLeftValueInputChange = this.handleLeftValueInputChange.bind(this);
        this.handleRightValueInputChange = this.handleRightValueInputChange.bind(this);

        this.handleRangeChange = this.handleRangeChange.bind(this);
    }

    initInputs() {
        return {
            leftInputValue: '' + (this.props.range ? this.props.range.from : this.props.boundaries.min),
            rightInputValue: '' + (this.props.range ? this.props.range.to : this.props.boundaries.max),
        }
    }

    handleSelectMarker(label) {
        if(this.state.selectedMarker !== label) {
            this.setState({
                selectedMarker: label,
            })
        }
    }

    handleRangeClick(event) {
        const barRect = this.bar.current.getBoundingClientRect();
        const pos = (event.clientX - barRect.left) / barRect.width;
        if(pos < 0 || pos > 1) {
            return
        }

        const newValue = this.props.boundaries.min + pos * (this.props.boundaries.max - this.props.boundaries.min);

        let newRange;

        if(this.props.range) {
            newRange = {...this.props.range};
        }
        else {
            newRange = {from: this.props.boundaries.min, to: this.props.boundaries.max}
        }

        if(newValue < newRange.from) {
            newRange.from = newValue;
        }
        else if(newValue > newRange.to) {
            newRange.to = newValue;
        }
        else {
            if((newValue - newRange.from) <= (newRange.to - newValue)) {
                newRange.from = newValue;
            }
            else {
                newRange.to = newValue;
            }
        }

        this.handleRangeChange(newRange)
    }

    handleLeftMarkerPositionChange(event) {
        const value = event.clientX;
        const barRect = this.bar.current.getBoundingClientRect();

        const newPos = (value - barRect.left) / barRect.width;

        let newRange;

        if(this.props.range) {
            newRange = {...this.props.range};
        }
        else {
            newRange = {from: this.props.boundaries.min, to: this.props.boundaries.max}
        }

        newRange.from = this.props.boundaries.min + newPos * (this.props.boundaries.max - this.props.boundaries.min);


        if(newRange.from < this.props.boundaries.min) {
            newRange.from = this.props.boundaries.min;
        }
        else if(newRange.from > newRange.to) {
            newRange.from = newRange.to;
        }

        this.handleRangeChange(newRange)
    }

    handleRightMarkerPositionChange(event) {
        const value = event.clientX;
        const barRect = this.bar.current.getBoundingClientRect();

        const newPos = (value - barRect.left) / barRect.width;

        let newRange;

        if(this.props.range) {
            newRange = {...this.props.range};
        }
        else {
            newRange = {from: this.props.boundaries.min, to: this.props.boundaries.max}
        }

        newRange.to = this.props.boundaries.min + newPos * (this.props.boundaries.max - this.props.boundaries.min);


        if(newRange.to < newRange.from) {
            newRange.to = newRange.from;
        }
        else if(newRange.to > this.props.boundaries.max) {
            newRange.to = this.props.boundaries.max;
        }

        this.handleRangeChange(newRange)
    }

    handleLeftValueInputChange(event) {
        this.handleSelectMinMarker();

        if(!this.props.inputValidator(event.target.value)) {
            event.preventDefault();
            return
        }

        this.setState({
            leftInputValue: event.target.value,
        });

        const newValue = +event.target.value;

        let newRange;

        if(this.props.range) {
            newRange = {...this.props.range};
        }
        else {
            newRange = {from: this.props.boundaries.min, to: this.props.boundaries.max}
        }

        if(!Number.isFinite(newValue) || newValue < this.props.boundaries.min || newValue > newRange.to) {
            return
        }

        newRange.from = newValue;

        this.props.onChangeRange(newRange)
    }

    handleRightValueInputChange(event) {
        this.handleSelectMaxMarker();

        if(!this.props.inputValidator(event.target.value)) {
            event.preventDefault();
            return
        }

        this.setState({
            rightInputValue: event.target.value,
        });

        const newValue = +event.target.value;

        let newRange;

        if(this.props.range) {
            newRange = {...this.props.range};
        }
        else {
            newRange = {from: this.props.boundaries.min, to: this.props.boundaries.max}
        }

        if(!Number.isFinite(newValue) || newValue < newRange.from || newValue > this.props.boundaries.max) {
            return
        }

        newRange.to = newValue;

        this.props.onChangeRange(newRange)
    }


    //used if range is changed by markers positions
    handleRangeChange(newRange) {
        const range = {from: this.props.valueConverter(newRange.from), to: this.props.valueConverter(newRange.to)};
        this.props.onChangeRange(range);
        this.setState({
            leftInputValue: '' + range.from,
            rightInputValue: '' + range.to,
        })
    }

    render() {
        const {range, boundaries} = this.props;
        const min = boundaries.min;
        const max = boundaries.max === boundaries.min ? boundaries.max + 1 : boundaries.max;

        let left = range ? range.from : min;
        let right = range ? range.to : max;

        if(left > right) {
            return (
                <div className="rangeFilterContainer">
                    <h3>{'Wrong values for range filter'}</h3>
                </div>
            )
        }

        if(range && range.from < boundaries.min) {
            return (
                <div className="rangeFilterContainer">
                    <h3>{'Wrong left value for range filter'}</h3>
                </div>
            )
        }
        if(range && range.to > boundaries.max) {
            return (
                <div className="rangeFilterContainer">
                    <h3>{'Wrong right value for range filter'}</h3>
                </div>
            )
        }
        const barRange = max - min;
        const rangeStyle = {left: `${(left - min) / barRange * 100}%`, width: `${(right - left) / barRange * 100}%`};
        const enabled = boundaries.max !== boundaries.min;

        return (
            <div className="rangeFilterContainer">
                <h3>{this.props.title + ':'}</h3>
                <div className="rangeFilter" ref={this.bar} onClick={enabled ? this.handleRangeClick : null}>
                    <div className="range" style={rangeStyle} />
                    <Marker
                        enabled={enabled}
                        selected={this.state.selectedMarker === 'min'}
                        position={(left - min)/ barRange * 100}
                        onSelect={this.handleSelectMinMarker}
                        onMove={this.handleLeftMarkerPositionChange}
                    />
                    <Marker
                        enabled={enabled}
                        selected={this.state.selectedMarker === 'max'}
                        position={(right - min)/ barRange * 100}
                        onSelect={this.handleSelectMaxMarker}
                        onMove={this.handleRightMarkerPositionChange}
                    />
                </div>
                <div className="boundsValues">
                    <input
                        className='boundaryInput'
                        type="text"
                        value={this.state.leftInputValue}
                        disabled={!enabled}
                        onChange={enabled ? this.handleLeftValueInputChange : null}
                    />
                    <input
                        className='boundaryInput'
                        type="text"
                        value={this.state.rightInputValue}
                        disabled={!enabled}
                        onChange={enabled ? this.handleRightValueInputChange : null}
                    />
                </div>
            </div>
        )
    }
}

RangeFilter.propTypes = {
    range: PropTypes.shape({
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
    }),
    boundaries: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
    }),
    title: PropTypes.string,
    onChangeRange: PropTypes.func,
    inputValidator: PropTypes.func,
    valueConverter: PropTypes.func,
};

RangeFilter.defaultProps = {
    range: null,
    boundaries: { min: 0, max: 100 },
    title: 'Range Filter Param',
    onChangeRange: f => f,
    inputValidator: () => true,
    valueConverter: f => f,
};
