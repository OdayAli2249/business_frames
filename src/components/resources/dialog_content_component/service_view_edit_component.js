import React, { useEffect, useRef, useState } from 'react';
import CarouselComponent from '../../core/carousel_component/carousel_component';
import './service_view_edit_component.css';
import ServiceViewComponent from './service_view_component';
import SpaceComponent from '../../core/space_component';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateServiceFormComponent from '../form_components/create_service_form_component';

function ServiceViewEditComponent(props) {

    const [currentTab, setCurrentTab] = useState(0);
    const carouselRef = useRef(null);

    useEffect(() => {
        if (props.tab == 2) {
            carouselRef.current.goto(1);
            setCurrentTab(1);
        }
    }, []);

    return (
        <div className='service-view-edit-component-root'>
            {props.service.permissions && props.service.permissions.map(permission => permission[1]).includes('1') &&
                <FontAwesomeIcon className='service-view-edit-floating-edit-button'
                    icon={faEdit}
                    onClick={() => {
                        carouselRef.current.goto(1);
                        setCurrentTab(1);
                    }} />}
            <div className='service-view-edit-component-content'>
                <div className='service-view-edit-header'>
                    <h4 className='service-view-edit-header-title'>
                        Service Details
                    </h4>
                </div>
                <div className='service-view-edit-tab-bar'>
                    <div className='service-view-edit-tab-bar-button'
                        onClick={() => {
                            carouselRef.current.goto(0);
                            setCurrentTab(0);
                        }}
                        style={{ borderBottom: currentTab == 0 ? '5px solid black' : null }}>
                        View
                    </div>
                    <SpaceComponent width={'12px'} />
                    {props.service.permissions && props.service.permissions.map(permission => permission[1]).includes('1') ?
                        <div className='service-view-edit-tab-bar-button'
                            onClick={() => {
                                carouselRef.current.goto(1);
                                setCurrentTab(1);
                            }}
                            style={{ borderBottom: currentTab == 1 ? '5px solid black' : null }}>
                            Update
                        </div> : <></>}
                </div>
                <div className='service-view-edit-carousel-container'>
                    {props.service.permissions && props.service.permissions.map(permission => permission[1]).includes('1') ?
                        <CarouselComponent itemsToShow={1}
                            ref={carouselRef}
                            onChange={(index) => setCurrentTab(index)} >
                            <ServiceViewComponent service={props.service} />
                            <CreateServiceFormComponent service={props.service} onSubmit={props.onSubmit} />
                        </CarouselComponent> : <ServiceViewComponent service={props.service} />}
                </div>
            </div>
        </div>
    );
}

export default ServiceViewEditComponent;