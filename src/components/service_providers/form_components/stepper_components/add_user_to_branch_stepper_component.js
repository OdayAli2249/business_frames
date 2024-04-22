import React, { Fragment, useState, useRef, useEffect } from 'react';
import './add_user_to_branch_stepper_component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../../core/space_component';
import AddUserToBranchStep1 from './add_user_to_branch_steps/add_user_to_branch_step1';
import AddUserToBranchStep2 from './add_user_to_branch_steps/add_user_to_branch_step2';

function AddUserToBranchStepperComponent(props) {
    let [userBranchParamsState, setModifyUserBranchParamsState] = useState({
        users: props.members,
        operation: props.operation
    });
    let [currentStep, setCurrentStep] = useState(0);
    const childComponentRefs = useRef([]);
    const stepNumber = props.stepNumber;

    const next = (data) => {
        if (currentStep < stepNumber) {
            let newStep = currentStep + 1;
            var newUserBranchParamsState = { ...userBranchParamsState, ...data }
            setModifyUserBranchParamsState(newUserBranchParamsState)
            setCurrentStep(newStep);
        } else {
            // let newStep = stepNumber + 1;
            // setCurrentStep(newStep);
            var newUserBranchParamsState = { ...userBranchParamsState, ...data }
            setModifyUserBranchParamsState(newUserBranchParamsState)
            props.onSubmit(newUserBranchParamsState);
        }
    };

    const back = () => {
        if (currentStep > 0) {
            let newStep = currentStep - 1;
            setCurrentStep(newStep);
        }
    };

    return (
        <div className='add-user-to-branch-stepper-component-root'>
            <div className='add-user-to-branch-stepper-header'>
                {Array.from({ length: stepNumber }, (_, index) => index + 1).map((value, index) =>
                    <Fragment key={index}>
                        <FontAwesomeIcon
                            icon={currentStep > index ?
                                faCheck :
                                currentStep == index ? faCaretRight :
                                    faCircle}
                            className={currentStep > index ?
                                'add-user-to-branch-done-step-indicator' :
                                currentStep == index ? 'add-user-to-branch-active-step-indicator' :
                                    'add-user-to-branch-step-indicator'}>

                        </FontAwesomeIcon>
                        <div
                            className={currentStep - 1 > index ? 'add-user-to-branch-done-step-line' :
                                currentStep - 1 == index ? 'add-user-to-branch-active-step-line' :
                                    'add-user-to-branch-step-line'}
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
                                    'add-user-to-branch-done-step-indicator' :
                                    currentStep == stepNumber ?
                                        'add-user-to-branch-active-step-indicator' :
                                        'add-user-to-branch-step-indicator'}>

                            </FontAwesomeIcon> : <></>}
                    </Fragment>
                )}
            </div>
            <div className='add-user-to-branch-stepper-body'>

                <AddUserToBranchStep1
                    title='Select source branch'
                    selectionMod='single'
                    branchKey={'source'}
                    serviceProviderId={props.serviceProviderId}
                    style={currentStep == 0 ? {} : { display: 'none' }}
                    ref={el => (childComponentRefs.current[0] = el)}
                    next={next} />
                {stepNumber == 1 ?
                    <AddUserToBranchStep1
                        title='Select target branch'
                        selectionMod='single'
                        branchKey={'target'}
                        serviceProviderId={props.serviceProviderId}
                        style={currentStep == (stepNumber == 1 ? 1 : 0) ? {} : { display: 'none' }}
                        ref={el => (childComponentRefs.current[stepNumber == 1 ? 1 : 0] = el)}
                        next={next} /> : <></>}
                {/* <AddUserToBranchStep2
                    style={currentStep == (stepNumber == 2 ? 2 : 1) ? {} : { display: 'none' }}
                    ref=
                    {el => (childComponentRefs.current[stepNumber == 2 ? 2 : 1] = el)}
                    next={next} /> */}
                <div className='add-user-to-branch-stepper-buttons-container'>
                    {currentStep != 0 ?
                        <div className='add-user-to-branch-back-button'
                            onClick={back}>
                            <h3>back</h3>
                        </div> : <></>
                    }
                    {currentStep == 0 || (currentStep == 1 && stepNumber == 1) ? <SpaceComponent width='10px' /> : <></>}
                    {
                        currentStep == 0 || (currentStep == 1 && stepNumber == 1) ?
                            <div className='add-user-to-branch-next-button'
                                onClick={() => {
                                    if (currentStep <= stepNumber)
                                        childComponentRefs.current[currentStep].validate();
                                }}>
                                <h3 className='add-user-to-branch-next-button-label'>
                                    {currentStep >= stepNumber ? 'submit' : 'next'}</h3>
                            </div> : <></>
                    }
                </div>
            </div>
        </div >
    );
}

export default AddUserToBranchStepperComponent;