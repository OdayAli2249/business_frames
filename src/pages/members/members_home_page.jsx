import React, { useEffect } from 'react';
import './members_home_page.css'
import MembersHomeComponent from '../../components/members/members_home_component';
import SpaceComponent from '../../components/core/space_component';
import UpdateMyProfileComponent from '../../components/members/update_my_profile_component';
import MemberServiceProvidersComponent from '../../components/members/member_service_providers_component';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShimmerCardComponent from '../../components/core/state_components/shimmer_card_component';

function MembersHomePage(props) {

    const { id } = useParams();
    const user = useSelector(state => state.user);

    return (
        <div className='members-home-root'
            id={'/members-home'}>
            <div style={{ padding: '40px' }}>
                <MembersHomeComponent id={id} />
            </div>
            <SpaceComponent height={'10px'} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <SpaceComponent height={'2px'}
                    width={'94%'}
                    color={'rgb(220,220,220'} />
            </div>
            <SpaceComponent height={'10px'} />
            {user.data && user.data.item.id == id ?
                <>
                    <UpdateMyProfileComponent id={id} />
                    <SpaceComponent height={'10px'} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                        <SpaceComponent height={'2px'}
                            width={'94%'}
                            color={'rgb(220,220,220'} />
                    </div>
                </> : <></>}
            <SpaceComponent height={'10px'} />
            <MemberServiceProvidersComponent id={id} />
        </div>
    );
}

export default MembersHomePage