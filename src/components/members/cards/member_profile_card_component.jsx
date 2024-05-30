import React from 'react';
import './member_profile_card_component.css';
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NetworkImageComponent from '../../core/network_image_component';
import ShimmerCardComponent from '../../core/state_components/shimmer_card_component';
import ButtonComponent from '../../core/button_component';

function MemberProfileCardComponent(props) {
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);


    return (
        <div className='member-profile-card-component-root'
            style={{
                padding: props.mod == 'small' ? '20px' : null,
            }}>
            {userState.failure ?
                <div className='member-profile-login'>
                    <SpaceComponent width={'15px'} height={'15px'} />
                    <ButtonComponent label={'Login'} icon={faExternalLinkAlt} onClick={() => {
                        navigate('/auth?tab=signin')
                    }} />
                    <SpaceComponent width={'15px'} height={'15px'} />
                    <ButtonComponent label={'Home'} icon={faExternalLinkAlt} onClick={() => {
                        navigate('/home')
                    }} />
                </div> :
                <>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>

                        {userState.loading ? <ShimmerCardComponent className='member-profile-card-picture-loading'
                            style={{
                                width: props.mod == 'small' ? '80px' : null,
                                height: props.mod == 'small' ? '80px' : null
                            }} /> :
                            userState.data.item.profilePictureUrl ? <NetworkImageComponent
                                className='member-profile-card-picture'
                                style={{
                                    width: props.mod == 'small' ? '80px' : null,
                                    height: props.mod == 'small' ? '80px' : null
                                }}
                                src={'users/' + userState.data.item.profilePictureUrl} /> : <div className='member-profile-card-picture'>
                                <FontAwesomeIcon icon={faUser} style={{ width: '80px', height: '80px', color: 'gray' }} />
                            </div>}
                    </div>
                    {userState.loading ?
                        <SpaceComponent height={'40px'} /> :
                        <SpaceComponent height={'10px'} />}
                    {userState.loading ? <></> :
                        <>
                            <h4 className='member-profile-card-title-text'>
                                <strong>Name</strong> {userState.data.item.firstName + ' ' + userState.data.item.lastName}
                            </h4>
                            <h4 className='member-profile-card-title-text'>
                                <strong>E-mail</strong> {userState.data.item.email.split('@')[0]}
                            </h4></>}
                    <SpaceComponent height={'10px'} />
                    {userState.loading ?
                        <ShimmerCardComponent className='member-profile-card-button'
                            style={{ backgroundColor: null, width: '120px' }}
                        /> :
                        <div className='member-profile-card-button'
                            onClick={() => {
                                navigate('/members/members-home/' + userState.data.item.id)   // the id of current registered user
                            }}>
                            <h4 className='member-profile-card-button-text'
                                style={{ fontSize: '16px' }}>View</h4>
                            <SpaceComponent width={'15px'} />
                            <FontAwesomeIcon className='member-profile-card-button-icon'
                                icon={faExternalLinkAlt} />
                        </div>}
                    <div style={{ display: props.mod == 'small' ? 'flex' : 'none', flexDirection: 'column' }}>
                        <SpaceComponent height={'20px'} />
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                            <SpaceComponent height={'1px'}
                                width={'100%'}
                                color={'rgb(220,220,220'} />
                        </div>
                        <SpaceComponent height={'10px'} />
                        <h4 className='member-profile-card-title-text' style={{ color: 'black', cursor: 'pointer' }}>
                            Privacy Policy
                        </h4>
                        <SpaceComponent height={'10px'} />
                        <h4 className='member-profile-card-title-text' style={{ color: 'black', cursor: 'pointer' }}>
                            Term of Users
                        </h4>
                        <SpaceComponent height={'10px'} />
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                            <SpaceComponent height={'1px'}
                                width={'100%'}
                                color={'rgb(220,220,220'} />
                        </div>
                        <SpaceComponent height={'10px'} />
                        <h4 className='member-profile-card-title-text' style={{ color: 'black', fontWeight: '500', cursor: 'pointer' }}
                            onClick={() => props.onLogoutClicked()}>
                            Log out
                        </h4>
                    </div>
                </>}
        </div>
    );
}

export default MemberProfileCardComponent;