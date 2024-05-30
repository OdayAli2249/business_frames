import React from 'react';
import './home_overview_section_component.css';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../core/button_component';
import SpaceComponent from '../core/space_component';

function HomeOverviewSectionComponent(props) {
    const sections = [(<div className='browser-section'
        style={{ height: props.size == 'small' ? '330px' : null }}>
        <div className='browser'>
            <div className='browser-item'>
                <h5 style={{ color: 'rgb(100,100,100)', fontWeight: 'normal' }}>
                    {props.about[0]}
                </h5>
            </div>
            {props.size != 'small' ?
                <div className='browser-item'>
                    <h5 style={{ color: 'rgb(100,100,100)', fontWeight: 'normal' }}>
                        {props.about[1]}
                    </h5>
                </div> : <></>}
            {props.size != 'small' ?
                <div className='browser-item'>
                    <h5 style={{ color: 'rgb(100,100,100)', fontWeight: 'normal' }}>
                        {props.about[2]}
                    </h5>
                </div> : <></>}
        </div>
        <SpaceComponent height={'20px'} />
        <ButtonComponent label={'Explore'}
            color={props.color}
            size={props.size != 'small' ? 'large' : null}
            icon={faArrowRight}
            onClick={() => {
                props.onExploreClicked();
            }} />
    </div>),
    (<img src={props.image}
        alt="get started" className={'page-image-section'}
        style={props.size == 'small' ? { width: '250px', height: '250px' } : {}} />)];

    return (
        <div className='overview-section'
            style={props.size == 'small' ? { width: '100%' } : {}}>
            <SpaceComponent height={'10px'} />
            {sections[props.type]}
            {sections[props.type == 1 ? props.type - 1 : props.type + 1]}
        </div>
    );
}

export default HomeOverviewSectionComponent;