import React, { useState } from 'react';
import './service_view_component.css'
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import NetworkImageComponent from '../../core/network_image_component';

function ServiceViewComponent(props) {
    const navigator = useNavigate();
    const [images, setImages] = useState(props.service.images ? [
        'services/' + props.service.images[0],
        'services/' + props.service.images[1],
        'services/' + props.service.images[2],
    ] : [])

    return (
        <div className='service-view-component-root'>
            <div className='service-view-component-content'>
                {
                    props.service.images ?
                        <div className='service-view-images-section'>
                            <NetworkImageComponent className='service-view-main-image'
                                src={images[0]} />
                            <div className='service-view-images-row'>
                                <NetworkImageComponent className='service-view-image-item'
                                    src={images[1]}
                                    onClick={() => setImages([images[1], images[0], images[2]])} />
                                <SpaceComponent width={'18px'} />
                                <NetworkImageComponent className='service-view-image-item'
                                    src={images[2]}
                                    onClick={() => setImages([images[2], images[1], images[0]])} />
                            </div>
                        </div> : <></>
                }
                <div className='service-view-details-section'>
                    <h4 className='service-view-details-title'>
                        {props.service.name}
                    </h4>
                    <div className='service-view-details-rating'>
                        {Array.from({ length: Math.floor(props.service.rating) }, (_, index) => index + 1).map((idx) =>
                            <FontAwesomeIcon key={idx} className='service-reviews-rating-icon'
                                icon={faStar} />
                        )
                        }
                        <SpaceComponent width={'10px'} />
                        <h4 className='service-view-details-sub-title'>
                            {props.service.rating} rating . {props.service.reviews}+ reviews
                        </h4>
                    </div>
                    <h4 className='service-view-details-discriptions'>
                        {props.service.shortDescription}
                    </h4>
                    <div className='service-card-details-pricing-row'>
                        <h4 className='service-view-details-sub-title'>
                            Price
                        </h4>
                        <SpaceComponent width={'10px'} />
                        <h2 className='service-card-details-info-samll-text'>
                            {props.service.price}$
                        </h2>
                    </div>
                    <SpaceComponent height={'8px'} />
                    <div className='service-view-details-permissions'>
                        <div className='service-view-button'
                            onClick={() => {
                                navigator('/branches/branches-home/' + props.service.branchId);
                            }}>
                            Service Branch
                            <SpaceComponent width={'10px'} />
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </div>
                        <SpaceComponent width={'10px'} />
                        <div className='service-view-button'
                            onClick={() => {
                                // navigator('/branches/branch-posts');
                            }}>
                            Promotional advertisement
                            <SpaceComponent width={'10px'} />
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                    <SpaceComponent height={'8px'} />
                    <h4 className='service-view-details-sub-title'>
                        Description:
                    </h4>
                    <SpaceComponent height={'5px'} />
                    <h4 className='service-view-details-discriptions'>
                        {props.service.description}
                    </h4>
                    <SpaceComponent height={'10px'} />
                    <h4 className='service-view-details-sub-title'>
                        Scope:
                    </h4>
                    <SpaceComponent height={'5px'} />
                    <h4 className='service-view-details-discriptions'>
                        {props.service.scope}
                    </h4>
                    <SpaceComponent height={'10px'} />
                    {props.service.features && props.service.features.length != 0 ?
                        <div className='service-view-details-features'>
                            <h4 className='service-view-details-sub-title'>
                                Features:
                            </h4>
                            <ul className='service-view-details-features-list'>
                                {props.service.features.map((feature, index) => <li key={index} >
                                    {feature}</li>)}
                            </ul>
                        </div> : <></>}
                </div>
            </div>
        </div>
    );
}

export default ServiceViewComponent;