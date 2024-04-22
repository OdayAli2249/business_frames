import React from 'react';
import SpaceComponent from './space_component';
import './linear_progress_bar_component.css';

function LinearProgressBarComponent(props) {
    return (
        <div className='percentage-row'>
            <h4 className='percentage-sub-title'>
                {props.prefixText}
            </h4>
            <SpaceComponent width={'10px'} />
            <div className='percentage-bar'>
                <div className='percentage-container'></div>
                <div className='percentage' style={{ width: props.percentage + '%' }}></div>
            </div>
            <SpaceComponent width={'10px'} />
            <h4 className='percentage-sub-title'>
                {props.percentage + '%'}
            </h4>
        </div>
    );
}

export default LinearProgressBarComponent;