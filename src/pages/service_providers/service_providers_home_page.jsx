import React, { useEffect } from 'react';
import './service_providers_home_page.css'
import ServiceProviderDetailsComponent from '../../components/service_providers/service_provider_details_component';
import ServiceProviderBranchesComponent from '../../components/service_providers/service_provider_branches_component';
import HiringRequestsComponent from '../../components/service_providers/hiring_requests_component';
import ApplyForJobsComponent from '../../components/service_providers/apply_for_jobs_component';
import FindMembersComponent from '../../components/service_providers/find_members_component';
import TheCEOsComponent from '../../components/service_providers/the_ceos_component';
import MyServiceProvidersComponent from '../../components/service_providers/my_service_providers_component';
import SpaceComponent from '../../components/core/space_component';
import CreateServiceProviderComponent from '../../components/service_providers/create_service_provider_component';
import ServiceProviderDetailsHeaderComponent from '../../components/service_providers/details_components/service_provider_details_header_component';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function ServiceProvidersHomePage(props) {
    useEffect(() => {
        if (props.section) {
            const element = document.getElementById(props.section);
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
        }
    });

    const state = useSelector(state => state.serviceProviderById);

    const { id } = useParams();

    return (
        <div className='service-providers-home-root'
            id={'/service-providers-home'}
            onClick={props.onClick}>
            <ToastContainer position="top-center" autoClose={5000} />
            <ServiceProviderDetailsHeaderComponent id={id} />
            {state.data && state.data.item ?
                <>
                    <ServiceProviderDetailsComponent id={id} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                        <SpaceComponent height={'2px'}
                            width={'93%'}
                            color={'rgb(220,220,220'} />
                    </div>
                </> : <></>}
            <ServiceProviderBranchesComponent id={id} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <SpaceComponent height={'2px'}
                    width={'93%'}
                    color={'rgb(220,220,220'} />
            </div>
            <h2 className='service-providers-section-title'>
                Hiring Requests
            </h2>
            {state.data && state.data.item && ['blank', 'master', 'sub-master', 'employee'].includes(state.data.item.userRole) ?
                <HiringRequestsComponent id={id} /> : <></>}
            <ApplyForJobsComponent id={id} />

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <SpaceComponent height={'2px'}
                    width={'93%'}
                    color={'rgb(220,220,220'} />
            </div>
            <h2 className='service-providers-section-title'>
                Members
            </h2>
            <FindMembersComponent id={id} />
            <TheCEOsComponent id={id} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <SpaceComponent height={'2px'}
                    width={'93%'}
                    color={'rgb(220,220,220'} />
            </div>
            <h2 className='service-providers-section-title'>
                Service providers
            </h2>
            <CreateServiceProviderComponent id={id} />
            <MyServiceProvidersComponent id={id} />
        </div>
    );
}

export default ServiceProvidersHomePage