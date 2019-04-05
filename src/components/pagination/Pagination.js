import React from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import { simpleSearchParamsParse, createSearchStrFromObj } from '../../lib';

// display around - count of links, that should be displayed before and after currentPage
const PaginationComponent = ({currentPage, displayAround, countPages, location}) => {
    const createLinkToPage = (prevParams, page, text) => {
        const params = Object.assign({}, prevParams);
        params['page']=page;
        const newLocation = Object.assign({}, location);
        newLocation.search = createSearchStrFromObj(params);
        return <Link to={newLocation}>{text}</Link>
    };
    const checkManyBetween = (first, displayBetween, last) => {
        return ((last - first - 1) - displayBetween) > 0
    };
    const shouldBeDisplayedBetween = (first, displayBetween, last) => {
        //use -1 here, because we need to count only pages between
        const couldBeDisplayed = last - first -1;

        if(couldBeDisplayed < 0) {
            return 0;
        }

        return couldBeDisplayed >= displayBetween ? displayAround : couldBeDisplayed;

    };
    const getPagesBefore = () => {
        const prevCount = shouldBeDisplayedBetween(1, displayAround, currentPage);
        const firstPrevPage = currentPage - prevCount;
        return [...Array(prevCount)].map((_,i) => firstPrevPage + i);
    };
    const getPagesAfter = () => {
        const afterCount = shouldBeDisplayedBetween(currentPage, displayAround, countPages);
        const nextPage = currentPage + 1;
        return [...Array(afterCount)].map((_,i) => nextPage + i);
    };
    const createLiItems = () => {
        const manyBefore = checkManyBetween(1, displayAround, currentPage);
        const pagesBefore = getPagesBefore();
        const pagesAfter = getPagesAfter();
        const manyAfter = checkManyBetween(currentPage, displayAround, countPages);
        const params = simpleSearchParamsParse(location.search);

        let elements = [];
        if(currentPage > 1) {
            elements.push(<li key="prev">{ createLinkToPage(params, currentPage-1, 'назад') }</li>);
            elements.push(<li key="firstPage">{ createLinkToPage(params, 1, '1') }</li>)
        }
        if(manyBefore) {
            elements.push(<li key="manyBefore">...</li>)
        }
        elements = elements.concat(pagesBefore.map( _ => <li key={_} >{ createLinkToPage(params, _, _) }</li>));
        elements.push(<li key="current" className="currentPage">{currentPage}</li>);
        elements = elements.concat(pagesAfter.map( _ => <li key={_}>{ createLinkToPage(params, _, _) }</li>));
        if(manyAfter) {
            elements.push(<li key="manyAfter">...</li>)
        }
        if(countPages > currentPage) {
            elements.push(<li key={`lastPage${countPages}`}>{ createLinkToPage(params, countPages, countPages) }</li>);
            elements.push(<li key="next">{ createLinkToPage(params, currentPage+1, 'вперед') }</li>);
        }
        return elements;
    };

    const list = createLiItems();

    return (
        <ul className="pagination">
            {
                list
            }
        </ul>
    )
};

export const Pagination = withRouter(PaginationComponent);