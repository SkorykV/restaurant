import React from 'react';


export const PreviewItem = ({url, selected, onClick}) => {

    return (
        <div
            className={ "preview-item" + (selected ? " selected" : "") }
            onClick={onClick}
        >
            <div className="preview-image"  style={{backgroundImage: `url(${url})`}} />
        </div>
    )
};
