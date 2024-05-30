import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './members_explorer_component.css'
import { faArrowLeft, faBuilding, faEdit, faHome, faSearch, faSignOutAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ExploreExpandedComponent from '../../layouts/explore_expanded_component/explore_expanded_component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MemberProfileCardComponent from '../cards/member_profile_card_component';
import DialogComponent from '../../core/dialog_components/dialog_component';
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../../state_management/middlewares/user_by_id_middleware';
import ExplorerLoadingComponent from '../../core/state_components/explorer_loading_component';
import { logOut, resetAuthStatus } from '../../../state_management/middlewares/user_middleware';
import ConfirmActionComponent from '../../core/confirm_action_component';


const MembersExplorerComponent = forwardRef((props, ref) => {
    const openSideBar = () => {
        setShowSideBar(true);
    }

    useImperativeHandle(ref, () => ({
        openSideBar
    }));

    const [selectedSection, setSelectedSection] = useState('members-home');
    const navigator = useNavigate();
    const [currentSection, setCurrentSection] = useState(null);
    const [routingMode, setRoutingMode] = useState('default');
    const location = useLocation();
    const [showSideBar, setShowSideBar] = useState(false);
    const { id } = useParams();
    const state = useSelector(state => state.userById);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        let route = location.pathname.split('/')[2];
        setSelectedSection(route);
        if (route == 'members-home')
            setRoutingMode('scroll');
        else
            setRoutingMode('default');
        dispatch(getUserById({ userId: id }));
    }, [location]);

    useEffect(() => {
        if (user.failure && user.type == 0) {
            dispatch(resetAuthStatus())
            navigator('/home')
        }
    }, [useSelector, user]);


    const onNavigationChanged = (section) => {
        if (section == '/members/') {
            navigator('/members')
        }
        else if (routingMode == 'scroll') {
            const element = document.getElementById(section);
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
            setCurrentSection(section);
        }
        else
            navigator('/members' + section + '/' + id)
    }


    return (
        <div className={!showSideBar ? 'members-explorer-root' : 'members-explorer-root-visible'}
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
                        onNavigationChanged('/members-home');
                    }}
                    icon={faHome}
                    text={'home'}
                    expandable={false}
                    selected={selectedSection == 'members-home' ? true : false} />
                {user.data && user.data.item.id == id ?
                    <ExploreExpandedComponent
                        onClick={() => {
                            onNavigationChanged('/update');
                        }}
                        icon={faEdit}
                        text={'Update my profile'}
                        selected={selectedSection == 'update' ? true : false}
                        highLighted={props.section && props.section == '/update' ? true : false} /> : <></>}
                <ExploreExpandedComponent
                    onClick={() => {
                        onNavigationChanged('/member-service-providers');
                    }}
                    icon={faBuilding}
                    text={'service providers'}
                    expandable={false}
                    selected={selectedSection == 'member-service-providers' ? true : false}
                    highLighted={props.section && props.section == '/member-service-providers' ? true : false} />
                <ExploreExpandedComponent
                    onClick={() => {
                        onNavigationChanged('/members/');
                    }}
                    icon={faSearch}
                    text={'find member'}
                    expandable={false}
                    selected={false}
                    highLighted={false} />
                {user.data && user.data.item.id == id ?
                    <ExploreExpandedComponent onClick={() => {
                        onNavigationChanged('remove-account');
                    }}
                        icon={faTrashAlt}
                        text={'Remove account'}
                        selected={false} /> : <></>}
                {user.data && user.data.item.id == id ?
                    <ExploreExpandedComponent
                        onClick={() => {
                            setShowDialog(true)
                        }}
                        icon={faSignOutAlt}
                        text={'Log out'}
                        expandable={false}
                        selected={false} /> : <></>} </> :
                state.loading ?
                    <ExplorerLoadingComponent /> : <></>}
            <DialogComponent
                higherZIndex={showDialog}
                show={showDialog}
                height='50'
                onClose={() => setShowDialog(false)}>
                <ConfirmActionComponent
                    text={'Are you sure you want to log out?'}
                    positiveAction={'Confirm'}
                    negativeAction={'Cancel'}
                    onNegativeAction={() => setShowDialog(false)}
                    onPositiveAction={() => {
                        dispatch(logOut());
                        setShowDialog(false)
                    }} />
            </DialogComponent>
        </div>
    );
})

export default MembersExplorerComponent