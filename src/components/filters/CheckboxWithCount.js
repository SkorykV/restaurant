import React from 'react'


export const CheckboxWithCount = ({name, label, count, checked, onChange}) => {
    return (
        <div className="checkbox-count">
            <label>
                <input type="checkbox" name={name} checked={checked} onChange={onChange}/>
                <span className="checkmark" />
                <span className="label-text">{`${label} (${count})`}</span>
            </label>
        </div>
    )
};
