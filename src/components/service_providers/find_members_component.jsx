import React, { useEffect, useRef, useState } from 'react';
import './find_members_component.css';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from '../core/carousel_component/carousel_component';
import MemberCarouselCardComponent from '../members/cards/member_carousel_card_component';
import DialogComponent from '../core/dialog_components/dialog_component';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { getUsers } from '../../state_management/middlewares/users_middleware';
import { modifyUserRole, reset } from '../../state_management/middlewares/modify_user_role_middleware';
import { getServiceProviderUsers } from '../../state_management/middlewares/service_provider_users_middleware';
import { getBranchUsers } from '../../state_management/middlewares/branch_users_middleware';
import ConfirmActionComponent from '../core/confirm_action_component';

function FindMembersComponent(props) {
    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const initialComponentState = {
        setRole: { show: false, userId: null, role: null },
    }

    const [showDialog, setShowDialog] = useState(initialComponentState);

    const createResult = useSelector(state => state.modifyUserRole);
    const dispatch = useDispatch();
    const carouselRef = useRef(null);
    const state = useSelector(state => state.serviceProviderById);


    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            }) && setShowDialog(initialComponentState)
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
            if (createResult.success)
                carouselRef.current.refresh()
        }
    }, [dispatch, createResult]);

    return (
        <div className='find-members-component-root'
            id='/members-find'>
            {createResult.loading && <div className='unfocus' />}
            <CarouselComponent itemsToShow={(windowWidth >= 700 && windowWidth < 900) ? 3 : windowWidth < 700 ? 2 : 4}
                label={'Members'}
                onViewAllClicked={() => {
                    if (!props.onViewAllClicked)
                        navigator('/service-providers/members-find/' + props.id)
                    else props.onViewAllClicked();
                }}
                ref={carouselRef}
                params={{ branchId: props.id, serviceProviderId: props.id, withRole: true, limit: 6, offset: 0 }}
                fetchData={props.onViewAllClicked ? getBranchUsers : getServiceProviderUsers}
                selectedState={props.onViewAllClicked ? state =>
                    state.branchUsers : state => state.serviceProviderUsers}
                itemBuilder={(ID, user) => <MemberCarouselCardComponent
                    user={user}
                    role={state.data && state.data.item ? state.data.item.userRole : null}
                    key={ID}
                    onSetRoleClicked={(selectedRole) => {
                        setShowDialog({
                            ...showDialog,
                            setRole: { show: true, userId: user.id, role: selectedRole }
                        });
                    }}
                />} />
            <DialogComponent
                show={showDialog.setRole.show}
                height='50'
                onClose={() => setShowDialog({ ...showDialog, setRole: { show: false, userId: null, role: null } })}>
                <ConfirmActionComponent
                    text={'Are you sure you want to give user this role?'}
                    positiveAction={'Confirm'}
                    negativeAction={'Cancel'}
                    onNegativeAction={() => setShowDialog({ ...showDialog, setRole: { show: false, userId: null, role: null } })}
                    onPositiveAction={() => {
                        dispatch(modifyUserRole({
                            serviceProviderId: props.id,
                            userId: showDialog.setRole.userId,
                            role: showDialog.setRole.role
                        }));
                        setShowDialog({ ...showDialog, setRole: { show: false, userId: null, role: null } });
                    }} />
            </DialogComponent>
        </div>
    );
}

export default FindMembersComponent