import React, { useState, forwardRef } from 'react';
import './create_service_provider_step1.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../../../core/space_component';
import TextFieldControlComponent from '../../../../core/form_components/controls/text_field_control_component';
import TextAreaControlComponent from '../../../../core/form_components/controls/text_area_control_component';
import FilePickerControlComponent from '../../../../core/form_components/controls/file_picker_control_component';
import { Validations, Validator } from '../../../../../helpers/validators';

const CreateServiceProviderStep1 = forwardRef((props, ref) => {
    const [state, setState] = useState({
        name: null,
        target: null,
        address: null,
        summary: null,
        images: [null, null, null],
        logoUrl: null
    });
    const [errorMessages, setErrorMessages] = useState({
        nameErrorMessage: null,
        targetErrorMessage: null,
        addressErrorMessage: null,
        summaryErrorMessage: null
    });
    const validate = () => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.nameErrorMessage = Validator.validate(state.name, [Validations.REQUIRED]);
        newErrorMessages.targetErrorMessage = Validator.validate(state.target, [Validations.REQUIRED]);
        newErrorMessages.addressErrorMessage = Validator.validate(state.address, []);
        newErrorMessages.summaryErrorMessage = Validator.validate(state.summary, [Validations.REQUIRED]);
        let valid = newErrorMessages.nameErrorMessage == null &&
            newErrorMessages.targetErrorMessage == null &&
            newErrorMessages.addressErrorMessage == null &&
            newErrorMessages.summaryErrorMessage == null;
        setErrorMessages(newErrorMessages);
        if (valid) {
            props.next({
                name: state.name,
                target: state.target,
                mainAddress: state.address,
                summary: state.summary,
                images: state.images,
                logoUrl: state.logoUrl
            })
        }
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='create-service-provider-step1-root' style={props.style}
            ref={ref}>
            <div className='step1-section'>
                <div className='step1-header-title-outer-row'>
                    <div className='step1-header-title-row'>
                        <FontAwesomeIcon icon={faDatabase}
                            style={{
                                width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                borderRadius: '10px', padding: '10px'
                            }} />
                        <SpaceComponent width={'20px'} />
                        <h4 className='step1-header-title-text'>
                            Meta Data
                        </h4>
                    </div>
                </div>
                <SpaceComponent height={'20px'} />
                <div className='step1-container'>
                    <div className='step1-row'>
                        <div className='step1-left-column'>
                            <TextFieldControlComponent
                                hint={'enter name'}
                                label={'Name'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, name: value })
                                }}
                                errorMessage={errorMessages.nameErrorMessage} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                hint={'enter target'}
                                label={'Target'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, target: value })
                                }}
                                errorMessage={errorMessages.targetErrorMessage} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                hint={'enter adress'}
                                label={'Main Address'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, address: value })
                                }}
                                errorMessage={errorMessages.addressErrorMessage} />
                            <SpaceComponent height={'20px'} />
                            <TextAreaControlComponent
                                label={'Summary'}
                                initialValue={''}
                                onChange={(value) => {
                                    setState({ ...state, summary: value })
                                }}
                                maxLength={5000}
                                hint={'enter summary'}
                                errorMessage={errorMessages.summaryErrorMessage} />
                            <SpaceComponent height={'20px'} />
                        </div>
                        <div className='step1-right-column'>
                            <FilePickerControlComponent
                                label={'Upload logo'}
                                accept={'images'}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, logoUrl: value })
                                }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <FilePickerControlComponent
                                label={'Upload cover'}
                                accept={'images'}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                        </div>
                    </div>
                    <SpaceComponent height={'20px'} />
                    <h4 className='step1-header-title-text'>
                        Promotion Photos
                    </h4>
                    <SpaceComponent height={'10px'} />
                    <div className='step1-row'>
                        <FilePickerControlComponent
                            label={''}
                            accept={'images'}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var newImages = [...state.images]
                                newImages[0] = value;
                                setState({ ...state, images: newImages })
                            }}
                            errorMessage={''} />
                        <SpaceComponent height={'20px'} />
                        <FilePickerControlComponent
                            label={''}
                            accept={'images'}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var newImages = [...state.images]
                                newImages[1] = value;
                                setState({ ...state, images: newImages })
                            }}
                            errorMessage={''} />
                        <SpaceComponent height={'20px'} />
                        <FilePickerControlComponent
                            label={''}
                            accept={'images'}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var newImages = [...state.images]
                                newImages[2] = value;
                                setState({ ...state, images: newImages })
                            }}
                            errorMessage={''} />
                        <SpaceComponent height={'20px'} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CreateServiceProviderStep1;