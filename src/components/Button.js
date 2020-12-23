import React from 'react'

export const Button = (props) => {
    const { fluid, variant, text, onClick } = props;
    let className= `btn btn--${variant}`;

    if (fluid) {
        className += " btn--fluid";
    }

    return (
        <button className={className} onClick={onClick}>
            {text} 
        </button>
    )
}
