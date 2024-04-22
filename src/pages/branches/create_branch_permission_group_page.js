import React, { useEffect } from 'react';
import './create_branch_permission_group_page.css'
import CreatePermissionGroupStepperComponent from '../../components/branches/form_components/stepper_components/create_permission_group_stepper_component/create_permission_group_stepper_component';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { modifyPermissionGroup, reset } from '../../state_management/middlewares/modify_permission_groups_middleware';
import { Operations } from '../../state_management/actions';
import { useNavigate, useParams } from 'react-router-dom';


function CraeteBranchPermissionGroupPage(props) {

    const createResult = useSelector(state => state.modifyPermissionGroup);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && navigator('/branches/branch-permission-groups/' + id)
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
            if (createResult.success)
                navigator('/branches/branch-permission-groups/' + id)
        }
    }, [dispatch, createResult]);

    return (
        <div className='create-branch-permission-group-root'>
            <ToastContainer position="top-center" autoClose={5000} />
            {createResult.loading && <div className='unfocus' />}
            <CreatePermissionGroupStepperComponent headerPadding={70} height={'700px'}
                onSubmit={(permissionGroupModel) => dispatch(modifyPermissionGroup({
                    branchId: id,
                    permissionGroup: permissionGroupModel,
                    operation: Operations.CREATE
                }))}
                branchId={id} />
        </div>
    );
}

export default CraeteBranchPermissionGroupPage