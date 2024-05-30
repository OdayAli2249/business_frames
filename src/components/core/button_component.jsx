import React from 'react';
import './button_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpaceComponent from './space_component';


function ButtonComponent(props) {
    return (
        <div className='button'
            style={{
                backgroundColor: props.color,
                paddingLeft: props.size == 'large' ? '80px' : null,
                paddingRight: props.size == 'large' ? '80px' : null,
            }}
            onClick={() => {
                props.onClick && props.onClick();
            }}>
            <h4 className='button-text'
                style={{
                    fontSize: props.size == 'large' ? '24px' : '16px',
                    fontWeight: props.size == 'large' ? '500' : null,
                }}>{props.label}</h4>
            {props.icon && < SpaceComponent width={'15px'} />}
            {props.icon && <FontAwesomeIcon className='button-icon'
                style={{
                    width: props.size == 'large' ? '24px' : null,
                    height: props.size == 'large' ? '24px' : null
                }}
                icon={props.icon} />}
        </div>
    );
}

export default ButtonComponent;