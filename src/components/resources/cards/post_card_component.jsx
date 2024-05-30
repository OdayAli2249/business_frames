import React, { useState } from 'react';
import './post_card_component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../core/space_component';
import DialogComponent from '../../core/dialog_components/dialog_component';
import FilePickerControlComponent from '../../core/form_components/controls/file_picker_control_component';
import NetworkImageComponent from '../../core/network_image_component';

function PostCardComponent(props) {
    const [showCornerOptions, setShowCornerOptions] = useState(false);
    const [activateCornerOptions, setActivateCornerOptions] = useState(true);

    return (
        <div className='post-card'
        // key={props.id}
        >
            {props.post.posterUrl && <NetworkImageComponent className='post-card-image'
                src={'posts/' + props.post.posterUrl} />}
            <div className='post-card-hover'
                style={{ display: showCornerOptions || !activateCornerOptions ? 'flex' : 'none' }}>
                <div className='post-card-corner-icons'
                    style={{ display: showCornerOptions || !activateCornerOptions ? 'flex' : 'none' }}
                    onMouseEnter={() => {
                        console.log('to test');
                        setShowCornerOptions(true);
                        setActivateCornerOptions(false);
                    }}
                    onMouseLeave={() => {
                        console.log('to test');
                        setShowCornerOptions(true);
                        setActivateCornerOptions(true);
                    }}>
                    {!props.hideOptions && props.post.permissions && props.post.permissions.map(permission => permission[2]).includes('1') ?
                        <> <FontAwesomeIcon className='post-card-info-title-main-icon-hover'
                            onClick={() => props.onEditClicked()}
                            icon={faEdit} />
                            <SpaceComponent width={'15px'} /></> : <></>}
                    {!props.hideOptions && props.post.permissions && props.post.permissions.map(permission => permission[1]).includes('1') ?
                        <FontAwesomeIcon className='post-card-info-title-main-icon-hover'
                            onClick={() => props.onRemoveClicked()}
                            icon={faTrash} /> : <></>}
                </div>
            </div>
            <div className='post-card-transparent'
                onMouseEnter={() => {
                    if (activateCornerOptions) {
                        console.log('to test');
                        setShowCornerOptions(true);
                    }
                }}
                onMouseLeave={() => {
                    if (activateCornerOptions) {
                        console.log('to test');
                        setShowCornerOptions(false);
                    }
                }}>
            </div>
        </div>
    );
}

export default PostCardComponent;