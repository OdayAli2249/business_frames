import React, { Fragment, useState, useRef, useEffect } from 'react';
import './create_permission_stepper.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';
import { PermissionGroupModel } from '../../../models/permission_group_model';
import CreatePermissionGroupStep1 from './create_permission_group_step1';
import CreatePermissionGroupStep2 from './create_permission_group_step2';
import CreatePermissionGroupStep3 from './create_permission_group_step3';
import CreatePermissionGroupStep4 from './create_permission_group_step4';

function CreatePermissionGroupStepperComponent(props) {

    let [permissionGroup, setPermissionGroup] = useState({
        permissionGroupId: props.permissionGroup ? props.permissionGroup.id : null
    });
    let [currentStep, setCurrentStep] = useState(0);
    const childComponentRefs = useRef([]);
    const stepNumber = 3;

    const next = (data) => {
        if (currentStep < stepNumber) {
            let newStep = currentStep + 1;
            var newPermissionGroup = { ...permissionGroup, ...data }
            setPermissionGroup(newPermissionGroup)
            setCurrentStep(newStep);
        } else {
            let newStep = stepNumber + 1;
            var newPermissionGroup = { ...permissionGroup, ...data }
            setPermissionGroup(newPermissionGroup)
            setCurrentStep(newStep);
            // var permissionGroupModel = PermissionGroupModel.build(permissionGroup);
            // dispatch(createPermissionGroup({ permissionGroup: permissionGroupModel }));
            props.onSubmit(PermissionGroupModel.build(newPermissionGroup));
        }
    };

    const back = () => {
        if (currentStep > 0) {
            let newStep = currentStep - 1;
            setCurrentStep(newStep);
        }
    };

    return (
        <div className='create-permission-group-stepper-component-root'
            style={props.height ?
                { height: props.height } : {}}>
            <div className='create-permission-group-stepper-header'>
                {Array.from({ length: stepNumber }, (_, index) => index + 1).map((value, index) =>
                    <Fragment key={index}>
                        <FontAwesomeIcon
                            icon={currentStep > index ?
                                faCheck :
                                currentStep == index ? faCaretRight :
                                    faCircle}
                            className={currentStep > index ?
                                'create-permission-group-done-step-indicator' :
                                currentStep == index ? 'create-permission-group-active-step-indicator' :
                                    'create-permission-group-step-indicator'}>

                        </FontAwesomeIcon>
                        <div
                            className={currentStep - 1 > index ? 'create-permission-group-done-step-line' :
                                currentStep - 1 == index ? 'create-permission-group-active-step-line' :
                                    'create-permission-group-step-line'}
                            style={{ width: (100 - props.headerPadding) / stepNumber + '%' }}>
                        </div>
                        {index == stepNumber - 1 ?
                            <FontAwesomeIcon
                                icon={currentStep == stepNumber + 1 ?
                                    faCheck :
                                    currentStep == stepNumber ?
                                        faCaretRight :
                                        faCircle}
                                className={currentStep == stepNumber + 1 ?
                                    'create-permission-group-done-step-indicator' :
                                    currentStep == stepNumber ?
                                        'create-permission-group-active-step-indicator' :
                                        'create-permission-group-step-indicator'}>

                            </FontAwesomeIcon> : <></>}
                    </Fragment>
                )}
            </div>
            <div className='create-permission-group-stepper-body'>
                <CreatePermissionGroupStep1
                    permissionGroup={props.permissionGroup}
                    style={currentStep == 0 ? {} : { display: 'none' }}
                    ref={el => (childComponentRefs.current[0] = el)}
                    next={next} />
                <CreatePermissionGroupStep2
                    branchId={props.branchId}
                    permissionGroup={props.permissionGroup}
                    style={currentStep == 1 ? {} : { display: 'none' }}
                    ref=
                    {el => (childComponentRefs.current[1] = el)}
                    next={next} />
                <CreatePermissionGroupStep3
                    branchId={props.branchId}
                    permissionGroup={props.permissionGroup}
                    style={currentStep == 2 ? {} : { display: 'none' }}
                    ref={el => (childComponentRefs.current[2] = el)}
                    next={next} />
                <CreatePermissionGroupStep4
                    style={currentStep > 2 ? {} : { display: 'none' }}
                    ref={el => (childComponentRefs.current[3] = el)}
                    next={next}
                />
                <div className='create-permission-group-stepper-buttons-container'>
                    {currentStep != 0 ?
                        <div className='create-permission-group-back-button'
                            onClick={back}>
                            <h3>back</h3>
                        </div> : <></>
                    }
                    <div className='create-permission-group-next-button'
                        onClick={() => {
                            if (currentStep <= stepNumber)
                                childComponentRefs.current[currentStep].validate();
                        }}>
                        <h3 className='create-permission-group-next-button-label'>
                            {currentStep >= stepNumber ? 'submit' : 'next'}</h3>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CreatePermissionGroupStepperComponent;