import React from 'react';

// functional component only used behind the scenes
// making custom input for signup
const Input = (props) => {
    let inputClassName = 'form-control';
    if (props.hasError !== undefined) {
        inputClassName += props.hasError ? ' is-invalid' : ' is-valid';
    }

    return (
        <div>
            {/* 2nd is executed if 1st is true */}
            {props.label && <label>{props.label}</label>}
            <input
                className={inputClassName}
                type={props.type || 'text'}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            { props.hasError && (
                <span className="invalid-feedback">{props.error}</span>
            )}
        </div>
    );
};

Input.defaultProps = {
    onChange: () => { }
};

export default Input;