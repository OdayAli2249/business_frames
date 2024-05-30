import React, { forwardRef, useState } from 'react';
import './text_area_control_component.css';
import SpaceComponent from '../../space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

const TextAreaControlComponent = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.initialValue);
    const [focus, setFocus] = useState(false);

    const validate = () => {
        // TO DO
        return '';
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    const maxLength = props.maxLength ? props.maxLength : 300;
    const remainingChars = value ? value.length : 0;

    return (
        <div className='text-area-control-root'>
            <h4 className='text-area-control-label'>
                {props.label}
            </h4>
            <SpaceComponent height={'10px'} />
            <textarea
                className={focus ? 'focused-text-area-control-field-container' :
                    'text-area-control-field-container'}
                style={{ height: props.height }}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                    props.onChange && props.onChange(event.target.value);
                }}
                maxLength={maxLength}
                placeholder={props.hint}
                onFocus={() => { setFocus(true) }}
                onBlur={() => { setFocus(false) }}
                rows="4"
                cols="50"
            />
            <div className='text-area-control-row'>
                <div className='text-area-control-error'>
                    {props.errorMessage ?
                        <FontAwesomeIcon className='text-area-control-error-icon'
                            icon={faWarning} /> : <></>}
                    <SpaceComponent width={'6px'} />
                    <h4 className='text-area-control-error-text'>
                        {props.errorMessage}
                    </h4>
                </div>
                <h6 className='text-area-control-max-number'>{remainingChars}/{maxLength}</h6>
            </div>
        </div>
    );
})

export default TextAreaControlComponent;