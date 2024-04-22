import React, { useEffect, useState } from 'react';
import './apply_for_job_form_component.css';
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFileAlt, faPaperPlane, faSave } from '@fortawesome/free-solid-svg-icons';
import FilePickerControlComponent from '../../core/form_components/controls/file_picker_control_component';
import TextAreaControlComponent from '../../core/form_components/controls/text_area_control_component';
import TextFieldControlComponent from '../../core/form_components/controls/text_field_control_component';
import { Validations, Validator } from '../../../helpers/validators';
import { HiringRequestModel } from '../../../models/hiring_request_model';

function ApplyForJobFormComponent(props) {

    const [state, setState] = useState({
        firstName: null,
        lastName: null,
        email: null,
        address: null,
        education: null,
        workExperience: null,
        coverLetter: null,
        cvUrl: null,
        certificateUrl: null,
    });
    const [errorMessages, setErrorMessages] = useState({
        firstNameErrorMessage: null,
        lastNameErrorMessage: null,
        emailErrorMessage: null,
        addressErrorMessage: null,
        educationErrorMessage: null,
        workExperienceErrorMessage: null,
        coverLetterErrorMessage: null,
        cvUrlErrorMessage: null,
        certificateUrlErrorMessage: null,
    });
    const validate = (callBack) => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.firstNameErrorMessage = Validator.validate(state.firstName, [Validations.NAME]);
        newErrorMessages.lastNameErrorMessage = Validator.validate(state.lastName, [Validations.NAME]);
        newErrorMessages.emailErrorMessage = Validator.validate(state.email, []);
        newErrorMessages.addressErrorMessage = Validator.validate(state.address, [Validations.NAME]);
        newErrorMessages.educationErrorMessage = Validator.validate(state.education, []);
        newErrorMessages.workExperienceErrorMessage = Validator.validate(state.workExperience, []);
        newErrorMessages.coverLetterErrorMessage = Validator.validate(state.coverLetter, []);
        newErrorMessages.cvUrlErrorMessage = Validator.validate(state.cvUrl, []);
        newErrorMessages.certificateUrlErrorMessage = Validator.validate(state.certificateUrl, []);

        let valid = newErrorMessages.firstNameErrorMessage == null &&
            newErrorMessages.lastNameErrorMessage == null &&
            newErrorMessages.emailErrorMessage == null &&
            newErrorMessages.addressErrorMessage == null &&
            newErrorMessages.educationErrorMessage == null &&
            newErrorMessages.workExperienceErrorMessage == null &&
            newErrorMessages.coverLetterErrorMessage == null &&
            newErrorMessages.cvUrlErrorMessage == null &&
            newErrorMessages.certificateUrlErrorMessage == null

        setErrorMessages(newErrorMessages);
        if (valid)
            callBack();

    };

    return (
        <div className='apply-for-job-form-component-root'>
            <h4 className='job-offer-header-title-text'>
                Create Job Application
            </h4>
            <div className='apply-for-job-form-container'>
                <div className='apply-for-job-form-row'>
                    <div className='apply-for-job-form-column'>
                        <FontAwesomeIcon icon={faFileAlt}
                            style={{
                                width: '60px', height: '60px', backgroundColor: 'rgb(200,200,200)',
                                borderRadius: '50px', padding: '20px'
                            }} />
                        <SpaceComponent height={'20px'} />
                        <div className='apply-for-job-row'>
                            <TextFieldControlComponent
                                style={{ flex: 1 }}
                                hint={'enter your first name'}
                                label={'First name'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, firstName: value })
                                }}
                                errorMessage={errorMessages.firstNameErrorMessage} />
                            <SpaceComponent width={'28px'} />
                            <TextFieldControlComponent
                                style={{ flex: 1 }}
                                hint={'enter your last name'}
                                label={'Last name'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, lastName: value })
                                }}
                                errorMessage={errorMessages.lastNameErrorMessage} />
                        </div>
                        <SpaceComponent height={'10px'} />
                        <TextFieldControlComponent
                            icon={faEnvelope}
                            hint={'enter your email'}
                            label={'email'}
                            type={'text'}
                            initialValue={''}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                setState({ ...state, email: value })
                            }}
                            errorMessage={errorMessages.emailErrorMessage} />
                        <SpaceComponent height={'10px'} />
                        <TextFieldControlComponent
                            icon={faEnvelope}
                            hint={'enter your address'}
                            label={'Address'}
                            type={'text'}
                            initialValue={''}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                setState({ ...state, address: value })
                            }}
                            errorMessage={errorMessages.addressErrorMessage} />
                        <SpaceComponent height={'10px'} />
                        <TextAreaControlComponent
                            label={'Education'}
                            initialValue={''}
                            onChange={(value) => {
                                setState({ ...state, education: value })
                            }}
                            errorMessage={errorMessages.educationErrorMessage}
                            hint={'enter your education'}
                        />
                        <SpaceComponent height={'10px'} />
                        <TextAreaControlComponent
                            label={'Work Experience'}
                            initialValue={''}
                            onChange={(value) => {
                                setState({ ...state, workExperience: value })
                            }}
                            errorMessage={errorMessages.workExperienceErrorMessage}
                            hint={''}
                        />
                        <SpaceComponent height={'10px'} />
                        <TextAreaControlComponent
                            label={'Cover Letter'}
                            initialValue={''}
                            onChange={(value) => {
                                setState({ ...state, coverLetter: value })
                            }}
                            errorMessage={errorMessages.coverLetterErrorMessage}
                            hint={''}
                        />
                        <SpaceComponent height={'10px'} />
                        <div className='apply-for-job-row'>
                            <FilePickerControlComponent
                                label={'Upload yuor CV'}
                                accept={'pdf'}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, certificateUrl: value })
                                }}
                                errorMessage={errorMessages.certificateUrlErrorMessage} />
                            <SpaceComponent height={'20px'} />
                            <FilePickerControlComponent
                                label={'Upload your Certificate'}
                                accept={'images'}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, cvUrl: value })
                                }}
                                errorMessage={errorMessages.cvUrlErrorMessage} />
                            <SpaceComponent height={'20px'} />
                        </div>
                    </div>
                    <div className='apply-for-job-form-button-section'>
                        <div className='apply-for-job-form-button' onClick={() => {
                            validate(() => {
                                props.onSubmit(HiringRequestModel.build(state));
                            })
                        }}>
                            <h4 className='apply-for-job-form-samll-text'
                                style={{ fontSize: '16px' }}>Send</h4>
                            <SpaceComponent width={'15px'} />
                            <FontAwesomeIcon className='apply-for-job-form-button-icon'
                                icon={faPaperPlane} />
                        </div>
                        <SpaceComponent height={'35px'} />
                        <div className='apply-for-job-form-button'>
                            <h4 className='apply-for-job-form-samll-text'
                                style={{ fontSize: '16px' }}>Save</h4>
                            <SpaceComponent width={'15px'} />
                            <FontAwesomeIcon className='apply-for-job-form-button-icon'
                                icon={faSave} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplyForJobFormComponent;