import React, { useEffect, useRef, useState } from 'react';
import './branches_get_started_page.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import BranchesComponent from '../../components/home/branches/branches_component';
import SpaceComponent from '../../components/core/space_component';
import BranchesCarouselCardComponent from '../../components/branches/cards/branches_carousel_card_component';
import { getBranches } from '../../state_management/middlewares/branches_middleware';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';

function BranchesGetStartedPage(props) {
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const paginationRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const section = searchParams.get('section');

    useEffect(() => {
        if (user.type == 0) {
            paginationRef.current.refresh();
            dispatch(resetAuthStatus());
        }
    });

    const location = useLocation();

    useEffect(() => {
        if (section == 2) {
            const element = document.getElementById('branches-explorer');
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
        } else {
            const element = document.getElementById('branches-component');
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    return (
        <div className='branches-get-started-root'
            id='/branches-get-started-component'>
            <SpaceComponent height={'120px'} />
            <BranchesComponent
                id={props.id}
                onExploreClicked={() => {
                    const element = document.getElementById('branches-explorer');
                    if (element)
                        element.scrollIntoView({ behavior: 'smooth' });
                }} />
            <div className='branches-grid-container'>
                <PaginationComponent
                    id={'branches-explorer'}
                    ref={paginationRef}
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
                    gridCardSize={windowWidth >= 800 && windowWidth < 1000 ? 'extra-larg' : 'larg'}
                    height='auto'                       // contatnt or auto
                    sideBorders={false}
                    showFilter={false}
                    showView={false}
                    showPages={true}
                    showSearch={true}
                    fetchParams={{ serviceProviderId: -1 }}                    // make sure this is valid id
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

export default BranchesGetStartedPage

