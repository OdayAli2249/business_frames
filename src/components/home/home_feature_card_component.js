import React from 'react';
import './home_feature_card_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomeFeatureCardComponent(props) {
    return (
        <div className={props.style}>
            <div className='home-card-icon-container'>
                <FontAwesomeIcon icon={props.icon}
                    className='home-card-icon' />
            </div>
            <h2 className='home-card-title'>{props.title}</h2>
            <div className='home-card-text-container'>
                <h5 style={{ color: 'rgb(100,100,100)', fontWeight: 'normal' }}>
                    {props.descriptions}
                </h5>
            </div>
        </div>
    );
}

export default HomeFeatureCardComponent;