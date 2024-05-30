import React, { useEffect, useState } from 'react';
import './my_service_providers_page.css';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import ServiceProviderCarouselCardComponent from '../../components/service_providers/cards/service_provider_carousel_card_component';
import { getUserServiceProviders } from '../../state_management/middlewares/user_service_providers_middleware';
import { useSelector } from 'react-redux';


function MyServiceProvidersPage(props) {

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
        <div className='my-service-providers-root'>
            <div className='my-service-providers-grid-container'>
                {user.data && user.data.item ?
                    <PaginationComponent
                        id={'resources-explorer'}
                        filters={new Map([
                            ['filter-type-1', ['filter-type-1-option-1', 'filter-type-1-option-2', 'filter-type-1-option-3',]],
                            ['filter-type-2', ['filter-type-2-option-1', 'filter-type-2-option-2', 'filter-type-2-option-3',]],
                            ['filter-type-3', ['filter-type-3-option-1', 'filter-type-3-option-2', 'filter-type-3-option-3',]]
                        ])}
                        initialView={{
                            grid: true,
                            list: false
                        }}
                        // onCardClicked={() => {
                        //     navigator('/service-providers/service-providers-home')
                        // }}
                        pageSize={6}                     // when start fetching data from I/O
                        gridCardSize={(windowWidth >= 1200 && windowWidth < 1500) ?
                            'extra-larg' : (windowWidth >= 800 && windowWidth < 1200) ? 'extra-larg' : 'larg'}
                        height='auto'                       // contatnt or auto
                        showFilter={false}
                        showView={false}
                        showPages={false}
                        sideBorders={false}
                        showSearch={false}
                        fetchParams={{ userId: user.data.item.id }}                                                // current registered user id
                        fetchData={getUserServiceProviders}
                        selectedState={state => state.userServiceProviders}
                        itemBuilder={(ID, serviceProvider) => <ServiceProviderCarouselCardComponent
                            key={ID}
                            serviceProvider={serviceProvider}
                            mod={'small'}
                            onViewClicked={() => { navigator('/service-providers/service-providers-home/' + serviceProvider.id) }} />}
                    /> : <></>}
            </div>
        </div>
    );
}

export default MyServiceProvidersPage