import React, { useEffect, useState } from 'react';
import './service_provider_branches_page.css'
import { useNavigate, useParams } from 'react-router-dom';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import BranchesCarouselCardComponent from '../../components/branches/cards/branches_carousel_card_component';
import { getBranches } from '../../state_management/middlewares/branches_middleware';

function ServiceProvidersBranchesPage(props) {

    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    const { id } = useParams();

    return (
        <div className='service-provider-branches-root'>
            <h3>ServiceProvidersBranchesPage</h3>
            <div className='service-provider-branches-grid-container'>
                <PaginationComponent
                    // id={'resources-explorer'}
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
                    //     navigator('/branches/branches-home')
                    // }}
                    pageSize={6}                     // when start fetching data from I/O
                    gridCardSize={(windowWidth >= 1200 && windowWidth < 1500) ?
                        'extra-larg' : (windowWidth >= 800 && windowWidth < 1200) ? 'extra-larg' : 'larg'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    showView={false}
                    sideBorders={false}
                    showPages={true}
                    showSearch={true}
                    fetchParams={{ serviceProviderId: id }}                    // make sure this is valid id
                    fetchData={getBranches}
                    selectedState={state => state.branches}
                    itemBuilder={(ID, branch) => <BranchesCarouselCardComponent
                        key={ID}
                        selectionMod='none'
                        branch={branch} />}
                />
            </div>
        </div>
    );
}

export default ServiceProvidersBranchesPage