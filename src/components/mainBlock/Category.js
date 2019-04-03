import React from 'react'
import { withRouter } from "react-router";

const component = ({match}) => {
    return <div>
        It`s category { match.params.categoryId } page!
    </div>
};

export const Category = withRouter(component);