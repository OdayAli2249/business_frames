import React from 'react';

function SpaceComponent(props) {
    return (
        <div style={{
            height: props.height,
            width: props.width,
            width: props.width,
            backgroundColor: props.color,
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            marginLeft: props.marginLeft,
            marginRight: props.marginRight,
            boxSizing: 'border-box'
        }} />
    );
}

export default SpaceComponent