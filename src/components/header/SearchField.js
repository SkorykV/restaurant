import React, {Component} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';

export class SearchField extends Component {

    static handleSearchFieldClick(event){
        event.nativeEvent.stopImmediatePropagation()
    }

    constructor(props){
        super(props);

        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);

        this.state = {
            collapsed: true,
        };
    }

    handleCollapse() {

        this.setState({
            collapsed: !this.state.collapsed,
        },() =>{
            if(this.state.collapsed) {
                document.removeEventListener('click', this.handleCollapse);
            }
            else {
                document.addEventListener('click', this.handleCollapse);
            }
        });
    }

    handleSearchFieldChange(event) {
        this.props.onChange(event.target.value);
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
                    <div
                        onClick={SearchField.handleSearchFieldClick}
                        className={"search-field-container" + (this.state.collapsed ? " collapsed": '')}>
                        <div>
                            <input
                                className={"search-field" + (!this.props.history.length ? " no-history" : '')}
                                type="text"
                                value={this.props.value}
                                placeholder={this.props.placeholder}
                                onChange={this.handleSearchFieldChange}
                            />
                            <button type="submit" className="search-field-button">
                                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                            </button>
                        </div>
                        <ul className="search-field-history">
                            {
                                this.props.history.map(
                                    variant => <li key={variant} onClick={() => this.props.onChange(variant)}>{variant}</li>
                                )
                            }
                        </ul>
                    </div>
                </form>
            </div>
        )
    }
}

SearchField.propTypes = {
    value: PropTypes.string,
    history: PropTypes.array,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};

SearchField.defaultProps = {
    value: '',
    history: [],
    placeholder: 'Query string',
    onChange: f => f,
    onSubmit: f => f,
};