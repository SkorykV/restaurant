import React, {Component} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

export class SearchField extends Component {

    constructor(props){
        super(props);

        this.handleCollapse = this.handleCollapse.bind(this);

        this.state = {
            collapsed: true,
        };
    }

    handleCollapse(event) {
        const eventTarget = event.currentTarget;

        this.setState({
            collapsed: !this.state.collapsed,
        },() =>{
            if(this.state.collapsed) {
                document.removeEventListener('click', this.handleCollapse);
            }
            else {
                document.addEventListener('click', this.handleCollapse);
                eventTarget.parentNode
                    .getElementsByClassName("search-field-container")[0]
                    .addEventListener('click', (event) => { event.stopPropagation()});
            }
        });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleCollapse);
    }

    render() {
        return (
            <div className="search">
                <form onSubmit={this.props.onSubmit}>
                    <div className="search-icon-container" onClick={this.handleCollapse}>
                        <FontAwesomeIcon className="search-icon" icon={faSearch} />
                    </div>
                    <div className={"search-field-container" + (this.state.collapsed ? " collapsed": '')}>
                        <input className="search-field" type="text" value={this.props.value} onChange={this.props.onChange}/>
                        <button type="submit" className="search-field-button">
                            <FontAwesomeIcon className="search-icon" icon={faSearch} />
                        </button>
                    </div>
                </form>
            </div>
        )
    }
};

SearchField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

SearchField.defaultProps = {
    value: '',
    onChange: f => f,
    onSubmit: f => f,
};