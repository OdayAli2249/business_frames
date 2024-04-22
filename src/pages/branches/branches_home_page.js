import React, { useEffect } from 'react';
import './branches_home_page.css'
import BranchPermissionGroupsComponent from '../../components/branches/branch_permission_groups_component';
import BranchServicesComponent from '../../components/branches/branch_services_component';
import BranchProductsComponent from '../../components/branches/branch_products_component';
import BranchPostsComponent from '../../components/branches/branch_posts_component';
import SpaceComponent from '../../components/core/space_component';
import BranchDetailsHeaderComponent from '../../components/branches/details_component/branch_details_header_component';
import FindMembersComponent from '../../components/service_providers/find_members_component';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiClient } from '../../data_sources/remote_data_sources/api_client';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function BranchesHomePage(props) {
    const navigator = useNavigate();
    const { id } = useParams();
    const state = useSelector(state => state.branchById);

    return (
        <div className='branches-home-root'
            id={'/branches-home'}
            onClick={props.onClick}>
            <ToastContainer position="top-center" autoClose={5000} />
            <BranchDetailsHeaderComponent />
            <SpaceComponent height={'20px'} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <SpaceComponent height={'2px'}
                    width={'93%'}
                    color={'rgb(220,220,220'} />
            </div>
            <SpaceComponent height={'20px'} />
            <FindMembersComponent onViewAllClicked={() => navigator('/branches/members-find/' + id)} id={id} />
            <SpaceComponent height={'20px'} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <SpaceComponent height={'2px'}
                    width={'93%'}
                    color={'rgb(220,220,220'} />
            </div>
            <SpaceComponent height={'20px'} />
            {state.data && state.data.item && ['master', 'sub-master', 'employee'].includes(state.data.item.userRole) ?
                <>
                    <BranchPermissionGroupsComponent id={id} />
                    <SpaceComponent height={'20px'} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                        <SpaceComponent height={'2px'}
                            width={'93%'}
                            color={'rgb(220,220,220'} />
                    </div>
                    <SpaceComponent height={'20px'} />
                </> : <></>}

            <h2 className='branches-section-title'>
                Resources
            </h2>
            <SpaceComponent height={'20px'} />
            <BranchServicesComponent id={id} />
            <SpaceComponent height={'20px'} />
            <BranchProductsComponent id={id} />
            <SpaceComponent height={'20px'} />
            <BranchPostsComponent id={id} />
            <SpaceComponent height={'20px'} />
        </div>
    );
}

export default BranchesHomePage