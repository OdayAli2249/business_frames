import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

function CircularProgressBarComponent(props) {
    return (
        <CircularProgressbar
            value={props.percentage} text={`${props.percentage}%`}
            styles={{
                root: {
                    width: props.width + 'px',
                    height: props.height +'px',
                },
                path: {
                    stroke: props.color ? props.color : 'rgba(83, 169, 199)',
                    strokeLinecap: 'round',
                    transition: 'stroke-dashoffset 0.5s ease 0s',
                },
                trail: {
                    stroke: '#d6d6d6',
                    strokeLinecap: 'butt',
                    transform: 'rotate(0.25turn)',
                    transformOrigin: 'center center',
                },
                text: {
                    fill: '#333',
                    fontSize: '16px',
                    fontWeight: 'bold'
                },
            }} />
    );
}

export default CircularProgressBarComponent;