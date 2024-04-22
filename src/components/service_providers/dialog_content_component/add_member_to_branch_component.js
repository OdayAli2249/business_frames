import React from 'react';
import './add_member_to_branch_component.css';
import AddUserToBranchStepperComponent from '../form_components/stepper_components/add_user_to_branch_stepper_component';


function AddMemberToBranchComponent(props) {
    return (
        <div className='add-member-to-branch-root'>
            <AddUserToBranchStepperComponent headerPadding={95} stepNumber={props.stepNumber}
                onSubmit={props.onSubmit}
                operation={props.operation}
                serviceProviderId={props.serviceProviderId}
                members={props.members} />
        </div>
    );
}

export default AddMemberToBranchComponent;