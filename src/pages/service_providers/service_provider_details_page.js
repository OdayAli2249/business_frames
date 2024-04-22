import React from 'react';
import './service_provider_details_page.css'
import SpaceComponent from '../../components/core/space_component';
import ServiceProviderReviewsComponent from '../../components/service_providers/details_components/service_provider_reviews_component';
import ServiceProviderStatisticsComponent from '../../components/service_providers/details_components/service_provider_statistics_component';
import ServiceProviderRelativesComponents from '../../components/service_providers/details_components/service_provider_relatives_component';
import ServiceProviderDetailsHeaderComponent from '../../components/service_providers/details_components/service_provider_details_header_component';


function ServiceProviderDetailsPage(props) {
    return (
        <div className='service-provider-details-root'>
            <ServiceProviderDetailsHeaderComponent />
            <SpaceComponent height={'50px'} />
            <SpaceComponent height={'2px'}
                width={'90%'}
                color={'rgb(200,200,200'} />
            <SpaceComponent height={'50px'} />
            <div className='service-providers-details-container'>
                <ServiceProviderRelativesComponents />
                <SpaceComponent height={'50px'} />
                <SpaceComponent height={'2px'}
                    width={'90%'}
                    color={'rgb(200,200,200'} />
                <SpaceComponent height={'50px'} />
                <ServiceProviderStatisticsComponent />
                <SpaceComponent height={'50px'} />
                {/* <SpaceComponent height={'2px'}
                    width={'90%'}
                    color={'rgb(200,200,200'} />
                <SpaceComponent height={'50px'} /> */}
                {/* <ServiceProviderReviewsComponent /> */}
            </div>
        </div>
    );
}

export default ServiceProviderDetailsPage