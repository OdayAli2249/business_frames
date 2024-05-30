import React, { forwardRef, useState } from 'react';
import './drop_down_menu_control_component.css';
import SpaceComponent from '../../space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowDown, faWarning } from '@fortawesome/free-solid-svg-icons';

const DropDownMenuControlComponent = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.initialValue);
    const [focus, setFocus] = useState(false);
    const validate = () => {
        // TO DO
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='drop-down-menu-control-component-root'>
            <h4 className='drop-down-menu-control-label'>
                {props.label}
            </h4>
            <SpaceComponent height={'10px'} />
            <div className='drop-down-menu-control-container'>
                <FontAwesomeIcon className='drop-down-menu-control-post-icon'
                    icon={faAngleDown} />
                <select className='drop-down-menu-control'
                    style={{ outline: focus ? '3px solid #333' : null }}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                        props.onChange && props.onChange(event.target.value);
                    }}
                    onFocus={() => { setFocus(true) }}
                    onBlur={() => { setFocus(false) }}>
                    {props.options.map((option) =>
                        <option key = {option} className='drop-down-menu-option' value={option}>{option}</option>)}
                </select>
            </div>
            <SpaceComponent height={'10px'} />
            <div className='drop-down-menu-control-error'>
                {props.errorMessage ? <FontAwesomeIcon className='drop-down-menu-control-error-icon'
                    icon={faWarning} /> : <></>}
                <SpaceComponent width={'6px'} />
                <h4 className='drop-down-menu-control-error-text'>
                    {props.errorMessage}
                </h4>
            </div>
        </div>
    );
})

export default DropDownMenuControlComponent;