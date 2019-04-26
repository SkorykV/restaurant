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
        this.handleHistoryValueSelected = this.handleHistoryValueSelected.bind(this);
        this.handleSearchFieldSubmit = this.handleSearchFieldSubmit.bind(this);

        this.state = {
            collapsed: true,
            searchValue: '',
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
        this.setState({ searchValue: event.target.value });
    }

    handleHistoryValueSelected(event) {
        this.setState({ searchValue: event.target.innerHTML });
    }

    handleSearchFieldSubmit(event) {
        event.preventDefault();
        this.handleCollapse();
        this.props.onSubmit(this.state.searchValue);
        this.setState({ searchValue: '' });
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleCollapse);
    }

    render() {
        const history = this.props.history.filter(
            s => s.includes(this.state.searchValue.trim())
        );

        return (
            <div className="search">
                <form onSubmit={this.handleSearchFieldSubmit}>
                    <div className="search-icon-container" onClick={this.handleCollapse}>
                        <FontAwesomeIcon className="search-icon" icon={faSearch} />
                    </div>
                    <div
                        onClick={SearchField.handleSearchFieldClick}
                        className={"search-field-container" + (this.state.collapsed ? " collapsed": '')}>
                        <div>
                            <input
                                className={"search-field" + (!history.length ? " no-history" : '')}
                                type="text"
                                value={this.state.searchValue}
                                placeholder={this.props.placeholder}
                                onChange={this.handleSearchFieldChange}
                            />
                            <button type="submit" className="search-field-button">
                                <FontAwesomeIcon className="search-icon" icon={faSearch} />
                            </button>
                        </div>
                        <ul className="search-field-history">
                            {
                                history.map(
                                    variant => <li key={variant} onClick={this.handleHistoryValueSelected}>{variant}</li>
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
    history: PropTypes.array,
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func,
};

SearchField.defaultProps = {
    history: [],
    placeholder: 'Query string',
    onSubmit: f => f,
};