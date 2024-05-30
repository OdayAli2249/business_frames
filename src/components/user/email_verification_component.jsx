import React, { useState } from 'react';
import SpaceComponent from '../core/space_component';
import TextFieldControlComponent from '../core/form_components/controls/text_field_control_component';
import './email_verification_component.css';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function EmailVerificationComponent(props) {

    const [email, setEmail] = useState(null);
    const [emailFieldError, setEmailFieldError] = useState(null)
    const [display, setDisplay] = useState('email');

    return (
        <div className='email-verification-component-root'>
            {display == 'email' ?
                <div className='email-code-submit'>
                    <p className='email-verification-text'>
                        Enter an E-mail address to send verification code to
                    </p>
                    <SpaceComponent height={'10px'} />
                    <TextFieldControlComponent
                        icon={faEnvelope}
                        hint={'enter your email'}
                        label={'email'}
                        type={'text'}
                        initialValue={''}
                        validator={() => { return 'done' }}
                        onChange={(value) => { setEmail(value) }}
                        errorMessage={emailFieldError} />
                    <SpaceComponent height={'10px'} />
                    <div className='email-verification-button'
                        onClick={() => {
                            if (!email)
                                setEmailFieldError('this field is required')
                            else setDisplay('code');
                        }}>
                        Send Verification Code
                    </div>
                </div>
                :
                <div className='email-code-submit'>
                    <p className='email-verification-text'>
                        Code with 5 number was sent to email:
                    </p>
                    <SpaceComponent height={'10px'} />
                    <div className='verify-code-row'>
                        <TextFieldControlComponent
                            style={{ flex: 1 }}
                            type={'text'}
                            validator={() => { return 'done' }}
                            onChange={() => { }} />
                        <SpaceComponent width={'20px'} />
                        <TextFieldControlComponent
                            style={{ flex: 1 }}
                            type={'text'}
                            validator={() => { return 'done' }}
                            onChange={() => { }} />
                        <SpaceComponent width={'20px'} />
                        <TextFieldControlComponent
                            style={{ flex: 1 }}
                            type={'text'}
                            validator={() => { return 'done' }}
                            onChange={() => { }} />
                        <SpaceComponent width={'20px'} />
                        <TextFieldControlComponent
                            style={{ flex: 1 }}
                            type={'text'}
                            validator={() => { return 'done' }}
                            onChange={() => { }} />
                        <SpaceComponent width={'20px'} />
                        <TextFieldControlComponent
                            style={{ flex: 1 }}
                            type={'text'}
                            validator={() => { return 'done' }}
                            onChange={() => { }} />
                    </div>
                    <SpaceComponent height={'10px'} />
                    <div className='email-verification-button'
                        onClick={() => {
                        }}>
                        Verify
                    </div>
                    <SpaceComponent height={'10px'} />
                    <p className='user-sign-up-text'>
                        Did't recieve code?<a style={{ cursor: 'pointer' }}> resend </a>
                        or<a style={{ cursor: 'pointer' }} onClick={() => setDisplay('email')}> re-enter E-mail</a>.
                    </p>
                </div>
            }
        </div>
    );
}

export default EmailVerificationComponent;