import React from 'react';
import './service_provider_top_reviews_component.css';
import { faExternalLinkAlt, faLink, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonComponent from '../../core/button_component';

function ServiceProviderTopReviewsComponent(props) {
    return (
        <div className='service-provider-top-reviews-item'>
            <div className='service-provider-top-reviews-item-header'>
                <FontAwesomeIcon className='service-provider-top-reviews-item-icon'
                    icon={faUser} />
                <SpaceComponent width={'10px'} />
                <h4 className='service-provider-reviews-sub-title'
                    style={{ fontSize: '14px' }}>
                    {props.reviewer}
                </h4>
            </div>
            <div className='service-provider-reviews-rating'>
                {Array.from({ length: props.review }, (_, index) => index + 1).map((_,idx) =>
                    <FontAwesomeIcon key = {idx} className='service-provider-reviews-rating-icon'
                        icon={faStar} />
                )
                }
                <SpaceComponent width={'10px'} />
                <h2 style={{ fontSize: '16px', margin: '0px' }}>{props.reviewer}</h2>
            </div>
            <h4 className='service-provider-reviews-sub-title'>
                Reviewed in the {props.reviewAddress} on {props.reviewDate}
            </h4>
            <h4 className='service-provider-reviews-sub-title'>
                Style: Cups + Pipes
            </h4>
            <h4 className='service-provider-reviews-sub-title'
                style={{ fontSize: '12px', textAlign: 'left' }}>
                {props.reviewComment}
            </h4>
            <SpaceComponent height={'10px'} />
            <div className='service-provider-top-reviews-contacts-container'>
                <ButtonComponent label={'visit website'} icon={faExternalLinkAlt} />
                <SpaceComponent width={'10px'} />
                <ButtonComponent label={'Linkedin'} icon={faLink} />
            </div>
        </div>
    );
}

export default ServiceProviderTopReviewsComponent;