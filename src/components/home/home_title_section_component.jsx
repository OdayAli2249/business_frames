import React from 'react';
import './home_title_section_component.css';
import SpaceComponent from '../core/space_component';

function HomeTitleSectionComponent(props) {
    return (
        <div className='home-title-text-section'>
            <div className='home-title-text-side-line' />
            <SpaceComponent width={'40px'} />
            <div className='home-title-text'>
                <div>
                    <h1 className='home-title-section-title'>
                        {props.title}
                    </h1>
                </div>
                <div>
                    <h3 className='home-title-section-sub-title'>
                        {props.subTitle}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default HomeTitleSectionComponent;