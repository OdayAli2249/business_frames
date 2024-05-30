import React from 'react';
import './no_data_component.css';
import SpaceComponent from '../space_component';

function NoDataComponent(props) {
    return (
        <div className='no-data-component-root'>
            <h3 className='no-data-message'>No data available now</h3>
            <SpaceComponent height={'20px'} />
            <img src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/empty2.png'} className='no-data-image'></img>
        </div>
    );
}

export default NoDataComponent;