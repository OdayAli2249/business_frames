import React, { useEffect, useState } from 'react';
import './update_my_profile_page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faBriefcase, faCity, faEdit, faEnvelope, faFlag, faGraduationCap, faHand, faHandsHelping, faMapMarkedAlt, faMapMarker, faPhone, faSave, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../components/core/space_component';
import TextFieldControlComponent from '../../components/core/form_components/controls/text_field_control_component';
import DropDownMenuControlComponent from '../../components/core/form_components/controls/drop_down_menu_control_component';
import TextAreaControlComponent from '../../components/core/form_components/controls/text_area_control_component';
import FilePickerControlComponent from '../../components/core/form_components/controls/file_picker_control_component';
import { useDispatch, useSelector } from 'react-redux';
import { Validations, Validator } from '../../helpers/validators';
import { UserModel } from '../../models/user_model';
import { ToastContainer, toast } from 'react-toastify';
import { updateUser } from '../../state_management/middlewares/update_user_middleware';
import { reset } from '../../state_management/middlewares/update_user_middleware';
import { useParams } from 'react-router-dom';


function UpdateMyProfilePage(props) {

    const [showPersonalInfo, setShowPersonalInfo] = useState(true);
    const [showContact, setShowContact] = useState(true);
    const [showAbout, setShowAbout] = useState(true);

    const createResult = useSelector(state => state.updateUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            })
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
        }
    }, [dispatch, createResult]);

    const [personalInfoState, setPersonalInfoState] = useState({
        firstName: null,
        lastName: null,
        gender: null,
        profession: null,
        age: null,
        university: null,
        education: null,
        profilePictureUrl: null,
        coverUrl: null
    });
    const [personalInfoErrorMessages, setPersonalInfoErrorMessages] = useState({
        firstNameErrorMessage: null,
        lastNameErrorMessage: null,
        professionErrorMessage: null,
        universityErrorMessage: null,
        educationErrorMessage: null,
    });
    const validatePersonalInfo = (callBack) => {
        var newErrorMessages = { ...personalInfoErrorMessages }
        newErrorMessages.firstNameErrorMessage = Validator.validate(personalInfoState.firstName, [Validations.NAME]);
        newErrorMessages.lastNameErrorMessage = Validator.validate(personalInfoState.lastName, [Validations.NAME]);
        newErrorMessages.professionErrorMessage = Validator.validate(personalInfoState.profession, [Validations.NAME]);
        newErrorMessages.universityErrorMessage = Validator.validate(personalInfoState.university, [Validations.NAME]);
        newErrorMessages.educationErrorMessage = Validator.validate(personalInfoState.education, [Validations.NAME]);

        let valid = newErrorMessages.firstNameErrorMessage == null &&
            newErrorMessages.lastNameErrorMessage == null &&
            newErrorMessages.professionErrorMessage == null &&
            newErrorMessages.universityErrorMessage == null &&
            newErrorMessages.educationErrorMessage == null

        setPersonalInfoErrorMessages(newErrorMessages);
        if (valid)
            callBack();

    };

    const [contactState, setContactState] = useState({});
    const [contactErrorMessages, setContactErrorMessages] = useState({
        emailErrorMessage: null,
        phoneErrorMessage: null,
        countryErrorMessage: null,
        cityErrorMessage: null,
        addressErrorMessage: null
    });
    const validateContact = (callBack) => {
        var newErrorMessages = { ...contactErrorMessages }
        newErrorMessages.emailErrorMessage = Validator.validate(contactState.email, [/* email validator */]);
        newErrorMessages.phoneErrorMessage = Validator.validate(contactState.phone, [/* phone number validator: 7 numbers */]);
        newErrorMessages.countryErrorMessage = Validator.validate(contactState.country, [Validations.NAME]);
        newErrorMessages.cityErrorMessage = Validator.validate(contactState.city, [Validations.NAME]);
        newErrorMessages.addressErrorMessage = Validator.validate(contactState.address, []);

        let valid = newErrorMessages.emailErrorMessage == null &&
            newErrorMessages.phoneErrorMessage == null &&
            newErrorMessages.countryErrorMessage == null &&
            newErrorMessages.cityErrorMessage == null &&
            newErrorMessages.addressErrorMessage == null

        setContactErrorMessages(newErrorMessages);
        if (valid)
            callBack();

    };

    const [aboutState, setAboutState] = useState({});
    const [aboutErrorMessages, setAboutErrorMessages] = useState({
        experienceErrorMessages: null,
        professionErrorMessages: null,
        companiesErrorMessages: null,
        skillsErrorMessages: null,
        jobTypeErrorMessages: null,
        responsebilitiesErrorMessages: null,
    });
    const validateAbout = (callBack) => {
        var newErrorMessages = { ...aboutErrorMessages }
        newErrorMessages.experienceErrorMessages = Validator.validate(aboutState.experience, [Validations.NAME]);
        newErrorMessages.professionErrorMessages = Validator.validate(aboutState.profession, [Validations.NAME]);
        newErrorMessages.companiesErrorMessages = Validator.validate(aboutState.companies, [Validations.NAME]);
        newErrorMessages.skillsErrorMessages = Validator.validate(aboutState.skills, []);
        newErrorMessages.jobTypeErrorMessages = Validator.validate(aboutState.jobType, [Validations.NAME]);
        newErrorMessages.responsebilitiesErrorMessages = Validator.validate(aboutState.responsebilities, []);

        let valid = newErrorMessages.experienceErrorMessages == null &&
            newErrorMessages.professionErrorMessages == null &&
            newErrorMessages.companiesErrorMessages == null &&
            newErrorMessages.skillsErrorMessages == null &&
            newErrorMessages.jobTypeErrorMessages == null &&
            newErrorMessages.responsebilitiesErrorMessages == null

        setAboutErrorMessages(newErrorMessages);
        if (valid)
            callBack();

    };

    const user = useSelector(state => state.user);
    const { id } = useParams();

    return (
        <div className='update-my-profile-root'
            id='/members-home'>
            <ToastContainer position="top-center" autoClose={5000} />
            {createResult.loading && <div className='unfocus' />}
            {user.data && user.data.item && user.data.item.id == id ? <>
                <div className='members-home-details-section'>
                    <div className='members-home-header-title-outer-row'>
                        <div className='members-home-header-title-row'>
                            <FontAwesomeIcon icon={faUser}
                                style={{
                                    width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                    borderRadius: '10px', padding: '10px'
                                }} />
                            <SpaceComponent width={'20px'} />
                            <h4 className='members-home-header-title-text'>
                                Personal Info
                            </h4>
                        </div>
                        <FontAwesomeIcon icon={showPersonalInfo ? faAngleUp : faAngleDown}
                            onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                            className='members-home-detail-expand' />
                    </div>
                    <SpaceComponent height={'20px'} />
                    <div className='members-home-details-container'
                        style={{ display: showPersonalInfo ? null : 'none' }}>
                        <div className='members-update-details-row'>
                            <div className='members-update-details-left-column'>
                                <div className='user-name-row'>
                                    <TextFieldControlComponent
                                        style={{ flex: 1 }}
                                        hint={'enter your first name'}
                                        label={'First name'}
                                        type={'text'}
                                        initialValue={user.data.item.firstName ? user.data.item.firstName : null}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setPersonalInfoState({ ...personalInfoState, firstName: value })
                                        }}
                                        errorMessage={personalInfoErrorMessages.firstNameErrorMessage} />
                                    <SpaceComponent width={'28px'} />
                                    <TextFieldControlComponent
                                        style={{ flex: 1 }}
                                        hint={'enter your last name'}
                                        label={'Last name'}
                                        type={'text'}
                                        initialValue={user.data.item.lastName ? user.data.item.lastName : null}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setPersonalInfoState({ ...personalInfoState, lastName: value })
                                        }}
                                        errorMessage={personalInfoErrorMessages.lastNameErrorMessage} />
                                </div>
                                <SpaceComponent height={'20px'} />
                                <DropDownMenuControlComponent
                                    options={['none', 'male', 'female']}
                                    initialValue={'none'}
                                    onChange={(value) => {
                                        setPersonalInfoState({ ...personalInfoState, gender: value })
                                    }}
                                    label={'Gender'} />
                                <SpaceComponent height={'20px'} />
                                <TextFieldControlComponent
                                    icon={faBriefcase}
                                    hint={'enter your profession'}
                                    label={'Profession'}
                                    type={'text'}
                                    initialValue={user.data.item.profession ? user.data.item.profession : null}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setPersonalInfoState({ ...personalInfoState, profession: value })
                                    }}
                                    errorMessage={personalInfoErrorMessages.professionErrorMessage} />
                                <SpaceComponent height={'20px'} />
                            </div>
                            <div className='members-update-details-right-column'>
                                <TextFieldControlComponent
                                    style={{ flex: 1 }}
                                    hint={''}
                                    label={'Date of Birth'}
                                    type={'date'}
                                    initialValue={''}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setPersonalInfoState({ ...personalInfoState, age: value })
                                    }} />
                                <SpaceComponent height={'20px'} />
                                <TextFieldControlComponent
                                    icon={faUniversity}
                                    hint={'enter your university'}
                                    label={'University'}
                                    type={'text'}
                                    initialValue={user.data.item.university ? user.data.item.university : null}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setPersonalInfoState({ ...personalInfoState, university: value })
                                    }}
                                    errorMessage={personalInfoErrorMessages.universityErrorMessage} />
                                <SpaceComponent height={'20px'} />
                                <TextFieldControlComponent
                                    icon={faGraduationCap}
                                    hint={'enter your Colledge'}
                                    label={'College'}
                                    type={'text'}
                                    initialValue={user.data.item.education ? user.data.item.education : null}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setPersonalInfoState({ ...personalInfoState, education: value })
                                    }}
                                    errorMessage={personalInfoErrorMessages.educationErrorMessage} />
                                <SpaceComponent height={'20px'} />
                            </div>
                        </div>
                    </div>
                    {showPersonalInfo ?
                        <div className='user-name-row'>
                            <FilePickerControlComponent
                                label={'upload profile picture'}
                                accept={'images'}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setPersonalInfoState({ ...personalInfoState, profilePictureUrl: value })
                                }} />
                            <SpaceComponent width={'20px'} />
                            <FilePickerControlComponent
                                label={'upload cover picture'}
                                accept={'images'}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setPersonalInfoState({ ...personalInfoState, coverUrl: value })
                                }} />
                        </div> : <></>}
                    {showPersonalInfo ? <div className='members-home-button-row'>
                        <div className='members-home-button'
                            onClick={() => {
                                validatePersonalInfo(() => {
                                    dispatch(updateUser({ user: personalInfoState, asFormData: true }));
                                })
                            }}>
                            <FontAwesomeIcon icon={faSave} />
                            <SpaceComponent width={'10px'} />
                            Save
                        </div>
                    </div> : <></>}
                </div>
                <SpaceComponent height={'20px'} />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <SpaceComponent height={'2px'}
                        width={'93%'}
                        color={'rgb(220,220,220'} />
                </div>
                <SpaceComponent height={'20px'} />
                <div className='members-home-details-section'>
                    <div className='members-home-header-title-outer-row'>
                        <div className='members-home-header-title-row'>
                            <FontAwesomeIcon icon={faPhone}
                                style={{
                                    width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                    borderRadius: '10px', padding: '10px'
                                }} />
                            <SpaceComponent width={'20px'} />
                            <h4 className='members-home-header-title-text'>
                                Contact
                            </h4>
                        </div>
                        <FontAwesomeIcon icon={showContact ? faAngleUp : faAngleDown}
                            onClick={() => setShowContact(!showContact)}
                            className='members-home-detail-expand' />
                    </div>
                    <SpaceComponent height={'20px'} />
                    <div className='members-home-details-container'
                        style={{ display: showContact ? null : 'none' }}>
                        <div className='members-update-details-row'>
                            <div className='members-update-details-left-column'>
                                <TextFieldControlComponent
                                    hint={'enter your email'}
                                    label={'E-mail'}
                                    type={'text'}
                                    initialValue={user.data.item.email ? user.data.item.email : null}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setContactState({ ...contactState, email: value })
                                    }}
                                    errorMessage={contactErrorMessages.emailErrorMessage} />
                                <SpaceComponent height={'20px'} />
                                <div className='user-name-row'>
                                    <TextFieldControlComponent
                                        style={{ flex: 1 }}
                                        hint={'code'}
                                        label={'Code'}
                                        type={'number'}
                                        initialValue={''}
                                        validator={() => { return 'done' }}
                                        onChange={() => { }}
                                        errorMessage={''} />
                                    <SpaceComponent width={'28px'} />
                                    <TextFieldControlComponent
                                        style={{ flex: 4 }}
                                        hint={'enter phone number'}
                                        label={'Phone'}
                                        type={'number'}
                                        initialValue={''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setContactState({ ...contactState, phone: value })
                                        }}
                                        errorMessage={contactErrorMessages.phoneErrorMessage} />
                                </div>
                                <SpaceComponent height={'20px'} />
                                <TextFieldControlComponent
                                    icon={faBriefcase}
                                    hint={'enter linkedin URL'}
                                    label={'Linkedin'}
                                    type={'url'}
                                    initialValue={user.data.item.linkedin ? user.data.item.linkedin : null}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setContactState({ ...contactState, linkedin: value })
                                    }} />
                                <SpaceComponent height={'20px'} />
                            </div>
                            <div className='members-update-details-right-column'>
                                <TextFieldControlComponent
                                    style={{ flex: 1 }}
                                    icon={faFlag}
                                    hint={'enter you country'}
                                    label={'Country'}
                                    type={'text'}
                                    initialValue={user.data.item.country ? user.data.item.country : null}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setContactState({ ...contactState, country: value })
                                    }}
                                    errorMessage={contactErrorMessages.countryErrorMessage} />
                                <SpaceComponent height={'20px'} />
                                <TextFieldControlComponent
                                    icon={faCity}
                                    hint={'enter you city'}
                                    label={'City'}
                                    type={'text'}
                                    initialValue={user.data.item.city ? user.data.item.city : null}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setContactState({ ...contactState, city: value })
                                    }}
                                    errorMessage={contactErrorMessages.cityErrorMessage} />
                                <SpaceComponent height={'20px'} />
                                <TextFieldControlComponent
                                    icon={faMapMarker}
                                    hint={'enter your address'}
                                    label={'Address'}
                                    type={'text'}
                                    initialValue={user.data.item.address ? user.data.item.address : null}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setContactState({ ...contactState, address: value })
                                    }}
                                    errorMessage={contactErrorMessages.addressErrorMessage} />
                                <SpaceComponent height={'20px'} />
                            </div>
                        </div>
                    </div>
                    {showContact ? <div className='members-home-button-row'>
                        <div className='members-home-button'
                            onClick={() => {
                                validateContact(() => {
                                    dispatch(updateUser({ user: contactState, asFormData: false }));
                                })
                            }}>
                            <FontAwesomeIcon icon={faSave} />
                            <SpaceComponent width={'10px'} />
                            Save
                        </div>
                    </div> : <></>}
                </div>
                <SpaceComponent height={'20px'} />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <SpaceComponent height={'2px'}
                        width={'93%'}
                        color={'rgb(220,220,220'} />
                </div>
                <SpaceComponent height={'20px'} />
                <div className='members-home-details-section'>
                    <div className='members-home-header-title-outer-row'>
                        <div className='members-home-header-title-row'>
                            <FontAwesomeIcon icon={faHand}
                                style={{
                                    width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                    borderRadius: '10px', padding: '10px'
                                }} />
                            <SpaceComponent width={'20px'} />
                            <h4 className='members-home-header-title-text'>
                                About
                            </h4>
                        </div>
                        <FontAwesomeIcon icon={showAbout ? faAngleUp : faAngleDown}
                            onClick={() => setShowAbout(!showAbout)}
                            className='members-home-detail-expand' />
                    </div>
                    <SpaceComponent height={'20px'} />
                    <div className='members-home-details-container'
                        style={{ display: showAbout ? null : 'none' }}>
                        <div className='members-update-details-row'>
                            <div className='members-update-details-left-column'>
                                <TextAreaControlComponent
                                    label={'Experience'}
                                    initialValue={user.data.item.experience ? user.data.item.experience : null}
                                    onChange={(value) => {
                                        setAboutState({ ...aboutState, experience: value })
                                    }}
                                    errorMessage={aboutErrorMessages.experienceErrorMessages}
                                    hint={'enter your experience'}
                                />
                                <SpaceComponent height={'20px'} />
                                <TextAreaControlComponent
                                    label={'Profession'}
                                    initialValue={user.data.item.profession ? user.data.item.profession : null}
                                    onChange={(value) => {
                                        setAboutState({ ...aboutState, profession: value })
                                    }}
                                    errorMessage={aboutErrorMessages.professionErrorMessages}
                                    hint={'enter your profession'}
                                />
                                <SpaceComponent height={'20px'} />
                                <TextAreaControlComponent
                                    label={'Companies'}
                                    initialValue={user.data.item.companies ? user.data.item.companies : null}
                                    onChange={(value) => {
                                        setAboutState({ ...aboutState, companies: value })
                                    }}
                                    errorMessage={aboutErrorMessages.companiesErrorMessages}
                                    hint={'enter your companies'}
                                />
                                <SpaceComponent height={'20px'} />
                            </div>
                            <div className='members-update-details-right-column'>
                                <TextAreaControlComponent
                                    label={'Skills'}
                                    initialValue={user.data.item.skills ? user.data.item.skills : null}
                                    onChange={(value) => {
                                        setAboutState({ ...aboutState, skills: value })
                                    }}
                                    errorMessage={aboutErrorMessages.skillsErrorMessages}
                                    hint={'enter your skills'}
                                />
                                <SpaceComponent height={'20px'} />
                                <TextAreaControlComponent
                                    label={'Job Type'}
                                    initialValue={user.data.item.jobType ? user.data.item.jobType : null}
                                    onChange={(value) => {
                                        setAboutState({ ...aboutState, jobType: value })
                                    }}
                                    errorMessage={aboutErrorMessages.jobTypeErrorMessages}
                                    hint={'enter your job type'}
                                />
                                <SpaceComponent height={'20px'} />
                                <TextAreaControlComponent
                                    label={'Responsebilities'}
                                    initialValue={user.data.item.responsebilities ? user.data.item.responsebilities : null}
                                    onChange={(value) => {
                                        setAboutState({ ...aboutState, responsebilities: value })
                                    }}
                                    errorMessage={aboutErrorMessages.responsebilitiesErrorMessages}
                                    hint={'enter your responsebilities'}
                                />
                                <SpaceComponent height={'20px'} />
                            </div>
                        </div>
                    </div>
                    {showAbout ? <div className='members-home-button-row'>
                        <div className='members-home-button'
                            onClick={() => {
                                validateAbout(() => {
                                    dispatch(updateUser({ user: aboutState, asFormData: false }));
                                })
                            }}>
                            <FontAwesomeIcon icon={faSave} />
                            <SpaceComponent width={'10px'} />
                            Save
                        </div>
                    </div> : <></>}
                </div>
            </> : <div>404 Page not Accessable</div>}

            <SpaceComponent height={'40px'} />
        </div>
    );
}

export default UpdateMyProfilePage
