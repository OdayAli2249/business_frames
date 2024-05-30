
import './hiring_request_carousel_card_component.css';
import SpaceComponent from '../../core/space_component';
import NetworkImageComponent from '../../core/network_image_component';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function HiringRequestCarouselCardComponent(props) {

    const navigator = useNavigate();

    return (
        <div className='hiring-requests-carousel-card'        //  key={props.id}
        >
            <h4 className='hiring-requests-status' style={props.hiringRequest.status == 'rejected' ? {
                backgroundColor: 'rgb(234, 143, 143)'
            } : props.hiringRequest.status == 'accepted' ? { backgroundColor: 'rgb(80, 255, 80)' } : {}}>
                {props.hiringRequest.status}
            </h4>
            <div className='hiring-requests-carousel-card-profile-picture-container'>
                {props.hiringRequest.user.profilePictureUrl ? <NetworkImageComponent className='hiring-requests-carousel-card-profile-picture'
                    src={'users/' + props.hiringRequest.user.profilePictureUrl}
                    onClick={() => {
                        navigator('/members/members-home/' + props.hiringRequest.user.id)
                    }} />
                    : <div className='hiring-requests-carousel-card-profile-picture'>
                        <FontAwesomeIcon icon={faUser}
                            style={{ width: '60px', height: '60px' }}
                            onClick={() => {
                                navigator('/members/members-home/' + props.hiringRequest.user.id)
                            }} /></div>}
                <h4 className='hiring-requests-carousel-card-member-name'>
                    {props.hiringRequest.user.firstName + ' ' + props.hiringRequest.user.lastName}</h4>
                <h4 className='hiring-requests-carousel-card-member-discriptions'>
                    {props.hiringRequest.user.email}
                </h4>
            </div>
            <h4 className='view-hiring-requests-button'
                onClick={() => {
                    props.onViewClicked();
                }}>
                View Application
            </h4>
            <div className='accept-reject-hiring-requests-row'>
                {props.role != null && (props.role == 'master' || props.role == 'sub-master') && props.hiringRequest.status == 'pending' ?
                    <h4 className='reject-hiring-requests-button'
                        onClick={() => {
                            props.onAcceptClicked();
                        }}>
                        Accept
                    </h4> : <></>}
                <SpaceComponent width={'10px'} />
                {props.role != null && ['master', 'sub-master', 'blank'].includes(props.role) && props.hiringRequest.status == 'pending' ?
                    <h4 className='reject-hiring-requests-button'
                        onClick={() => {
                            if (props.role == 'master' || props.role == 'sub-master')
                                props.onRejectClicked();
                            else props.onCancelClicked();
                        }}>
                        {props.role == 'master' ? 'Reject' : 'Cancel'}
                    </h4> : <></>}
            </div>
        </div>
    );
}

export default HiringRequestCarouselCardComponent;