import React from 'react';
import { useNavigate } from 'react-router-dom';
import './service_provider_carousel_card_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExternalLinkAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../core/space_component';
import CircularProgressBarComponent from '../../core/circular_progress_bar_component';
import ButtonComponent from '../../core/button_component';
import NetworkImageComponent from '../../core/network_image_component';

function ServiceProviderCarouselCardComponent(props) {
    const navigator = useNavigate();

    return (
        <div className='service-provider-carousel-card'
        // key={props.id}
        >
            {props.serviceProvider.images && <NetworkImageComponent className='service-provider-card-image'
                src={'service-providers/' + props.serviceProvider.images[0]} />}
            <div className='service-provider-card-body'>
                <div className='service-provider-card-info-title'>
                    {props.serviceProvider.logoUrl && <NetworkImageComponent className='service-provider-card-info-title-logo'
                        src={'service-providers/' + props.serviceProvider.logoUrl} />}
                    <div className='service-provider-card-info-title-content'>
                        <div className='service-provider-card-info-title-container'>
                            <h2 className='service-provider-card-info-title-main'>
                                {props.serviceProvider.name}
                            </h2>
                            <FontAwesomeIcon className='service-provider-card-info-title-main-icon'
                                icon={faCheckCircle} />
                        </div>
                        <h4 className='service-provider-card-info-title-category'>
                            {props.serviceProvider.target &&
                                props.serviceProvider.target.length > 150 ? props.serviceProvider.target.slice(0, 149) + '...' :
                                props.serviceProvider.target}
                        </h4>
                    </div>
                </div>
                <div className='service-provider-card-info-sub-title'>
                    <FontAwesomeIcon style={{ color: 'gray' }}
                        icon={faMapMarkerAlt} />
                    <h3 style={{ margin: '5px', color: '#333' }}>
                        main company: <span style={{ color: 'rgb(168,0,26)' }}>{props.serviceProvider.mainAddress}</span>
                    </h3>
                </div>
                <SpaceComponent height={'15px'} />
                {props.mod != 'small' ?
                    <div className='service-provider-percentage-row'>
                        <CircularProgressBarComponent
                            percentage={17}
                            color={'rgba(83, 169, 199)'}
                            width={120}
                            height={120} />
                        <SpaceComponent width={'10px'} />
                        <SpaceComponent height={'90%'}
                            width={'1px'}
                            color={'rgb(220,220,220'} />
                        <SpaceComponent width={'10px'} />
                        <div className='service-provider-statistics-grid-item-body'>
                            <div className='service-provider-details-info-grid-item-descriptions'>
                                <h3 className='service-provider-details-info-samll-text'
                                    style={{ fontSize: '16px' }}>Skill Workers</h3>
                                <h5 className='service-provider-details-info-samll-text'
                                    style={{ fontSize: '12px', color: 'gray' }}>
                                    {props.serviceProvider.summary &&
                                        props.serviceProvider.summary.length > 150 ? props.serviceProvider.summary.slice(0, 149) + '...' :
                                        props.serviceProvider.summary}</h5>
                            </div>
                        </div>
                    </div> : <></>}
                <SpaceComponent height={'15px'} />
                <div className='service-provider-card-info-button-section'>
                    <ButtonComponent label={'view'} icon={faExternalLinkAlt} onClick={() =>
                        navigator('/service-providers/service-providers-home/' + props.serviceProvider.id)} />
                </div>
            </div>
        </div>
    );
}

export default ServiceProviderCarouselCardComponent;