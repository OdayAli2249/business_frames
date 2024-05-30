import React, { useEffect, useState } from 'react';
import './my_service_providers_component.css';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from '../core/carousel_component/carousel_component';
import ServiceProviderCarouselCardComponent from './cards/service_provider_carousel_card_component';
import { getUserServiceProviders } from '../../state_management/middlewares/user_service_providers_middleware';
import { useSelector } from 'react-redux';


function MyServiceProvidersComponent(props) {

    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const user = useSelector(state => state.user);

    return (
        <div className='my-service-providers-component-root'
            id='/my-service-providers'>
            {user.data && user.data.item ?
                <CarouselComponent itemsToShow={windowWidth < 700 ? 1 : 2}
                    label={'My Service Providers'}
                    onViewAllClicked={() => navigator('/service-providers/my-service-providers/' + props.id)}
                    params={{ userId: user.data.item.id }}                                                // current registered user id
                    fetchData={getUserServiceProviders}
                    selectedState={state => state.userServiceProviders}
                    showSearch={true}
                    itemBuilder={(ID, serviceProvider) => <ServiceProviderCarouselCardComponent
                        key={ID}
                        serviceProvider={serviceProvider}
                        mod={'small'}
                        onViewClicked={() => { navigator('/service-providers/service-providers-home/' + props.serviceProvider.id) }} />}
                /> : <></>}

        </div>
    );
}

export default MyServiceProvidersComponent