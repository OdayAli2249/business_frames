import React, { useEffect, useState } from 'react';
import './create_job_offer_form_component.css';
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import DropDownMenuControlComponent from '../../core/form_components/controls/drop_down_menu_control_component';
import TextAreaControlComponent from '../../core/form_components/controls/text_area_control_component';
import { Validations, Validator } from '../../../helpers/validators';
import { JobOfferModel } from '../../../models/job_offer_model';

function CreateJobOfferFormComponent(props) {

    const [state, setState] = useState({
        experience: null,
        jobType: null,
        location: null,
        qualification: null,
        responsibilities: null,
        skills: null,
        benefits: null,
        workingHours: null,
        companyActivities: null,
    });
    const [errorMessages, setErrorMessages] = useState({
        experienceErrorMessage: null,
        jobTypeErrorMessage: null,
        locationErrorMessage: null,
        qualificationErrorMessage: null,
        responsibilitiesErrorMessage: null,
        skillsErrorMessage: null,
        benefitsErrorMessage: null,
        workingHoursErrorMessage: null,
        companyActivitiesErrorMessage: null,
    });
    const validate = (callBack) => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.experienceErrorMessage = Validator.validate(state.experience, [Validations.REQUIRED]);
        newErrorMessages.jobTypeErrorMessage = Validator.validate(state.jobType, [Validations.REQUIRED]);
        newErrorMessages.locationErrorMessage = Validator.validate(state.location, [Validations.REQUIRED]);
        newErrorMessages.qualificationErrorMessage = Validator.validate(state.qualification, [Validations.REQUIRED]);
        newErrorMessages.responsibilitiesErrorMessage = Validator.validate(state.responsibilities, [Validations.REQUIRED]);
        newErrorMessages.skillsErrorMessage = Validator.validate(state.skills, [Validations.REQUIRED]);
        newErrorMessages.benefitsErrorMessage = Validator.validate(state.benefits, []);
        newErrorMessages.workingHoursErrorMessage = Validator.validate(state.workingHours, [Validations.NAME]);
        newErrorMessages.companyActivitiesErrorMessage = Validator.validate(state.companyActivities, [Validations.NAME]);

        let valid = newErrorMessages.experienceErrorMessage == null &&
            newErrorMessages.jobTypeErrorMessage == null &&
            newErrorMessages.locationErrorMessage == null &&
            newErrorMessages.qualificationErrorMessage == null &&
            newErrorMessages.responsibilitiesErrorMessage == null &&
            newErrorMessages.skillsErrorMessage == null &&
            newErrorMessages.benefitsErrorMessage == null &&
            newErrorMessages.workingHoursErrorMessage == null &&
            newErrorMessages.companyActivitiesErrorMessage == null

        setErrorMessages(newErrorMessages);
        if (valid)
            callBack();

    };

    return (
        <div className='crete-job-offer-form-component-root'>
            <h4 className='crete-job-offer-form-header-title-text'>
                Create Job Offer
            </h4>
            <div className='crete-job-offer-form-container'>
                <div className='crete-job-offer-form-row'>
                    <div className='crete-job-offer-form-column'>
                        <FontAwesomeIcon icon={faPencilAlt}
                            style={{
                                width: '60px', height: '60px', backgroundColor: 'rgb(200,200,200)',
                                borderRadius: '50px', padding: '20px'
                            }} />
                        <SpaceComponent height={'20px'} />
                        <DropDownMenuControlComponent
                            options={['none', '1 year', '1-2 years', '2-3 years', '3-4 years', '4-5 years', '+5 years']}
                            initialValue={'none'}
                            onChange={(value) => {
                                setState({ ...state, experience: value })
                            }}
                            errorMessage={errorMessages.experienceErrorMessage}
                            label={'Experience'} />
                        <SpaceComponent height={'10px'} />
                        <DropDownMenuControlComponent
                            options={['none', 'Full Time', 'Part Time', 'By task']}
                            initialValue={'none'}
                            onChange={(value) => {
                                setState({ ...state, jobType: value })
                            }}
                            errorMessage={errorMessages.jobTypeErrorMessage}
                            label={'Job Type'} />
                        <SpaceComponent height={'10px'} />
                        <DropDownMenuControlComponent
                            options={['none', 'Work from Office', 'Work from Home (remote)', 'Both']}
                            initialValue={'none'}
                            onChange={(value) => {
                                setState({ ...state, location: value })
                            }}
                            errorMessage={errorMessages.locationErrorMessage}
                            label={'Job Location'} />
                        <SpaceComponent height={'10px'} />
                        <TextAreaControlComponent
                            label={'Qualification'}
                            initialValue={''}
                            onChange={(value) => {
                                setState({ ...state, qualification: value })
                            }}
                            errorMessage={errorMessages.qualificationErrorMessage}
                            hint={'enter qualification'}
                        />
                        <SpaceComponent height={'10px'} />
                        <TextAreaControlComponent
                            label={'Roles and Responsibilities'}
                            initialValue={''}
                            onChange={(value) => {
                                setState({ ...state, responsibilities: value })
                            }}
                            errorMessage={errorMessages.responsibilitiesErrorMessage}
                            hint={'enter roles and responsibilities'}
                        />
                        <SpaceComponent height={'10px'} />
                        <TextAreaControlComponent
                            label={'Skills Required'}
                            initialValue={''}
                            onChange={(value) => {
                                setState({ ...state, skills: value })
                            }}
                            errorMessage={errorMessages.skillsErrorMessage}
                            hint={'enter skills required'}
                        />
                        <SpaceComponent height={'10px'} />
                        <TextAreaControlComponent
                            label={'Employee Benefits'}
                            initialValue={''}
                            onChange={(value) => {
                                setState({ ...state, benefits: value })
                            }}
                            errorMessage={errorMessages.benefitsErrorMessage}
                            hint={'enter employee benefits'}
                        />
                        <SpaceComponent height={'10px'} />
                        <TextAreaControlComponent
                            label={'Working Hours'}
                            initialValue={''}
                            onChange={(value) => {
                                setState({ ...state, workingHours: value })
                            }}
                            errorMessage={errorMessages.workingHoursErrorMessage}
                            hint={'enter working hours'}
                        />
                        <SpaceComponent height={'10px'} />
                        <TextAreaControlComponent
                            label={'Company Activities'}
                            initialValue={''}
                            onChange={(value) => {
                                setState({ ...state, companyActivities: value })
                            }}
                            errorMessage={errorMessages.companyActivitiesErrorMessage}
                            hint={'enter company activities'}
                        />
                        <SpaceComponent height={'10px'} />
                    </div>
                    <div className='crete-job-offer-form-button-section'>
                        <div className='crete-job-offer-form-button' onClick={() => {
                            validate(() => {
                                props.onSubmit(JobOfferModel.build(state));
                            })
                        }}>
                            <h4 className='crete-job-offer-form-samll-text'
                                style={{ fontSize: '16px' }}>Create</h4>
                            <SpaceComponent width={'15px'} />
                            <FontAwesomeIcon className='crete-job-offer-form-button-icon'
                                icon={faPencilAlt} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateJobOfferFormComponent;