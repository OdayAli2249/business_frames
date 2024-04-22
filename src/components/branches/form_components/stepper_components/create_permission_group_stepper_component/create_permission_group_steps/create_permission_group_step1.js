import React, { useState, forwardRef } from 'react';
import './create_permission_group_step1_style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpaceComponent from '../../../../../core/space_component';
import { faEdit, faLock, faPlus, faTrash, faWarning } from '@fortawesome/free-solid-svg-icons';
import TextAreaControlComponent from '../../../../../core/form_components/controls/text_area_control_component';
import TextFieldControlComponent from '../../../../../core/form_components/controls/text_field_control_component';
import { Validations, Validator } from '../../../../../../helpers/validators';

const CreatePermissionGroupStep1 = forwardRef((props, ref) => {

    const operations = ['Add', 'Update', 'Delete'];
    const operationIcons = [faPlus, faEdit, faTrash];

    const [state, setState] = useState({
        name: props.permissionGroup ? props.permissionGroup.name : null,
        description: props.permissionGroup ? props.permissionGroup.description : null,
        selectedOperations: props.permissionGroup && props.permissionGroup.actions ? (() => {
            let initialSelectedOperations = [];
            if (props.permissionGroup.actions[0] == '1')
                initialSelectedOperations.push(operations[0])
            if (props.permissionGroup.actions[1] == '1')
                initialSelectedOperations.push(operations[1])
            if (props.permissionGroup.actions[2] == '1')
                initialSelectedOperations.push(operations[2])
            return initialSelectedOperations
        })() : []
    });
    const [errorMessages, setErrorMessages] = useState({
        nameErrorMessage: null,
        descriptionErrorMessage: null,
        selectedOperationsErrorMessage: null
    });
    const validate = () => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.nameErrorMessage = Validator.validate(state.name, [Validations.REQUIRED, Validations.NAME]);
        newErrorMessages.descriptionErrorMessage = Validator.validate(state.description, [Validations.NAME]);
        newErrorMessages.selectedOperationsErrorMessage = Validator.validate(state.selectedOperations, [Validations.REQUIRED]);
        let valid = newErrorMessages.nameErrorMessage == null &&
            newErrorMessages.descriptionErrorMessage == null &&
            newErrorMessages.selectedOperationsErrorMessage == null

        setErrorMessages(newErrorMessages);
        if (valid) {
            props.next({
                name: state.name,
                description: state.description,
                actions: (state.selectedOperations.includes(operations[0]) ? '1' : '0') +
                    (state.selectedOperations.includes(operations[1]) ? '1' : '0') +
                    (state.selectedOperations.includes(operations[2]) ? '1' : '0'),        // make sure the orders is correct
            })
        }
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='create-permission-group-step1-root' style={props.style}
            ref={ref}>
            <div className='step1-header-title-outer-row'>
                <div className='row-main-space-between-cross-center'>
                    <FontAwesomeIcon icon={faLock}
                        className='s-background-padding-w-background-color  secondary-icon-color-m-icon-size' />
                    <SpaceComponent width={'20px'} />
                    <h4 className='basic-m-text-size-l-text-weight'>
                        Permission Group Meta
                    </h4>
                </div>
            </div>
            <SpaceComponent height={'30px'} />
            <div className='create-permission-group-step1-content'>
                <TextFieldControlComponent
                    hint={'enter permission group name'}
                    label={'Name'}
                    type={'text'}
                    initialValue={props.permissionGroup ? props.permissionGroup.name : ''}
                    validator={() => { return 'done' }}
                    onChange={(value) => {
                        setState({ ...state, name: value })
                    }}
                    errorMessage={errorMessages.nameErrorMessage} />
                <SpaceComponent height={'10px'} />
                <TextAreaControlComponent
                    label={'Description'}
                    initialValue={props.permissionGroup ? props.permissionGroup.description : ''}
                    onChange={(value) => {
                        setState({ ...state, description: value })
                    }}
                    errorMessage={errorMessages.descriptionErrorMessage}
                    hint={'enter permission group description'}
                />
                <SpaceComponent height={'10px'} />
            </div>
            <SpaceComponent height={'10px'} />
            <div className='create-permission-group-step1-row'>
                {Array.from({ length: 3 }, (_, index) => index).map((index) =>
                    <h4 key={index} className={state.selectedOperations.includes(operations[index]) ? 'selected-create-permission-group-step1-text' :
                        'create-permission-group-step1-text'}
                        onClick={() => {
                            if (!state.selectedOperations.includes(operations[index])) {
                                let newSelectedOptions = [...state.selectedOperations, operations[index]];
                                setState({ ...state, selectedOperations: newSelectedOptions });
                            }
                            else {
                                let newSelectedOptions = [...state.selectedOperations];
                                let indexToRemove = state.selectedOperations.indexOf(operations[index]);
                                if (indexToRemove !== -1) {
                                    newSelectedOptions.splice(indexToRemove, 1);
                                }
                                setState({ ...state, selectedOperations: newSelectedOptions });
                            }
                        }}>
                        <FontAwesomeIcon icon={operationIcons[index]} />
                        <SpaceComponent width={'10px'} />
                        {operations[index]}
                    </h4>
                )
                }
            </div>
            <SpaceComponent height={'10px'} />
            <div className='text-area-control-error'>
                {state.selectedOperationsErrorMessage ?
                    <FontAwesomeIcon className='text-area-control-error-icon'
                        icon={faWarning} /> : <></>}
                <SpaceComponent width={'6px'} />
                <h4 className='text-area-control-error-text'>
                    {state.selectedOperationsErrorMessage}
                </h4>
            </div>
        </div>
    );
});

export default CreatePermissionGroupStep1;