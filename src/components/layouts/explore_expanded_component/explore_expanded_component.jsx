import React, { useState } from 'react';
import './explore_expanded_component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

function ExploreExpandedComponent(props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='expanded-container'>
            <div className='expanded-title'
                style={props.selected == true ? { backgroundColor: 'rgb(200, 200, 200)' } :
                    props.highLighted == true ? { backgroundColor: 'rgb(230, 230, 230)' } : {}} >

                <div className='icon'
                    onClick={() => props.onClick()}>
                    <FontAwesomeIcon icon={props.icon} />
                </div>
                <div className='text'
                    onClick={
                        () => props.onClick()
                    }>{props.text}</div>
                {props.expandable ?
                    <div className='expand'
                        onClick={() => { setIsOpen(!isOpen) }} >
                        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} />
                    </div> : <div className='sized-box'></div>}
            </div>
            {(props.selected == true || props.highLighted == true) ?
                <div className='explore-component-selected-indicator'
                    style={props.highLighted == true ? { backgroundColor: '#949494' } : {}}></div> : <></>}
            {isOpen && <div className='expanded-content' >
                {props.children}
            </div>
            }
        </div>
    );
}
export default ExploreExpandedComponent;