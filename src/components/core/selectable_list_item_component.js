import React from 'react';
import './selectable_list_item_component.css';
import { faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpaceComponent from './space_component';
import NetworkImageComponent from './network_image_component';

function SelectableListItemComponent(props) {
    return (
        <div className='selectable-list-item-component-root'
            // key={props.id ? props.id : null}
            onClick={() => {
                props.onItemSelected()
            }}>
            {
                props.selected ?
                    <FontAwesomeIcon className='selectable-list-item-selected' icon={faCheck} /> :
                    <div className='selectable-list-item-unselected' />}

            <div className='list-item-row'>
                {props.image ? <NetworkImageComponent className='list-item-image'
                    src={props.image} /> :
                    <div className='list-item-image' >
                        <FontAwesomeIcon icon={props.defaultIcon} className='list-item-icon' /></div>}
                <SpaceComponent width={'16px'} />
                <div className='list-item-column'>
                    <div className='list-item-title'>
                        {props.title}
                    </div>
                    <div className='list-item-sub-title'>
                        {props.subtitleFirst}
                    </div>
                    <div className='list-item-sub-title'>
                        {props.subtitleSecond}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectableListItemComponent;