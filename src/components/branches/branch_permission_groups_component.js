import './branch_permission_groups_style.scss';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from '../core/carousel_component/carousel_component';
import SpaceComponent from '../core/space_component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../core/button_component';
import PermissionGroupCardComponent from './cards/permission_group_card_component';
import { useEffect, useRef, useState } from 'react';
import DialogComponent from '../core/dialog_components/dialog_component';
import CreatePermissionGroupStepperComponent from './form_components/stepper_components/create_permission_group_stepper_component/create_permission_group_stepper_component';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { modifyPermissionGroup, reset } from '../../state_management/middlewares/modify_permission_groups_middleware';
import { getPermissionGroups } from '../../state_management/middlewares/permission_group_middleware';
import { Operations } from '../../state_management/actions';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import { getBranchById } from '../../state_management/middlewares/branch_by_id_middleware';
import ConfirmActionComponent from '../core/confirm_action_component';


function BranchPermissionGroupsComponent(props) {

    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const initialPageState = {
        remove: { show: false, higherZIndex: false },
        edit: { show: false, higherZIndex: false, permissionGroup: null },
        view: { permissionGroup: null }
    }

    const [showDialog, setShowDialog] = useState(initialPageState);

    const createResult = useSelector(state => state.modifyPermissionGroup);
    const dispatch = useDispatch();
    const carouselRef = useRef(null);
    const [role, setRole] = useState(null);

    const state = useSelector(state => state.branchById);

    useEffect(() => {
        setRole(state.data && state.data.item ? state.data.item.userRole : null);
    }, [state]);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            carouselRef.current.refresh();
            setShowDialog(initialPageState)
            dispatch(resetAuthStatus())
            dispatch(getBranchById({ branchId: props.id, withRoles: true }));
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
                carouselRef.current.refresh()
        }
    }, [dispatch, createResult]);

    return (
        <div className='branch-permission-groups-component-root'
            id='/branch-permission-groups'>
            {createResult.loading && <div className='unfocus' />}
            <CarouselComponent
                ref={carouselRef}
                itemsToShow={(windowWidth >= 700 && windowWidth < 900) ? 2 : windowWidth < 700 ? 1 : 3}
                label={'Permissions'}
                onViewAllClicked={() => navigator('/branches/branch-permission-groups/' + props.id)}
                params={{ branchId: props.id, limit: 6, offset: 0 }}
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
            <SpaceComponent height={'20px'} />
            {role != null && ['master', 'sub-master'].includes(role) ?
                <div id='/branch-permission-group-create'>
                    <ButtonComponent label={'Create Permission Group'} icon={faPlus} onClick={() => {
                        navigator('/branches/branch-permission-group-create/' + props.id)
                    }} /></div> : <></>}
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
                        branchId={props.id} />
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

export default BranchPermissionGroupsComponent