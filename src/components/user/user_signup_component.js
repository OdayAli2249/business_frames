import React, { useState } from 'react';
import './user_signup_component.css';
import TextFieldControlComponent from '../core/form_components/controls/text_field_control_component';
import PasswordControlComponent from '../core/form_components/controls/password_control_component';
import { faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../core/space_component';
import { Validations, Validator } from '../../helpers/validators';

function UserSignupComponent(props) {
    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };


    const [state, setState] = useState({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
    });
    const [errorMessages, setErrorMessages] = useState({
        firstNameErrorMessage: null,
        lastNameErrorMessage: null,
        emailErrorMessage: null,
        passwordErrorMessage: null,
    });
    const validate = (callBack) => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.firstNameErrorMessage = Validator.validate(state.firstName, [Validations.REQUIRED]);
        newErrorMessages.lastNameErrorMessage = Validator.validate(state.lastName, [Validations.REQUIRED]);
        newErrorMessages.emailErrorMessage = Validator.validate(state.email, [Validations.REQUIRED]);
        newErrorMessages.passwordErrorMessage = state.password && state.password == state.confirmPassword ? null : 'Not identical passwords';


        let valid = newErrorMessages.firstNameErrorMessage == null &&
            newErrorMessages.lastNameErrorMessage == null &&
            newErrorMessages.emailErrorMessage == null &&
            newErrorMessages.passwordErrorMessage == null

        setErrorMessages(newErrorMessages);
        if (valid)
            callBack();

    };

    return (
        <div className='user-sign-up-component-root'>
            <div className='user-name-row'>
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
            <PasswordControlComponent
                initialValue={''}
                onChange={(value) => {
                    setState({ ...state, password: value })
                }}
                errorMessage={''}
                hint={'enter password'}
            />
            <SpaceComponent height={'10px'} />
            <PasswordControlComponent
                initialValue={''}
                onChange={(value) => {
                    setState({ ...state, confirmPassword: value })
                }}
                errorMessage={errorMessages.passwordErrorMessage}
                hint={'confirm password'}
            />
            <SpaceComponent height={'20px'} />
            <div className='user-sign-up-contract-row'>
                <input
                    className='user-sign-up-contract-check'
                    type='checkbox'
                    checked={checked}
                    onChange={handleCheckboxChange}
                />
                <SpaceComponent width={'10px'} />
                <p className='user-sign-up-text'>
                    Creating an account means you’re okay with our <a href="">Terms of Service</a>,
                    <a href=""> Privacy Policy</a>.
                </p>
            </div>
            <SpaceComponent height={'20px'} />
            <div className='user-sign-up-button'
                onClick={() => {
                    validate(() => {
                        props.onSignupButtonClicked(state);
                    })
                }}>
                Create Account
            </div>
            <SpaceComponent height={'10px'} />
            <p className='user-sign-up-text'>
                Already a member?<a onClick={props.onSigninClicked} style={{ cursor: 'pointer' }}> Sign In</a>.
            </p>
        </div>
    );
}

export default UserSignupComponent;