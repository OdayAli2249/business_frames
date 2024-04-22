import React, { useEffect, useState } from 'react';
import './member_service_providers_component.css'
import CarouselComponent from '../core/carousel_component/carousel_component';
import { useNavigate } from 'react-router-dom';
import ServiceProviderCarouselCardComponent from '../service_providers/cards/service_provider_carousel_card_component';
import { getUserServiceProviders } from '../../state_management/middlewares/user_service_providers_middleware';
import { useSelector } from 'react-redux';


function MemberServiceProvidersComponent(props) {
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
        <div className='member-service-providers-component-root'
            id='/member-service-providers'>
            <CarouselComponent itemsToShow={windowWidth < 700 ? 1 : 2}
                label={(user.data && user.data.item.id == props.id ? 'My' : 'Member') + ' Service Providers'}
                onViewAllClicked={() => navigator('/members/member-service-providers/' + props.id)}
                params={{ userId: props.id }}                                                // check if id is valid
                fetchData={getUserServiceProviders}
                selectedState={state => state.userServiceProviders}
                showSearch={true}
                itemBuilder={(ID, serviceProvider) => <ServiceProviderCarouselCardComponent
                    key={ID}
                    serviceProvider={serviceProvider}
                    mod={'small'}
                    onViewClicked={() => { navigator('/service-providers/service-providers-home/' + serviceProvider.id) }} />}
            />
        </div>
    );
}

export default MemberServiceProvidersComponent