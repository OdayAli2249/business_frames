import React, { useEffect, useState } from 'react';
import './service_provider_details_component.css'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../core/button_component';
import { useNavigate } from 'react-router-dom';
import SpaceComponent from '../core/space_component';

function ServiceProviderDetailsComponent(props) {
    const navigator = useNavigate();

    return (
        <div className='service-provider-details-component-root'
            id='/service-provider-details'>
            <h4 className='service-provider-details-component-text'>
                See also
            </h4>
            <div className='service-provider-details-sections-summary-grid'>
                <div className='service-provider-details-sections-summary-grid-item'>
                    <img src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/relatives_icon.png'} />
                    <h4 className='service-provider-details-component-text'>
                        Features
                    </h4>
                </div>
                <div className='service-provider-details-sections-summary-grid-item'>
                    <img src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/statistics_icon.png'} />
                    <h4 className='service-provider-details-component-text'>
                        Statistics
                    </h4>
                </div>
                <div className='service-provider-details-sections-summary-grid-item'>
                    <img src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/reviews_icon.png'} />
                    <h4 className='service-provider-details-component-text'>
                        Reviews
                    </h4>
                </div>
                <div className='service-provider-details-sections-summary-grid-item'>
                    <img src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/contact_icon.png'} />
                    <h4 className='service-provider-details-component-text'>
                        Contact Us
                    </h4>
                </div>
            </div>
            <SpaceComponent height={'20px'} />
            <ButtonComponent label={'Explore complete detatils'} icon={faExternalLinkAlt} onClick={() => {
                navigator('/service-providers/service-provider-details/' + props.id)
            }} />
        </div>
    );
}

export default ServiceProviderDetailsComponent