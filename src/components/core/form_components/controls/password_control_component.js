import React, { forwardRef, useState } from 'react';
import './password_control_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faWarning } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../space_component';


const PasswordControlComponent = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.initialValue);
    const [showPassword, setShowPassword] = useState(false);
    const [focus, setFocus] = useState(false);

    const validate = () => {
        // TO DO
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='password-control-root'>
            <h4 className='password-control-label'>
                Password
            </h4>
            <SpaceComponent height={'10px'} />
            <div className={focus ? 'focused-password-control-field-container' :
                'password-control-field-container'}>
                <input className='password-control-field'
                    type={showPassword ? 'text' : 'password'}
                    // value={props.initialValue}      // TO DO
                    placeholder={props.hint}
                    onFocus={() => { setFocus(true) }}
                    onBlur={() => { setFocus(false) }}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                        props.onChange && props.onChange(event.target.value);
                    }}>
                </input>
                <FontAwesomeIcon className='password-control-field-icon'
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={() => {
                        setShowPassword(!showPassword)
                    }} />
            </div>
            <SpaceComponent height={'10px'} />
            <div className='password-control-error'>
                {props.errorMessage ?
                    <FontAwesomeIcon className='password-control-error-icon'
                        icon={faWarning} /> : <></>}
                <SpaceComponent width={'6px'} />
                <h4 className='password-control-error-text'>
                    {props.errorMessage}
                </h4>
            </div>
        </div>
    );
})

export default PasswordControlComponent;