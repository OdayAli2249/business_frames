import React, { useState, forwardRef } from 'react';
import './create_service_provider_step2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercentage } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../../../core/space_component';
import TextFieldControlComponent from '../../../../core/form_components/controls/text_field_control_component';
import TextAreaControlComponent from '../../../../core/form_components/controls/text_area_control_component';
import { Validations, Validator } from '../../../../../helpers/validators';

const CreateServiceProviderStep2 = forwardRef((props, ref) => {
    const [state, setState] = useState({
        marketShare: null,
        competitives: null,
        marketPercentage: null,
        adultCustomers: null,
        minorCustomer: null,
        minorPercentage: null,
        skillWorkers: null,
        traineeEmployees: null,
        traineePercentage: null
    });
    const [errorMessages, setErrorMessages] = useState({
        marketShareErrorMessage: null,
        competitivesErrorMessage: null,
        marketPercentageErrorMessage: null,
        adultCustomersErrorMessage: null,
        minorCustomerErrorMessage: null,
        minorPercentageErrorMessage: null,
        skillWorkersErrorMessage: null,
        traineeEmployeesErrorMessage: null,
        traineePercentageErrorMessage: null
    });
    const validate = () => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.marketShareErrorMessage = Validator.validate(state.marketShare, [Validations.REQUIRED]);
        newErrorMessages.competitivesErrorMessage = Validator.validate(state.competitives, [Validations.REQUIRED]);
        newErrorMessages.marketPercentageErrorMessage = Validator.validate(state.marketPercentage, [Validations.REQUIRED, Validations.PERCENTAGE]);
        newErrorMessages.adultCustomersErrorMessage = Validator.validate(state.adultCustomers, [Validations.REQUIRED]);
        newErrorMessages.minorCustomerErrorMessage = Validator.validate(state.minorCustomer, [Validations.REQUIRED]);
        newErrorMessages.minorPercentageErrorMessage = Validator.validate(state.minorPercentage, [Validations.REQUIRED, Validations.PERCENTAGE]);
        newErrorMessages.skillWorkersErrorMessage = Validator.validate(state.skillWorkers, [Validations.REQUIRED]);
        newErrorMessages.traineeEmployeesErrorMessage = Validator.validate(state.traineeEmployees, [Validations.REQUIRED]);
        newErrorMessages.traineePercentageErrorMessage = Validator.validate(state.traineePercentage, [Validations.REQUIRED, Validations.PERCENTAGE]);
        let valid = newErrorMessages.marketShareErrorMessage == null &&
            newErrorMessages.competitivesErrorMessage == null &&
            newErrorMessages.marketPercentageErrorMessage == null &&
            newErrorMessages.adultCustomersErrorMessage == null &&
            newErrorMessages.minorCustomerErrorMessage == null &&
            newErrorMessages.minorPercentageErrorMessage == null &&
            newErrorMessages.skillWorkersErrorMessage == null &&
            newErrorMessages.traineeEmployeesErrorMessage == null &&
            newErrorMessages.traineePercentageErrorMessage == null
        setErrorMessages(newErrorMessages);
        if (valid) {
            props.next({
                marketShare: state.marketShare,
                competitives: state.competitives,
                marketPercentage: state.marketPercentage,
                adultCustomers: state.adultCustomers,
                minorCustomers: state.minorCustomer,
                minorPercentage: state.minorPercentage,
                skillWorkers: state.skillWorkers,
                traineeEmployees: state.traineeEmployees,
                traineePercentage: state.traineePercentage
            })
        }
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='create-service-provider-step2-root'
            style={props.style}
            ref={ref}>
            <div className='step2-section'>
                <div className='step2-header-title-outer-row'>
                    <div className='step2-header-title-row'>
                        <FontAwesomeIcon icon={faPercentage}
                            style={{
                                width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                borderRadius: '10px', padding: '10px'
                            }} />
                        <SpaceComponent width={'20px'} />
                        <h4 className='step2-header-title-text'>
                            Statistical Info
                        </h4>
                    </div>
                </div>
                <SpaceComponent height={'20px'} />
                <div className='step2-container'>
                    <div className='step2-row'>
                        <div className='step1-left-column'>
                            <TextAreaControlComponent
                                label={'About market share'}
                                initialValue={''}
                                // height = {'200px'}
                                // maxLength = {50}
                                onChange={(value) => {
                                    setState({ ...state, marketShare: value })
                                }}
                                errorMessage={errorMessages.marketShareErrorMessage}
                                hint={'enter market occupation'} />
                            <SpaceComponent height={'20px'} />
                            <TextAreaControlComponent
                                label={'About competitives'}
                                initialValue={''}
                                onChange={(value) => {
                                    setState({ ...state, competitives: value })
                                }}
                                errorMessage={errorMessages.competitivesErrorMessage}
                                hint={'enter competitives info'} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                hint={'percentage'}
                                label={'Market percentage'}
                                type={'number'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, marketPercentage: value })
                                }}
                                errorMessage={errorMessages.marketPercentageErrorMessage} />
                            <SpaceComponent height={'20px'} />
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                                <SpaceComponent height={'2px'}
                                    width={'94%'}
                                    color={'rgb(220,220,220'} />
                            </div>
                            <SpaceComponent height={'20px'} />
                            <TextAreaControlComponent
                                label={'About Adult Customers'}
                                initialValue={''}
                                onChange={(value) => {
                                    setState({ ...state, adultCustomers: value })
                                }}
                                errorMessage={errorMessages.adultCustomersErrorMessage}
                                hint={'enter adult customers info'} />
                            <SpaceComponent height={'20px'} />
                            <TextAreaControlComponent
                                label={'About Minor Customers'}
                                initialValue={''}
                                onChange={(value) => {
                                    setState({ ...state, minorCustomer: value })
                                }}
                                errorMessage={errorMessages.minorCustomerErrorMessage}
                                hint={'enter minor customers info'} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                hint={'enter percentage'}
                                label={'Minor Percentage'}
                                type={'number'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, minorPercentage: value })
                                }}
                                errorMessage={errorMessages.minorPercentageErrorMessage} />
                        </div>
                        <div className='step1-right-column'>
                            <TextAreaControlComponent
                                label={'About Skill Workers'}
                                initialValue={''}
                                onChange={(value) => {
                                    setState({ ...state, skillWorkers: value })
                                }}
                                errorMessage={errorMessages.skillWorkersErrorMessage}
                                hint={'enter skill workers info'} />
                            <SpaceComponent height={'20px'} />
                            <TextAreaControlComponent
                                label={'About Trainee Employees'}
                                initialValue={''}
                                onChange={(value) => {
                                    setState({ ...state, traineeEmployees: value })
                                }}
                                errorMessage={errorMessages.traineeEmployeesErrorMessage}
                                hint={'enter trainee employees info'} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                hint={'enter percentage'}
                                label={'Percentage'}
                                type={'number'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, traineePercentage: value })
                                }}
                                errorMessage={errorMessages.traineePercentageErrorMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CreateServiceProviderStep2;