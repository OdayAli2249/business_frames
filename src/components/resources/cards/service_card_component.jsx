import React, { useState } from 'react';
import './service_card_component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExternalLinkAlt, faStar, faTrash, faTools } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../core/space_component';
import DialogComponent from '../../core/dialog_components/dialog_component';
import ServiceViewEditComponent from '../dialog_content_component/service_view_edit_component';
import ButtonComponent from '../../core/button_component';
import NetworkImageComponent from '../../core/network_image_component';

function ServiceCardComponent(props) {
    const [showCornerOptions, setShowCornerOptions] = useState(false);
    const [activateCornerOptions, setActivateCornerOptions] = useState(true);

    return (
        <div className='service-card'
        // key={props.id}
        >
            {props.service.images && <NetworkImageComponent className='service-card-image'
                src={'services/' + props.service.images[0]} />}
            <div className='service-card-hover'
                style={{ display: showCornerOptions || !activateCornerOptions ? 'flex' : 'none' }}>
                <div className='service-card-corner-icons'
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
                    <FontAwesomeIcon className='service-card-info-title-main-icon-hover'
                        icon={faExternalLinkAlt}
                        onClick={() => {
                            props.onViewClicked()
                        }} />
                    <SpaceComponent width={'15px'} />
                    {!props.hideOptions && props.service.permissions && props.service.permissions.map(permission => permission[1]).includes('1') ?
                        <FontAwesomeIcon className='service-card-info-title-main-icon-hover'
                            icon={faEdit}
                            onClick={() => {
                                props.onEditClicked()
                            }} /> : <></>}
                    <SpaceComponent width={'15px'} />
                    {!props.hideOptions && props.service.permissions && props.service.permissions.map(permission => permission[2]).includes('1') ?
                        <FontAwesomeIcon className='service-card-info-title-main-icon-hover'
                            icon={faTrash}
                            onClick={() => {
                                props.onRemoveClicked()
                            }} /> : <></>}
                </div>
            </div>
            <div className='service-card-transparent'
                onMouseEnter={() => {
                    if (activateCornerOptions) {
                        console.log('to test');
                        setShowCornerOptions(true);
                    }
                }}
                onMouseLeave={() => {
                    if (activateCornerOptions) {
                        console.log('to test');
                        setShowCornerOptions(false);
                    }
                }}>
            </div>
            <div className='service-card-body'>
                <div className='service-card-info-title'>
                    <FontAwesomeIcon className='service-card-info-title-logo' icon={faTools} />
                    <SpaceComponent width={'20px'} />
                    <div className='service-card-info-title-content'>
                        <div className='service-card-info-title-row'>

                            <h2 className='service-card-info-title-main'>
                                {props.service.name}
                            </h2>
                            <SpaceComponent width={'20px'} />
                            <h2 className='service-card-details-info-samll-text'>
                                {props.service.price}$
                            </h2>
                        </div>
                        <div className='service-reviews-rating'>
                            {Array.from({ length: Math.floor(props.service.rating) }, (_, index) => index + 1).map((idx) =>
                                <FontAwesomeIcon key={idx} className='service-reviews-rating-icon'
                                    icon={faStar} />
                            )
                            }
                            <h2 className='service-reviews-title' style={{ fontSize: '16px' }}>
                                {props.service.rating} out of 5</h2>
                        </div>
                        {/* <SpaceComponent height='10px' /> */}
                        <h4 className='service-card-info-title-category'>
                            {props.service.shortDescription}
                        </h4>
                    </div>
                </div>
                <SpaceComponent height={'15px'} />
                <div className='service-card-info-button-section'>
                    <ButtonComponent label={'view'} icon={faExternalLinkAlt} onClick={() => {
                        props.onViewClicked()
                    }} />
                    {!props.hideOptions && props.service.permissions && props.service.permissions.map(permission => permission[1]).includes('1') ?
                        <>  <SpaceComponent width={'15px'} height={'15px'} />
                            <ButtonComponent label={'edit'} icon={faEdit} onClick={() => {
                                props.onEditClicked()
                            }} /></> : <></>}
                    {!props.hideOptions && props.service.permissions && props.service.permissions.map(permission => permission[2]).includes('1') ?
                        <>  <SpaceComponent width={'15px'} height={'15px'} />
                            <ButtonComponent label={'remove'} icon={faTrash} onClick={() => {
                                props.onRemoveClicked()
                            }} /></> : <></>}
                </div>
            </div>
        </div>
    );
}

export default ServiceCardComponent;