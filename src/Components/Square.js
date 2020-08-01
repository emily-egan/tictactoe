import React from 'react';

const Square = (props) => {
    let classes = 'square';
    if (props.value === 'X'){
        classes += ' x-color'
    } else if (props.value === 'O') {
        classes += ' o-color'
    }

    return (
        <button 
            className={classes}
            onClick = {props.onClick}
        >
          {props.value}
        </button>
    );
}

export default Square;