import React, { useState } from 'react';
import './user_signin_component.css';
import TextFieldControlComponent from '../core/form_components/controls/text_field_control_component';
import PasswordControlComponent from '../core/form_components/controls/password_control_component';
import { faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../core/space_component';
import DialogComponent from '../core/dialog_components/dialog_component';
import EmailVerificationComponent from './email_verification_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Validations, Validator } from '../../helpers/validators';

function UserSigninComponent(props) {

    const [checked, setChecked] = useState(false);
    const [showEmailVerificationDialog, setShowEmailVerificationDialog] = useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };


    const [state, setState] = useState({
        email: null,
        password: null,
    });
    const [errorMessages, setErrorMessages] = useState({
        emailErrorMessage: null,
        passwordErrorMessage: null,
    });
    const validate = (callBack) => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.emailErrorMessage = Validator.validate(state.email, [Validations.REQUIRED]);
        newErrorMessages.passwordErrorMessage = Validator.validate(state.password, [Validations.REQUIRED]);


        let valid = newErrorMessages.emailErrorMessage == null &&
            newErrorMessages.passwordErrorMessage == null

        setErrorMessages(newErrorMessages);
        if (valid)
            callBack();

    };

    return (
        <div className='user-sign-in-component-root'>
            <div className='google-sign-up-button'
                onClick={() => {
                }}>
                <FontAwesomeIcon icon={faPlus} />
                <SpaceComponent width={'10px'} />
                Sign up with Google
            </div>
            <SpaceComponent height={'10px'} />
            <div className='user-sign-in-divider'>
                <div className='user-sign-in-divider-line'>

                </div>
                <p className='user-sign-in-divider-or'>Or</p>
                <div className='user-sign-in-divider-line'>

                </div>
            </div>
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
                errorMessage={errorMessages.passwordErrorMessage}
                hint={'enter your password'}
            />
            <p className='user-sign-in-forgot'
                onClick={() => setShowEmailVerificationDialog(true)}>
                forgot?
            </p>
            <SpaceComponent height={'20px'} />
            <div className='user-sign-in-remeber-me-row'>
                <input
                    className='user-sign-in-contract-check'
                    type='checkbox'
                    checked={checked}
                    onChange={handleCheckboxChange}
                />
                <SpaceComponent width={'10px'} />
                <p className='user-sign-in-text'>
                    remember me
                </p>
            </div>
            <SpaceComponent height={'20px'} />
            <div className='user-sign-in-button'
                onClick={() => {
                    validate(() => {
                        props.onSigninButtonClicked(state);
                    })
                }}>
                Sign in
            </div>
            <SpaceComponent height={'10px'} />
            <p className='user-sign-in-text'>
                Don't have account?<a onClick={props.onSignupClicked} style={{ cursor: 'pointer' }}> Sign up</a>.
            </p>
            <DialogComponent
                show={showEmailVerificationDialog}
                height='40'
                onClose={() => setShowEmailVerificationDialog(false)}>
                <EmailVerificationComponent />
            </DialogComponent>
        </div>
    );
}

export default UserSigninComponent;