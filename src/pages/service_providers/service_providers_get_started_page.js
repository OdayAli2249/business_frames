import React, { useEffect, useState } from 'react';
import './service_providers_get_started_page.css';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import ServiceProvidersComponent from '../../components/home/service_providers/service_providers_component';
import SpaceComponent from '../../components/core/space_component';
import ServiceProviderCarouselCardComponent from '../../components/service_providers/cards/service_provider_carousel_card_component';
import { getServiceProviders } from '../../state_management/middlewares/service_providers_middleware';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function ServiceProvidersGetStartedPage(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navigator = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const section = searchParams.get('section');
    const location = useLocation();

    useEffect(() => {
        if (section == 2) {
            const element = document.getElementById('service-providers-explorer');
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
        } else {
            const element = document.getElementById('service-providers-component');
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    return (
        <div className='service-providers-get-started-root'
            id='/service-providers-get-started-component'>
            <SpaceComponent height={'120px'} />
            <ServiceProvidersComponent
                id={'service-providers-component'}
                onExploreClicked={() => {
                    const element = document.getElementById('service-providers-explorer');
                    if (element)
                        element.scrollIntoView({ behavior: 'smooth' });
                }} />
            <div className='service-providers-grid-container'>
                <PaginationComponent
                    id={'service-providers-explorer'}
                    initialView={{
                        grid: true,
                        list: false
                    }}
                    onCardClicked={() => {
                    }}
                    pageSize={6}                     // when start fetching data from I/O
                    gridCardSize={windowWidth >= 800 && windowWidth < 1000 ? 'extra-larg' : 'larg'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    sideBorders={false}
                    showView={false}
                    showPages={true}
                    fetchData={getServiceProviders}
                    selectedState={state => state.serviceProviders}
                    showSearch={true}
                    itemBuilder={(ID, serviceProvider) => <ServiceProviderCarouselCardComponent
                        key={ID}
                        serviceProvider={serviceProvider}
                        mod={'small'}
                        onViewClicked={() => { navigator('/service-providers/service-providers-home/' + serviceProvider.id) }} />} />
            </div>
        </div>
    );
}

export default ServiceProvidersGetStartedPage

