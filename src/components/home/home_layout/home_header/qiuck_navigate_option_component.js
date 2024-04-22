import React from 'react';
import './qiuck_navigate_option_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../../core/space_component';

function QiuckNavigateOptionComponent(props) {
    return (
        <li className='qiuck-navigate-option'>
            <div className='qiuck-navigate-option-content'>
                <div className='qiuck-navigate-option-upper-section'>
                    <div className='qiuck-navigate-option-icon-area'>
                        <FontAwesomeIcon icon={props.icon}
                            className='qiuck-navigate-option-icon' />
                    </div>
                    <div className='qiuck-navigate-option-text'>
                        <h3 style={{ padding: 0, margin: 0, color: 'black' }}>
                            {props.title}
                        </h3>
                        <h5>
                            {props.text}
                        </h5>
                    </div>
                </div>
                <div className='qiuck-navigate-option-lower-section'>
                    <div className='qiuck-navigate-option-explore-button'
                        onClick={() => props.onClick()}>
                        <h5>
                            explore
                        </h5>
                        <SpaceComponent width={'10px'} />
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                    </div>
                </div>
            </div>
        </li>
    );
}

export default QiuckNavigateOptionComponent;