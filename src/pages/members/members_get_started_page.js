import React, { useEffect, useState } from 'react';
import './members_get_started_page.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import MembersComponent from '../../components/home/members/members_component';
import SpaceComponent from '../../components/core/space_component';
import MemberCarouselCardComponent from '../../components/members/cards/member_carousel_card_component';
import { getUsers } from '../../state_management/middlewares/users_middleware';


function MembersGetStartedPage(props) {
    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [searchParams, setSearchParams] = useSearchParams();
    const section = searchParams.get('section');
    const location = useLocation();

    useEffect(() => {
        if (section == 2) {
            const element = document.getElementById('members-explorer');
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
        } else {
            const element = document.getElementById('members-component');
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    return (
        <div className='members-get-started-root'
            id='/members-get-started-component'>
            <SpaceComponent height={'120px'} />
            <MembersComponent
            id = {'members-component'}
             onExploreClicked={() => {
                const element = document.getElementById('members-explorer');
                if (element)
                    element.scrollIntoView({ behavior: 'smooth' });
            }} />
            <div className='members-grid-container'>
                <PaginationComponent
                    id={'members-explorer'}
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
                    //     navigate('/members/members-home')
                    // }}
                    pageSize={8}                     // when start fetching data from I/O
                    gridCardSize={windowWidth >= 800 && windowWidth < 1100 ? 'larg' : 'medium'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    sideBorders={false}
                    showView={false}
                    showPages={true}
                    showSearch={true}
                    fetchData={getUsers}
                    selectedState={state => state.users}
                    itemBuilder={(ID, user) => <MemberCarouselCardComponent
                        user={user}
                        key={ID}
                        selectionMod={'none'}
                    />}
                />
            </div>
        </div>
    );
}

export default MembersGetStartedPage

