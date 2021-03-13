import React from 'react'

export const ButtonWithProgress = (props) => {
    return (
        <button
            disabled={props.disabled}
            className='btn btn-primary'
            onClick={props.onClick}
        >
            {/* spinner will be on until pendingApiCall is true */}
            {props.pendingApiCall && (<div className='spinner-border text-light spinner-border-sm mr-1'>
                <span className='sr-only'>Loading...</span>
            </div>)}
            {props.text}
        </button>
    )
}

export default ButtonWithProgress;