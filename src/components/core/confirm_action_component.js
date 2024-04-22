import React from 'react';
import './confirm_action_component.css';
import SpaceComponent from './space_component';

function ConfirmActionComponent(props) {
    return (
        <div className='confirm-action-content'>
            <h4 className='confirm-action-title-text'>
                {props.text}
            </h4>
            <SpaceComponent height={'15px'} />
            <div className='confirm-action-button-section'>
                <div className='confirm-action-button'
                    onClick={() => props.onNegativeAction()}>
                    <h4 className='confirm-action-samll-text'
                        style={{ fontSize: '16px' }}>{props.negativeAction}</h4>
                </div>
                <SpaceComponent width={'15px'} />
                <div className='confirm-action-button'
                    onClick={() => props.onPositiveAction()}>
                    <h4 className='confirm-action-samll-text'
                        style={{ fontSize: '16px' }}>{props.positiveAction}</h4>
                </div>
            </div>
        </div>
    );
}

export default ConfirmActionComponent;