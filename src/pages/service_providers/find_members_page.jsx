import React, { useEffect, useRef, useState } from 'react';
import './find_members_page.css'
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faCut, faRemove } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../components/core/space_component';
import DialogComponent from '../../components/core/dialog_components/dialog_component';
import AddMemberToBranchComponent from '../../components/service_providers/dialog_content_component/add_member_to_branch_component';
import MemberCarouselCardComponent from '../../components/members/cards/member_carousel_card_component';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { modifyUserRole, reset } from '../../state_management/middlewares/modify_user_role_middleware';
import { getServiceProviderUsers } from '../../state_management/middlewares/service_provider_users_middleware';
import { useParams } from 'react-router-dom';
import ConfirmActionComponent from '../../components/core/confirm_action_component';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import { getServiceProviderById } from '../../state_management/middlewares/service_provider_by_id_middleware';

function FindMembersPage(props) {
    const [selectMod, setSelectMod] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
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
        operation: { show: false, value: null }
    }

    const { id } = useParams();
    const [role, setRole] = useState(null);
    const state = useSelector(state => state.serviceProviderById);

    useEffect(() => {
        setRole(state.data && state.data.item ? state.data.item.userRole : null);
    }, [state]);

    const [showDialog, setShowDialog] = useState(initialComponentState);

    const createResult = useSelector(state => state.modifyUserRole);
    const dispatch = useDispatch();
    const paginationRef = useRef(null);
    const resetStates = () => {
        setShowDialog(initialComponentState);
        setSelectMod(false);
        setSelectedItems([]);
    }

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            if (selectMod) {
                setSelectMod(!selectMod);
                setSelectedItems([]);
            }
            paginationRef.current.refresh();
            setShowDialog(initialComponentState)
            dispatch(resetAuthStatus())
            dispatch(getServiceProviderById({ serviceProviderId: id, withRoles: true }));
        }
    });

    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            }) && resetStates();
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
            if (createResult.success)
                paginationRef.current.refresh()
        }
    }, [dispatch, createResult]);

    return (
        <div className='find-members-root'>
            <ToastContainer position="top-center" autoClose={5000} />
            <div className='find-members-grid-container'>
                {role == 'master' || role == 'sub-master' ?
                    <FontAwesomeIcon className='find-members-floating-select-button'
                        icon={faCheck}
                        style={{ backgroundColor: selectMod ? 'rgb(17, 132, 36)' : null }}
                        onClick={() => {
                            setSelectMod(!selectMod);
                            setSelectedItems([]);
                        }} /> : <></>}
                {selectedItems.length ? <div className='find-members-button-section'>
                    <div className='find-members-button'
                        onClick={() => {
                            setShowDialog({ ...showDialog, operation: { show: true, value: 'remove' } });
                        }}>
                        <h4 className='find-members-samll-text'
                            style={{ fontSize: '16px' }}>Remove</h4>
                        <SpaceComponent width={'15px'} />
                        <FontAwesomeIcon className='find-members-button-icon'
                            icon={faRemove} />
                    </div>
                    <SpaceComponent width={'15px'} height={'15px'} />
                    <div className='find-members-button'
                        onClick={() => {
                            setShowDialog({ ...showDialog, operation: { show: true, value: 'copy' } });
                        }}>
                        <h4 className='find-members-samll-text'
                            style={{ fontSize: '16px' }}>Copy</h4>
                        <SpaceComponent width={'15px'} />
                        <FontAwesomeIcon className='find-members-button-icon'
                            icon={faCopy} />
                    </div>
                    <SpaceComponent width={'15px'} height={'15px'} />
                    <div className='find-members-button'
                        onClick={() => {
                            setShowDialog({ ...showDialog, operation: { show: true, value: 'transfer' } });
                        }}>
                        <h4 className='find-members-samll-text'
                            style={{ fontSize: '16px' }}>Transfer</h4>
                        <SpaceComponent width={'15px'} />
                        <FontAwesomeIcon className='find-members-button-icon'
                            icon={faCut} />
                    </div>
                </div> : <></>}
                <PaginationComponent
                    // id={'resources-explorer'}
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
                    pageSize={8}                     // when start fetching data from I/O
                    gridCardSize={(windowWidth >= 700 && windowWidth < 1000) ? 'larg' : 'medium'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    showView={false}
                    sideBorders={false}
                    showPages={true}
                    showSearch={true}
                    fetchParams={{ serviceProviderId: id }}
                    fetchData={getServiceProviderUsers}
                    selectedState={state => state.serviceProviderUsers}
                    itemBuilder={(ID, user) => <MemberCarouselCardComponent key={ID} selectionMod={selectMod ? 'multi' : 'none'}
                        user={user}
                        role={role}
                        onSetRoleClicked={(selectedRole) => {
                            setShowDialog({
                                ...showDialog,
                                setRole: { show: true, userId: user.id, role: selectedRole }
                            });
                        }}
                        onItemSelected={() => {
                            if (!selectedItems.includes(user.id))
                                setSelectedItems([...selectedItems, user.id])
                            else {
                                let newSelectedItems = [...selectedItems];
                                let indexToRemove = selectedItems.indexOf(user.id);
                                if (indexToRemove !== -1) {
                                    newSelectedItems.splice(indexToRemove, 1);
                                }
                                setSelectedItems(newSelectedItems)
                            }
                        }}
                        selected={selectedItems.includes(user.id)}
                    />
                    }
                />
            </div>
            <DialogComponent
                mod={'fill'}
                show={showDialog.operation.show}
                onClose={() => setShowDialog({ ...showDialog, operation: { show: false, value: null } })}>
                {showDialog.operation.value == 'remove' ?
                    <AddMemberToBranchComponent stepNumber={0}
                        operation={'remove'}
                        serviceProviderId={id}
                        members={selectedItems}
                        onSubmit={(userBranchParams) => dispatch(modifyUserRole(
                            {
                                userBranchParams: userBranchParams,
                            }))} /> :
                    showDialog.operation.value == 'copy' || showDialog.operation.value == 'transfer' ?
                        <AddMemberToBranchComponent stepNumber={1}
                            serviceProviderId={id}
                            operation={showDialog.operation.value}
                            members={selectedItems}
                            onSubmit={(userBranchParams) => dispatch(modifyUserRole(
                                {
                                    userBranchParams: userBranchParams,
                                }))} /> : <></>
                }
            </DialogComponent>

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
                            userId: showDialog.setRole.userId,
                            role: showDialog.setRole.role,
                            serviceProviderId: id
                        }));
                        setShowDialog({ ...showDialog, setRole: { show: false, userId: null, role: null } });
                    }} />
            </DialogComponent>
        </div>
    );
}

export default FindMembersPage