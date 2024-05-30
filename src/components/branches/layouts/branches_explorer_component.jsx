import React, { useEffect, useState, useImperativeHandle, forwardRef, Fragment } from 'react';
import './branches_explorer_style.scss'
import { faHome, faInfoCircle, faUsers, faKey, faTools, faFolderOpen, faBoxOpen, faPenSquare, faCompass, faBuilding, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ExploreExpandedComponent from '../../layouts/explore_expanded_component/explore_expanded_component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ExploreExpandedItem from '../../layouts/explore_expanded_component/explore_expanded_item';
import MemberProfileCardComponent from '../../members/cards/member_profile_card_component';
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getBranchById } from '../../../state_management/middlewares/branch_by_id_middleware';
import ShimmerCardComponent from '../../core/state_components/shimmer_card_component';
import ExplorerLoadingComponent from '../../core/state_components/explorer_loading_component';

const BranchesExplorerComponent = forwardRef((props, ref) => {
    const [selectedSection, setSelectedSection] = useState('branches-home');
    const navigator = useNavigate();
    const [currentSection, setCurrentSection] = useState(null);
    const [routingMode, setRoutingMode] = useState('default');
    const location = useLocation();
    const [showSideBar, setShowSideBar] = useState(false);
    const { id } = useParams();
    const state = useSelector(state => state.branchById);
    const dispatch = useDispatch();

    useEffect(() => {
        let route = location.pathname.split('/')[2];
        setSelectedSection(route);
        if (route == 'branches-home')
            setRoutingMode('scroll');
        else
            setRoutingMode('default');
        dispatch(getBranchById({ branchId: id, withRoles: true }));
    }, [location]);



    const openSideBar = () => {
        setShowSideBar(true);
    }

    useImperativeHandle(ref, () => ({
        openSideBar
    }));

    const onNavigationChanged = (section) => {
        if (section.split('/').length > 2)
            navigator(section + (section == '/service-providers/service-providers-home' ? ('/' + state.data.item.serviceProviderId) : ''))
        else if (routingMode == 'scroll') {
            const element = document.getElementById(section);
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
            setCurrentSection(section);
        }
        else
            navigator('/branches' + section + '/' + id)
    }

    return (
        <div className={!showSideBar ? 'branches-explorer-root' : 'branches-explorer-root-visible'}>
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
                        onNavigationChanged('/branches-home');
                    }}
                    icon={faHome}
                    text={'home'}
                    expandable={false}
                    selected={selectedSection == 'branches-home' ? true : false} />
                <ExploreExpandedComponent
                    onClick={() => {
                        onNavigationChanged('/branch-details');
                    }}
                    icon={faInfoCircle}
                    text={'details'}
                    expandable={false}
                    selected={selectedSection == 'branch-details' ? true : false}
                    highLighted={currentSection == '/branch-details' ? true : false} />
                <ExploreExpandedComponent
                    onClick={() => { }}
                    icon={faUsers}
                    text={'members'}
                    expandable={true}
                    selected={selectedSection == 'members-find' ? true : false}
                    highLighted={currentSection && currentSection.toLowerCase().includes('member') ? true : false}>
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/members-find');
                    }}
                        icon={faUsers}
                        text={'All members'}
                        selected={selectedSection == 'members-find' ? true : false}
                        highLighted={currentSection == '/members-find' ? true : false} />
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
                    onClick={() => { }}
                    icon={faKey}
                    text={'permissions'}
                    expandable={true}
                    selected={selectedSection == 'my-permissions' ||
                        selectedSection == 'branch-permission-groups' ||
                        selectedSection == 'branch-permission-group-create' ? true : false}
                    highLighted={routingMode == 'scroll' && currentSection && currentSection.toLowerCase().includes('permission') ? true : false}>
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/branch-permission-groups');
                    }}
                        icon={faUsers}
                        text={'permission groups'}
                        selected={selectedSection == 'branch-permission-groups' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/branch-permission-groups' ? true : false} />
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/branch-permission-group-create');
                    }}
                        icon={faPlus}
                        text={'create permission group'}
                        selected={selectedSection == 'branch-permission-group-create' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/branch-permission-group-create' ? true : false} />
                </ExploreExpandedComponent>
                <ExploreExpandedComponent
                    onClick={() => { }}
                    icon={faFolderOpen}
                    text={'resources'}
                    expandable={true}
                    selected={selectedSection == 'branch-services' ||
                        selectedSection == 'branch-products' ||
                        selectedSection == 'branch-posts' ? true : false}
                    highLighted={routingMode == 'scroll' && currentSection && (
                        currentSection.toLowerCase().includes('services') ||
                        currentSection.toLowerCase().includes('products') ||
                        currentSection.toLowerCase().includes('posts') ||
                        currentSection.toLowerCase().includes('resource')) ? true : false}>
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/branch-services');
                    }}
                        icon={faTools}
                        text={'services'}
                        selected={selectedSection == 'branch-services' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/branch-services' ? true : false} />
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/branch-products');
                    }}
                        icon={faBoxOpen}
                        text={'products'}
                        selected={selectedSection == 'branch-products' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/branch-products' ? true : false} />
                    <ExploreExpandedItem onClick={() => {
                        onNavigationChanged('/branch-posts');
                    }}
                        icon={faPenSquare}
                        text={'posts'}
                        selected={selectedSection == 'branch-posts' ? true : false}
                        highLighted={routingMode == 'scroll' && currentSection == '/branch-posts' ? true : false} />
                    <ExploreExpandedItem
                        onClick={() => {
                            onNavigationChanged('/resources/');
                        }}
                        icon={faCompass}
                        text={'Explore resources'}
                        selected={false}
                        highLighted={false} />
                </ExploreExpandedComponent>
                <ExploreExpandedComponent
                    onClick={() => {
                        onNavigationChanged('/service-providers/service-providers-home');
                    }}
                    icon={faBuilding}
                    text={'service provider'}
                    expandable={false}
                    selected={false}
                    highLighted={false} /></> :
                state.loading ?
                    <ExplorerLoadingComponent /> : <></>}
        </div>
    );
})

export default BranchesExplorerComponent