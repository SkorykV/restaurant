import React, { Component } from 'react'

import PropTypes from "prop-types";

import { Marker } from "./Marker";


export class RangeFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMarker: null,
        };

        this.bar = React.createRef();

        this.handleClick = this.handleClick.bind(this);

        this.handleLeftMarkerPositionChange = this.handleLeftMarkerPositionChange.bind(this);
        this.handleRightMarkerPositionChange = this.handleRightMarkerPositionChange.bind(this);

        this.handleSelectMinMarker = () => this.handleSelectMarker('min');
        this.handleSelectMaxMarker = () => this.handleSelectMarker('max');

        this.handleLeftValueInputChange = this.handleLeftValueInputChange.bind(this);
        this.handleRightValueInputChange = this.handleRightValueInputChange.bind(this);
    }

    handleSelectMarker(label) {
        if(this.state.selectedMarker !== label) {
            this.setState({
                selectedMarker: label,
            })
        }
    }

    handleClick(event) {
        const barRect = this.bar.current.getBoundingClientRect();
        const pos = (event.clientX - barRect.left) / barRect.width;
        if(pos < 0 || pos > 1) {
            return
        }

        const newValue = this.props.leftBoundary + pos * (this.props.rightBoundary - this.props.leftBoundary);

        if(newValue < this.props.leftValue) {
            this.props.onChangeLeftValue(newValue.toString())
        }
        else if(newValue > this.props.rightValue) {
            this.props.onChangeRightValue(newValue.toString())
        }
        else {
            if((newValue - this.props.leftValue) <= (this.props.rightValue - newValue)) {
                this.props.onChangeLeftValue(newValue.toString())
            }
            else {
                this.props.onChangeRightValue(newValue.toString())
            }
        }
    }

    handleLeftMarkerPositionChange(event) {
        const value = event.clientX;
        const barRect = this.bar.current.getBoundingClientRect();

        const newPos = (value - barRect.left) / barRect.width;
        let newValue = this.props.leftBoundary + newPos * (this.props.rightBoundary - this.props.leftBoundary);

        if(newValue < this.props.leftBoundary) {
            newValue = this.props.leftBoundary;
        }
        else if(newValue > this.props.rightValue) {
            newValue = this.props.rightValue;
        }

        this.props.onChangeLeftValue(newValue.toString())
    }

    handleRightMarkerPositionChange(event) {
        const value = event.clientX;
        const barRect = this.bar.current.getBoundingClientRect();

        const newPos = (value - barRect.left) / barRect.width;
        let newValue = this.props.leftBoundary + newPos * (this.props.rightBoundary - this.props.leftBoundary);

        if(newValue < this.props.leftValue) {
            newValue = this.props.leftValue;
        }
        else if(newValue > this.props.rightBoundary) {
            newValue = this.props.rightBoundary;
        }

        this.props.onChangeRightValue(newValue.toString())
    }

    handleLeftValueInputChange(event) {
        this.props.onChangeLeftValue(event.target.value)
    }

    handleRightValueInputChange(event) {
        this.props.onChangeRightValue(event.target.value)
    }

    render() {
        const {leftValue, rightValue, leftBoundary: min, rightBoundary: max} = this.props;
        const left = +leftValue;
        const right = +rightValue;
        const range = max - min;
        const rangeStyle = {left: `${left / range * 100}%`, width: `${(right - left) / range * 100}%`};

        return (
            <div className="rangeFilterContainer">
                <h3>{this.props.title + ':'}</h3>
                <div className="rangeFilter" ref={this.bar} onClick={this.handleClick}>
                    <div className="range" style={rangeStyle} />
                    <Marker
                        selected={this.state.selectedMarker === 'min'}
                        position={left/ range * 100}
                        onSelect={this.handleSelectMinMarker}
                        onMove={this.handleLeftMarkerPositionChange}
                    />
                    <Marker
                        selected={this.state.selectedMarker === 'max'}
                        position={right/ range * 100}
                        onSelect={this.handleSelectMaxMarker}
                        onMove={this.handleRightMarkerPositionChange}
                    />
                </div>
                <div className="boundsValues">
                    <input
                        className='boundaryInput'
                        type="text"
                        value={leftValue}
                        onChange={this.handleLeftValueInputChange}
                    />
                    <input
                        className='boundaryInput'
                        type="text"
                        value={rightValue}
                        onChange={this.handleRightValueInputChange}
                    />
                </div>
            </div>
        )
    }
}

RangeFilter.propTypes = {
    leftValue: PropTypes.string,
    rightValue: PropTypes.string,
    leftBoundary: PropTypes.number,
    rightBoundary: PropTypes.number,
    title: PropTypes.string,
    onChangeLeftValue: PropTypes.func,
    onChangeRightValue: PropTypes.func,
};

RangeFilter.defaultProps = {
    leftValue: '0',
    rightValue: '100',
    leftBoundary: 0,
    rightBoundary: 100,
    title: 'Range Filter Param',
    onChangeLeftValue: f => f,
    onChangeRightValue: f => f,
};