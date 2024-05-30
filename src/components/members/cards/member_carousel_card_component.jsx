import React from 'react';
import { useNavigate } from 'react-router-dom';
import './member_carousel_card_component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime, faCheck, faCheckCircle, faExternalLinkAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../core/space_component';
import NetworkImageComponent from '../../core/network_image_component';

function MemberCarouselCardComponent(props) {
    const navigator = useNavigate();

    return (
        <div className='member-carousel-card'
            // key={props.id}
            onClick={() => {
                if (props.selectionMod == 'single' || props.selectionMod == 'multi')
                    props.onItemSelected()
            }}>
            {props.user.profilePictureUrl ? <NetworkImageComponent className='member-carousel-card-profile-picture'
                src={'users/' + props.user.profilePictureUrl} /> : <div className='member-carousel-card-profile-picture'>
                <FontAwesomeIcon icon={faUser} style={{ width: '80px', height: '80px', color: 'gray' }} />
            </div>}
            <div className='member-card-cover' />
            <SpaceComponent height={'60px'} />
            {props.selectionMod == 'single' || props.selectionMod == 'multi' ?
                props.selected ? <FontAwesomeIcon className='member-carousel-card-selected' icon={faCheck} /> :
                    <div className='member-carousel-card-unselected' /> : <></>}
            <div className='member-card-body'>
                <div className='member-card-info-title-content'>
                    <div className='member-card-info-title-container'>
                        <h2 className='member-card-info-title-main'>
                            {props.user.firstName + ' ' + props.user.lastName}
                        </h2>
                        {props.user.role == 'sub-master' || props.user.role == 'master' ? <FontAwesomeIcon className='member-card-info-title-main-icon'
                            icon={faCheckCircle} /> : <></>}
                    </div>
                    <h4 className='member-card-info-title-category'>
                        {props.user.email}
                    </h4>
                    {props.user.role ?
                        <h4 className='member-card-info-title-category'>
                            Role: {props.user.role}
                        </h4> : <></>}
                </div>
                <div className='member-card-info-sub-title'>
                    <FontAwesomeIcon style={{ color: 'gray' }}
                        icon={faBusinessTime} />
                    <SpaceComponent width={'8px'} />
                    <h3 style={{ margin: '5px', color: '#333' }}>
                        profession .<span style={{ color: 'rgb(168,0,26)' }}>{props.user.profession}</span>
                    </h3>
                </div>
                <SpaceComponent height={'15px'} />
                <div className='member-card-info-button-section'>
                    <div className='member-card-info-button'
                        onClick={() => {
                            if (props.selectionMod != 'single' && props.selectionMod != 'multi')
                                navigator('/members/members-home/' + props.user.id);
                        }}
                        style={props.selectionMod == 'single' || props.selectionMod == 'multi' ?
                            { backgroundColor: '#a6a6a6', cursor: 'no-drop' } : {}}>
                        <h4 className='member-card-info-samll-text'
                            style={{
                                fontSize: '16px',
                                cursor: props.selectionMod == 'single' || props.selectionMod == 'multi' ?
                                    'no-drop' : null
                            }}>View</h4>
                        <SpaceComponent width={'15px'} />
                        <FontAwesomeIcon className='member-card-info-button-icon'
                            icon={faExternalLinkAlt} />
                    </div>
                </div>
                <SpaceComponent height={'8px'} />
                {props.onSetRoleClicked && props.role && props.role == 'master' ?
                    <div className='member-card-info-button'
                        onClick={() => {
                            if (props.selectionMod != 'single' && props.selectionMod != 'multi')
                                props.onSetRoleClicked(props.user.role);
                        }}
                        style={props.selectionMod == 'single' || props.selectionMod == 'multi' ?
                            { backgroundColor: '#a6a6a6', cursor: 'no-drop' } : {}}>
                        <h4 className='member-card-info-samll-text'
                            style={{
                                fontSize: '16px',
                                cursor: props.selectionMod == 'single' || props.selectionMod == 'multi' ?
                                    'no-drop' : null
                            }}>Set as {props.user.role == 'sub-master' ? 'Employee' : 'Manager'}</h4>
                        <SpaceComponent width={'15px'} />
                        <FontAwesomeIcon className='member-card-info-button-icon'
                            icon={faExternalLinkAlt} />
                    </div> : <></>}
            </div>
        </div>
    );
}

export default MemberCarouselCardComponent;