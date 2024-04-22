import React from 'react';
import './update_my_profile_component.css'
import { useNavigate } from 'react-router-dom';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../core/button_component';

function UpdateMyProfileComponent(props) {
    const navigator = useNavigate();

    return (
        <div className='update-my-profile-component-root'
            id='/update'>
            <ButtonComponent label={'Edit Profile'} icon={faEdit} onClick={() => navigator('/members/update/' + props.id)} />
        </div>
    );
}

export default UpdateMyProfileComponent