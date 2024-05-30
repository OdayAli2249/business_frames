import React, { useEffect, useState } from 'react';
import './all_branch_members_page.css';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import MemberCarouselCardComponent from '../../components/members/cards/member_carousel_card_component';
import { getBranchUsers } from '../../state_management/middlewares/branch_users_middleware';
import { useParams } from 'react-router-dom';

function AllBranchMembersPage(props) {

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
        <div className='all-branch-members-root'>
            <div className='branch-members-grid-container'>
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
                    pageSize={8}                     // when start fetching data from I/O
                    gridCardSize={(windowWidth >= 700 && windowWidth < 1000) ? 'larg' : 'medium'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    showView={false}
                    sideBorders={false}
                    showPages={true}
                    showSearch={false}
                    fetchParams={{ branchId: id }}
                    fetchData={getBranchUsers}
                    selectedState={state => state.branchUsers}
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

export default AllBranchMembersPage