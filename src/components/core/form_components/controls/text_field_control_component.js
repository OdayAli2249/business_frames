import React, { forwardRef, useState } from 'react';
import './text_field_control_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faWarning } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../space_component';


const TextFieldControlComponent = forwardRef((props, ref) => {
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState(props.initialValue);
    const validate = () => {
        return props.validator();
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='text-field-control-root'
            style={props.style}>
            <h4 className='text-field-control-label'>
                {props.label}
            </h4>
            <SpaceComponent height={'10px'} />
            <div className={focus ? 'focused-text-field-control-field-container' :
                'text-field-control-field-container'}>
                <input className='text-field-control-field'
                    style={{ width: props.icon ? null : '100%' }}
                    type={props.type ? props.type : 'text'}
                    placeholder={props.hint}
                    onFocus={() => { setFocus(true) }}
                    onBlur={() => { setFocus(false) }}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                        props.onChange && props.onChange(event.target.value);
                    }}
                >
                </input>
                {props.icon && <FontAwesomeIcon className='text-field-control-field-icon'
                    icon={props.icon} />}
            </div>
            <SpaceComponent height={'10px'} />
            <div className='text-field-control-error'>
                {props.errorMessage ?
                    <FontAwesomeIcon className='text-field-control-error-icon'
                        icon={faWarning} /> : <></>}
                <SpaceComponent width={'6px'} />
                <h4 className='text-field-control-error-text'>
                    {props.errorMessage}
                </h4>
            </div>
        </div>
    );
})

export default TextFieldControlComponent;