import React from 'react';
import './member_service_providers_page.css';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import { useNavigate, useParams } from 'react-router-dom';
import ServiceProviderCarouselCardComponent from '../../components/service_providers/cards/service_provider_carousel_card_component';
import { getUserServiceProviders } from '../../state_management/middlewares/user_service_providers_middleware';

function MemberServiceProvidersPage(props) {
    const navigator = useNavigate();
    const { id } = useParams()

    return (
        <div className='member-service-providers-root'>
            <div className='member-service-providers-grid-container'>
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
                    onCardClicked={() => {

                    }}
                    pageSize={6}                     // when start fetching data from I/O
                    gridCardSize='larg'
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    showView={false}
                    showPages={false}
                    sideBorders={false}
                    showSearch={false}
                    fetchParams={{ userId: id }}                                                // check if id is valid
                    fetchData={getUserServiceProviders}
                    selectedState={state => state.userServiceProviders}
                    itemBuilder={(ID, serviceProvider) => <ServiceProviderCarouselCardComponent
                        key={ID}
                        serviceProvider={serviceProvider}
                        mod={'small'}
                        onViewClicked={() => { navigator('/service-providers/service-providers-home/' + serviceProvider.id) }} />}
                />
            </div>
        </div>
    );
}

export default MemberServiceProvidersPage
