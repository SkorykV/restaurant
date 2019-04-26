import React, {Component} from 'react'


export class Marker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(!prevState.dragging && this.state.dragging) {
            document.addEventListener('mousemove', this.props.onMove );
            document.addEventListener('mouseup', this.handleMouseUp );
        }
        else if(prevState.dragging && !this.state.dragging) {
            document.removeEventListener('mousemove', this.props.onMove );
            document.removeEventListener('mouseup', this.handleMouseUp );
        }
    }

    handleMouseDown() {
        this.setState({
            dragging: true,
        });
        this.props.onSelect()
    }

    handleMouseUp() {
        this.setState({
            dragging: false,
        })
    }

    render() {
        const {position, selected} = this.props;
        const size = this.props.size | 20;

        return (
            <span
                className={"rangeMark" + (selected ? " selected" : '')}
                onMouseDown={this.handleMouseDown}
                style={{marginLeft: -size / 2, left: `${position}%`, width: size, height: size}}
            />
        )
    }
}