import React from 'react';
import './service_provider_relatives_component.css';
import { useSelector } from 'react-redux';

function ServiceProviderRelativesComponents(props) {

    const state = useSelector(state => state.serviceProviderById);

    return (
        <div className='service-provider-relatives-component-root'>
            {state.data && state.data.item ? <>
                <div className='service-provider-details-info-grid-section'>
                    <div className='service-provider-details-info-grid-item'>
                        <img className='service-provider-details-info-grid-item-image'
                            src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/about_us_icon.png'}></img>
                        <h3 className='service-provider-details-info-samll-text'
                            style={{ fontSize: '16px' }}>About Us</h3>
                    </div>
                    <div className='service-provider-details-info-grid-item'>
                        <img className='service-provider-details-info-grid-item-image'
                            src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/branches_icon.png'}></img>
                        <h3 className='service-provider-details-info-samll-text'
                            style={{ fontSize: '16px' }}>Branches</h3>
                    </div>
                    <div className='service-provider-details-info-grid-item'>
                        <img className='service-provider-details-info-grid-item-image'
                            src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/services_icon.png'}></img>
                        <h3 className='service-provider-details-info-samll-text'
                            style={{ fontSize: '16px' }}>Servies</h3>
                    </div>
                    <div className='service-provider-details-info-grid-item'>
                        <img className='service-provider-details-info-grid-item-image'
                            src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/users_icon.png'}></img>
                        <h3 className='service-provider-details-info-samll-text'
                            style={{ fontSize: '16px' }}>Users</h3>
                    </div>
                </div></> : <></>}
        </div>
    );
}

export default ServiceProviderRelativesComponents;