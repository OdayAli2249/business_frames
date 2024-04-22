import React, { Fragment, useState, useRef, useEffect } from 'react';
import './create_service_provider_stepper_component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';
import CreateServiceProviderStep1 from './create_service_provider_steps/create_service_provider_step1';
import CreateServiceProviderStep2 from './create_service_provider_steps/create_service_provider_step2';
import CreateServiceProviderStep4 from './create_service_provider_steps/create_service_provider_step4';
import CreateServiceProviderStep3 from './create_service_provider_steps/create_service_provider_step3';
import { ServiceProviderModel } from '../../../../models/service_provider_model';
import { useSelector, useDispatch } from 'react-redux';
import createServiceProvidersReducer from '../../../../state_management/reducers/create_service_provider_reducer';
import { createServiceProvider, reset } from '../../../../state_management/middlewares/create_service_provider_middleware';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function CreateServiceProviderStepperComponent(props) {

    const navigator = useNavigate();
    let [serviceProvider, setServiceProvider] = useState({});
    let [currentStep, setCurrentStep] = useState(0);
    const childComponentRefs = useRef([]);
    const stepNumber = 2;

    const createResult = useSelector(state => state.createServiceProvider);
    const dispatch = useDispatch();

    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && navigator('/service-providers/service-providers-home/' + createResult.data.id)
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
        }
    }, [dispatch, createResult]);

    const next = (data) => {
        if (currentStep < stepNumber) {
            let newStep = currentStep + 1;
            var newServiceProvider = { ...serviceProvider, ...data }
            setServiceProvider(newServiceProvider)
            setCurrentStep(newStep);
        } else {
            let newStep = stepNumber + 1;
            var newServiceProvider = { ...serviceProvider, ...data }
            setServiceProvider(newServiceProvider)
            setCurrentStep(newStep);
            var serviceProviderModel = ServiceProviderModel.build(serviceProvider);
            dispatch(createServiceProvider({ serviceProvider: serviceProvider }));
        }
    };

    const back = () => {
        if (currentStep > 0) {
            let newStep = currentStep - 1;
            setCurrentStep(newStep);
        }
    };

    return (
        <div className='create-service-provider-stepper-component-root'
            style={props.height ?
                { height: props.height } : {}}>
            <ToastContainer position="top-center" autoClose={5000} />
            {createResult.loading ? <div className='unfocus' /> : null}
            <div className='create-service-provider-stepper-header'>
                {Array.from({ length: stepNumber }, (_, index) => index + 1).map((value, index) =>
                    <Fragment key={index}>
                        <FontAwesomeIcon
                            icon={currentStep > index ?
                                faCheck :
                                currentStep == index ? faCaretRight :
                                    faCircle}
                            className={currentStep > index ?
                                'create-service-provider-done-step-indicator' :
                                currentStep == index ? 'create-service-provider-active-step-indicator' :
                                    'create-service-provider-step-indicator'}>

                        </FontAwesomeIcon>
                        <div
                            className={currentStep - 1 > index ? 'create-service-provider-done-step-line' :
                                currentStep - 1 == index ? 'create-service-provider-active-step-line' :
                                    'create-service-provider-step-line'}
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
                                    'create-service-provider-done-step-indicator' :
                                    currentStep == stepNumber ?
                                        'create-service-provider-active-step-indicator' :
                                        'create-service-provider-step-indicator'}>

                            </FontAwesomeIcon> : <></>}
                    </Fragment>
                )}
            </div>
            <div className='create-service-provider-stepper-body'>
                <CreateServiceProviderStep1
                    style={currentStep == 0 ? {} : { display: 'none' }}
                    ref={el => (childComponentRefs.current[0] = el)}
                    next={next} />
                <CreateServiceProviderStep2
                    style={currentStep == 1 ? {} : { display: 'none' }}
                    ref=
                    {el => (childComponentRefs.current[1] = el)}
                    next={next} />
                <CreateServiceProviderStep3
                    style={currentStep > 1 ? {} : { display: 'none' }}
                    ref={el => (childComponentRefs.current[2] = el)}
                    next={next} />
                {/* <CreateServiceProviderStep4
                    style={currentStep > 1 ? {} : { display: 'none' }}
                    ref={el => (childComponentRefs.current[2] = el)}
                    next={next}
                /> */}
                <div className='create-service-provider-stepper-buttons-container'>
                    {currentStep != 0 ?
                        <div className='create-service-provider-back-button'
                            onClick={back}>
                            <h3>back</h3>
                        </div> : <></>
                    }
                    <div className='create-service-provider-next-button'
                        onClick={() => {
                            if (currentStep <= stepNumber)
                                childComponentRefs.current[currentStep].validate();
                        }}>
                        <h3 className='create-service-provider-next-button-label'>
                            {currentStep >= stepNumber ? 'submit' : 'next'}</h3>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CreateServiceProviderStepperComponent;