import React from 'react'
import PropTypes from "prop-types";

export const ModalForm = ({title='Modal Form', show=false, onClose=f=>f, onSubmit=f=>f, children}) => {
    const handleCloseBtnClick = (event) => {
        onClose();
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        onSubmit();
        event.preventDefault();
    };

    return (
        <div className={"modal" + (show ? '' : ' hidden')}>
            <form onSubmit={handleSubmit}>
                <div className="modal-content"
                     style={{transform: (show ? "translateY(50px)" : "translateY(-100%)")}}
                >
                    <div className="modal-header">
                        <span className="close" onClick={onClose}>&times;</span>
                        <h2>{title}</h2>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-cancel" onClick={handleCloseBtnClick}>Закрити</button>
                        <button type="submit" className="btn btn-submit">Підтвердити</button>
                    </div>
                </div>
            </form>
        </div>
    )
};

ModalForm.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
};
