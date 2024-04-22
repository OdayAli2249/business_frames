import React, { useEffect, useRef, useState } from 'react';
import './branch_permission_groups_page.css';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import PermissionGroupCardComponent from '../../components/branches/cards/permission_group_card_component';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissionGroups } from '../../state_management/middlewares/permission_group_middleware';
import { modifyPermissionGroup, reset } from '../../state_management/middlewares/modify_permission_groups_middleware';
import { Operations } from '../../state_management/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import DialogComponent from '../../components/core/dialog_components/dialog_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import ConfirmActionComponent from '../../components/core/confirm_action_component';
import { getBranchById } from '../../state_management/middlewares/branch_by_id_middleware';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import CreatePermissionGroupStepperComponent from '../../components/branches/form_components/create_permission_stepper';

function BranchPermissionGroupsPage(props) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const initialPageState = {
        add: false,
        remove: { show: false, higherZIndex: false },
        edit: { show: false, higherZIndex: false, permissionGroup: null },
        view: { permissionGroup: null }
    }

    const [showDialog, setShowDialog] = useState(initialPageState);

    const { id } = useParams();

    const createResult = useSelector(state => state.modifyPermissionGroup);
    const dispatch = useDispatch();
    const paginationRef = useRef(null);
    const [role, setRole] = useState(null);

    const state = useSelector(state => state.branchById);

    useEffect(() => {
        setRole(state.data && state.data.item ? state.data.item.userRole : null);
    }, [state]);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            paginationRef.current.refresh();
            setShowDialog(initialPageState)
            dispatch(resetAuthStatus())
            dispatch(getBranchById({ branchId: id, withRoles: true }));
        }
    });

    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            }) && setShowDialog(initialPageState)
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
        <div className='branch-permission-groups-root'>
            <ToastContainer position="top-center" autoClose={5000} />
            {createResult.loading && <div className='unfocus' />}
            {role != null && ['master', 'sub-master'].includes(role) ?
                <FontAwesomeIcon className='branch-permission-group-floating-add-button'
                    icon={faAdd}
                    onClick={() => {
                        setShowDialog({ ...showDialog, add: true })
                    }} /> : <></>}
            <div className='branch-permission-groups-grid-container'>
                <PaginationComponent
                    ref={paginationRef}
                    // filters={new Map([
                    //     ['filter-type-1', ['filter-type-1-option-1', 'filter-type-1-option-2', 'filter-type-1-option-3',]],
                    //     ['filter-type-2', ['filter-type-2-option-1', 'filter-type-2-option-2', 'filter-type-2-option-3',]],
                    //     ['filter-type-3', ['filter-type-3-option-1', 'filter-type-3-option-2', 'filter-type-3-option-3',]]
                    // ])}
                    initialView={{
                        grid: true,
                        list: false
                    }}
                    onCardClicked={() => { }}
                    pageSize={6}                     // when start fetching data from I/O
                    gridCardSize={(windowWidth >= 1200 && windowWidth < 1500) ?
                        'extra-larg' : (windowWidth >= 800 && windowWidth < 1200) ? 'extra-larg' : 'larg'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    sideBorders={false}
                    showView={false}
                    showPages={true}
                    showSearch={true}
                    fetchParams={{ branchId: id }}
                    fetchData={getPermissionGroups}
                    selectedState={state => state.permissionGroups}
                    itemBuilder={(ID, permissionGroup) => <PermissionGroupCardComponent
                        role={role}
                        dialogMod={false}
                        permissionGroup={permissionGroup}
                        onShowViewDialog={() => {
                            setShowDialog({ ...showDialog, view: { permissionGroup } })
                        }}
                        onShowRemoveDialog={() => {
                            setShowDialog({
                                ...showDialog, remove: {
                                    show: true, higherZIndex: false,
                                    permissionGroupId: permissionGroup.id
                                }
                            })
                        }}
                        onShowEditDialog={() => {
                            setShowDialog({
                                ...showDialog, edit: {
                                    show: true,
                                    higherZIndex: false,
                                    permissionGroup: permissionGroup
                                }
                            })
                        }}
                        key={ID} />} />
            </div>
            {showDialog.view.permissionGroup ?
                <DialogComponent
                    show={showDialog.view.permissionGroup ? true : false}
                    mod='fill'
                    onClose={() => setShowDialog({ ...showDialog, view: { permissionGroup: null } })}>
                    <PermissionGroupCardComponent
                        role={role}
                        dialogMod={true}
                        permissionGroup={showDialog.view.permissionGroup}
                        onShowEditDialog={() => {
                            setShowDialog(
                                {
                                    ...showDialog,
                                    edit: {
                                        show: true,
                                        higherZIndex: true,
                                        permissionGroup: showDialog.view.permissionGroup
                                    }
                                })
                        }}
                        onShowRemoveDialog={() => {
                            setShowDialog({
                                ...showDialog, remove:
                                    { show: true, higherZIndex: true, permissionGroupId: showDialog.view.permissionGroup.id }
                            })
                        }}
                    />
                </DialogComponent>
                : <></>}
            {showDialog.add ?
                <DialogComponent
                    show={showDialog.add}
                    height='95'
                    onClose={() => setShowDialog({ ...showDialog, add: false })}>
                    <CreatePermissionGroupStepperComponent headerPadding={70} height={'100%'}
                        onSubmit={(permissionGroupModel) => dispatch(modifyPermissionGroup({
                            permissionGroup: permissionGroupModel,
                            operation: Operations.CREATE,
                            branchId: id
                        }))}
                        branchId={id} />
                </DialogComponent> : <></>}
            {showDialog.edit.show ?
                <DialogComponent
                    higherZIndex={showDialog.edit.higherZIndex}
                    show={showDialog.edit.show}
                    height='95'
                    onClose={() => setShowDialog({
                        ...showDialog, edit:
                        {
                            show: false,
                            higherZIndex: false,
                            permissionGroup: null
                        }
                    })}>
                    <CreatePermissionGroupStepperComponent headerPadding={70} height={'100%'}
                        onSubmit={(permissionGroupModel) => dispatch(modifyPermissionGroup({
                            permissionGroupId: showDialog.edit.permissionGroup.id,
                            permissionGroup: permissionGroupModel,
                            operation: Operations.EDIT,
                        }))}
                        permissionGroup={showDialog.edit.permissionGroup}
                        branchId={id} />
                </DialogComponent> : <></>}
            <DialogComponent
                higherZIndex={showDialog.remove.higherZIndex}
                show={showDialog.remove.show}
                height='50'
                onClose={() => setShowDialog({ ...showDialog, remove: { show: false, jobOfferId: null, higherZIndex: false } })}>
                <ConfirmActionComponent
                    text={'Are you sure you want to remove this permission group?'}
                    positiveAction={'Confirm'}
                    negativeAction={'Cancel'}
                    onNegativeAction={() => setShowDialog({ ...showDialog, remove: { show: false, permissionGroupId: null, higherZIndex: false } })}
                    onPositiveAction={() => {
                        dispatch(modifyPermissionGroup({
                            permissionGroupId: showDialog.remove.permissionGroupId,
                            operation: Operations.REMOVE
                        }));
                        setShowDialog({ ...showDialog, remove: { show: false, permissionGroupId: null, higherZIndex: false } });
                    }} />
            </DialogComponent>
        </div>
    );
}

export default BranchPermissionGroupsPage