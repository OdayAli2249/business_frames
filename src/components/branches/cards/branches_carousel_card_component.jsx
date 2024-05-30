import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './branches_carousel_card_style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faExternalLinkAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../core/space_component';
import ButtonComponent from '../../core/button_component';
import NetworkImageComponent from '../../core/network_image_component';

function BranchesCarouselCardComponent(props) {
    const navigator = useNavigate();
    const [showCornerOptions, setShowCornerOptions] = useState(false);
    const [activateCornerOptions, setActivateCornerOptions] = useState(true);

    return (
        <div className='branches-carousel-card'
            // key={props.id}
            onClick={() => {
                if (props.selectionMod == 'single' || props.selectionMod == 'multi')
                    props.onItemSelected()
            }}>
            {props.branch.promotionPhotos && <NetworkImageComponent className='branch-card-image'
                src={'branches/' + props.branch.promotionPhotos[0]} />}
            {props.selectionMod == 'single' || props.selectionMod == 'multi' ?
                props.selected ? <FontAwesomeIcon className='card-selected' icon={faCheck} /> :
                    <div className='card-unselected' /> : <></>}
            {props.selectionMod != 'none' ? <></> :
                <div className='branch-card-hover'
                    style={{ display: showCornerOptions || !activateCornerOptions ? 'flex' : 'none' }}>
                </div>}
            {props.selectionMod != 'none' ? <></> :
                <div className='branch-card-transparent'
                    onMouseEnter={() => {
                        if (activateCornerOptions)
                            setShowCornerOptions(true);
                    }}
                    onMouseLeave={() => {
                        if (activateCornerOptions)
                            setShowCornerOptions(false);
                    }}>
                </div>}
            {props.selectionMod != 'none' ? <></> :
                <div className='branch-card-corner-icons'
                    style={{ display: showCornerOptions || !activateCornerOptions ? 'flex' : 'none' }}
                    onMouseEnter={() => {
                        console.log('to test');
                        setShowCornerOptions(true);
                        setActivateCornerOptions(false);
                    }}
                    onMouseLeave={() => {
                        console.log('to test');
                        setShowCornerOptions(true);
                        setActivateCornerOptions(true);
                    }}>
                    <FontAwesomeIcon className='primary-icon-color-xs-icon-size'
                        icon={faExternalLinkAlt}
                        onClick={() => navigator('/branches/branches-home/' + props.branch.id)} />
                </div>}
            <div className='branch-card-body'>
                <div className='row-main-start-cross-center'>
                    {props.branch.promotionPhotos && <NetworkImageComponent className='primary-icon-color-xl-icon-size branch-logo-img'
                        src={'branches/' + props.branch.logoUrl} />}
                    <SpaceComponent width={'20px'} />
                    <div className='column-main-start-cross-start'>
                        <div className='row-main-start-cross-center'>
                            <h2 className='basic-s-text-size-l-text-weight'>
                                {props.branch.name}
                            </h2>
                            <SpaceComponent width={'6px'} />
                            <FontAwesomeIcon className='blue-icon-color-xs-icon-size'
                                icon={faCheckCircle} />
                        </div>
                        <h4 className='basic-xs-text-size-m-text-weight'>
                            {props.branch.summary &&
                                props.branch.summary.length > 50 ? props.branch.summary.slice(0, 49) + '...' :
                                props.branch.summary}
                        </h4>
                    </div>
                </div>
                <div className='row-main-start-cross-center'>
                    <FontAwesomeIcon style={{ color: 'gray' }}
                        icon={faMapMarkerAlt} />
                    <SpaceComponent width={'10px'} />
                    <h3 className='basic-s-text-size-m-text-weight'>
                        market: <span className='medium-xs-text-size-s-text-weight'>
                            {props.branch.market &&
                                props.branch.market.length > 100 ? props.branch.market.slice(0, 99) + '...' :
                                props.branch.market}
                        </span>
                    </h3>
                </div>
                {props.selectionMod != 'none' ? <></> :
                    <SpaceComponent height={'15px'} />}
                {props.selectionMod != 'none' ? <></> : <div className='branch-card-info-button-section'>
                    <ButtonComponent label={'view'} icon={faExternalLinkAlt} onClick={() => navigator('/branches/branches-home/' + props.branch.id)} />
                </div>}
            </div>
        </div>
    );
}

export default BranchesCarouselCardComponent;