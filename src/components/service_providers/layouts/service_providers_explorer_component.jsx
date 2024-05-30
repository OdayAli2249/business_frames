import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './service_providers_explorer_component.css'
import { faArrowLeft, faBriefcase, faBuilding, faClipboard, faCompass, faHistory, faHome, faInfoCircle, faMapMarkerAlt, faPlus, faSearch, faUserTie, faUsers } from '@fortawesome/free-solid-svg-icons';
import ExploreExpandedComponent from '../../layouts/explore_expanded_component/explore_expanded_component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ExploreExpandedItem from '../../layouts/explore_expanded_component/explore_expanded_item';
import SpaceComponent from '../../core/space_component';
import MemberProfileCardComponent from '../../members/cards/member_profile_card_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getServiceProviderById } from '../../../state_management/middlewares/service_provider_by_id_middleware';
import ExplorerLoadingComponent from '../../core/state_components/explorer_loading_component';

const ServiceProvidersExplorerComponent = forwardRef((props, ref) => {
    const navigator = useNavigate();
    const [currentSection, setCurrentSection] = useState(null);
    const [routingMode, setRoutingMode] = useState('default');
    const location = useLocation();
    const { id } = useParams();
    const state = useSelector(state => state.serviceProviderById);
    const dispatch = useDispatch();

    useEffect(() => {
        let route = location.pathname.split('/')[2];
        setSelectedSection(route);
        if (route == 'service-providers-home')
            setRoutingMode('scroll');
        else
            setRoutingMode('default');
        dispatch(getServiceProviderById({ serviceProviderId: id, withRoles: true }));
    }, [location]);

    useImperativeHandle(ref, () => ({
        openSideBar
    }));

    const onNavigationChanged = (section) => {
        if (section.split('/').length > 2)
            navigator(section)
        else if (routingMode == 'scroll') {
            const element = document.getElementById(section);
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
            setCurrentSection(section);
        }
        else
            navigator('/service-providers' + section + '/' + id)
    }

    const [selectedSection, setSelectedSection] = useState('service-providers-home');
    const [showSideBar, setShowSideBar] = useState(false);
    useEffect(() => {
        setSelectedSection(location.pathname.split('/')[2]);
    }, [location]);

    const openSideBar = () => {
        setShowSideBar(true);
    }

    useImperativeHandle(ref, () => ({
        openSideBar
    }));

    return (
        <div className={!showSideBar ? 'service-providers-explorer-root' : 'service-providers-explorer-root-visible'}
            onClick={props.onClick}>
            {state.data && state.data.item ? <>
                <FontAwesomeIcon className='hide-button'
                    icon={faArrowLeft}
                    onClick={() => setShowSideBar(false)} />
                <MemberProfileCardComponent />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <SpaceComponent height={'2px'}
                        width={'93%'}
                        color={'rgb(220,220,220'} />
                </div>
                <SpaceComponent height={'30px'} />
                <ExploreExpandedComponent
                    onClick={() => {
                        onNavigationChanged('/service-providers-home');
                    }}
                    icon={faHome}
                    text={'home'}
                    expandable={false}
                    selected={selectedSection == 'service-providers-home' ? true : false} />
                <ExploreExpandedComponent
                    onClick={() => {
                        onNavigationChanged('/service-provider-details');
                    }}
                    icon={faInfoCircle}
                    text={'details'}
                    expandable={false}
                    selected={selectedSection == 'service-provider-details' ? true : false}
                    highLighted={routingMode == 'scroll' && currentSection == '/service-provider-details' ? true : false} />
                <ExploreExpandedComponent
                    onClick={() => { }}
                    icon={faMapMarkerAlt}
                    text={'branches'}
                    expandable={true}
                    selected={selectedSection == 'service-provider-branches' ? true : false}
                    highLighted={routingMode == 'scroll' && currentSection && currentSection.toLowerCase().includes('branches') ? true : false}>
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/service-provider-branches');
                    }}
                        icon={faSearch}
                        text={'All branches'}
                        selected={selectedSection == 'service-provider-branches' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/service-provider-branches' ? true : false} />
                    <ExploreExpandedItem
                        onClick={() => {
                            onNavigationChanged('/branches/');
                        }}
                        icon={faCompass}
                        text={'Explore branches'}
                        selected={false}
                        highLighted={false} />
                </ExploreExpandedComponent>
                <ExploreExpandedComponent
                    onClick={() => { }}
                    icon={faUserTie}
                    text={'hiring requests'}
                    expandable={true}
                    selected={selectedSection == 'sent-hiring-requests' ||
                        selectedSection == 'hiring-requests' ||
                        selectedSection == 'apply-for-jobs' ? true : false}
                    highLighted={routingMode == 'scroll' && currentSection && (currentSection.toLowerCase().includes('hiring')
                        || currentSection.toLowerCase().includes('apply')) ? true : false}>
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/hiring-requests');
                    }}
                        icon={faHistory}
                        text={'recent hiring requests'}
                        selected={selectedSection == 'hiring-requests' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/hiring-requests' ? true : false} />
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/apply-for-jobs');
                    }}
                        icon={faClipboard}
                        text={'apply for jobs'}
                        selected={selectedSection == 'apply-for-jobs' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/apply-for-jobs' ? true : false} />
                </ExploreExpandedComponent>
                <ExploreExpandedComponent
                    onClick={() => { }}
                    icon={faUsers}
                    text={'members'}
                    expandable={true}
                    selected={selectedSection && (
                        selectedSection.toLowerCase().includes('member') ||
                        selectedSection.toLowerCase().includes('ceo')) ? true : false}
                    highLighted={routingMode == 'scroll' && currentSection && (
                        currentSection.toLowerCase().includes('member') ||
                        currentSection.toLowerCase().includes('ceo')) ? true : false}>
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/members-find');
                    }}
                        icon={faSearch}
                        text={'find member'}
                        selected={selectedSection == 'members-find' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/members-find' ? true : false} />
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/the-ceos');
                    }}
                        icon={faBriefcase}
                        text={'the CEOs'}
                        selected={selectedSection == 'the-ceos' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/the-ceos' ? true : false} />
                    <ExploreExpandedItem
                        onClick={() => {
                            onNavigationChanged('/members/');
                        }}
                        icon={faCompass}
                        text={'Explore members'}
                        selected={false}
                        highLighted={false} />
                </ExploreExpandedComponent>
                <ExploreExpandedComponent
                    onClick={() => {
                        onNavigationChanged('/service-provider-create');
                    }}
                    icon={faPlus}
                    text={'create service provider'}
                    expandable={false}
                    selected={selectedSection == 'service-provider-create' ? true : false}
                    highLighted={routingMode == 'scroll' && currentSection == '/service-provider-create' ? true : false} />
                <ExploreExpandedComponent
                    onClick={() => { }}
                    icon={faBuilding}
                    text={'service providers'}
                    expandable={true}
                    selected={selectedSection == 'service-providers-all' ||
                        selectedSection == 'my-service-providers' ? true : false}
                    highLighted={routingMode == 'scroll' && currentSection && (
                        currentSection.toLowerCase().includes('all-service-providers') ||
                        currentSection.toLowerCase().includes('find-service-provider')) ? true : false}>
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/my-service-providers');
                    }}
                        icon={faBuilding}
                        text={'my service provider'}
                        selected={selectedSection == 'my-service-providers' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/my-service-providers' ? true : false} />
                </ExploreExpandedComponent>
            </> : state.loading ? <ExplorerLoadingComponent /> : <></>}
        </div>
    );
})

export default ServiceProvidersExplorerComponent