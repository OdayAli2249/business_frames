import React from 'react';
import './job_application_component.css';
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faChartLine, faDownLong, faDownload, faExternalLinkAlt, faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import NetworkImageComponent from '../../core/network_image_component';

function JobApplicationComponent(props) {

    const navigator = useNavigate();

    return (
        <div className='job-application-component-root'>
            <h4 className='job-application-header-title-text'>
                Job Application
            </h4>
            <div className='job-application-scroll-container'>
                <div className='job-application-details-row'>
                    <div className='job-application-details-column'>
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
                        <SpaceComponent height={'20px'} />
                        <div className='job-application-text-row'>
                            <h4 className='job-application-sub-title-text'>
                                <strong>Name</strong> {props.hiringRequest.user.firstName} {props.hiringRequest.user.lastName}
                            </h4>
                        </div>
                        <div className='job-application-text-row'>
                            <h4 className='job-application-sub-title-text'>
                                <strong>E-mail</strong> {props.hiringRequest.user.email}
                            </h4>
                        </div>
                        <div className='job-application-text-row'>
                            <h4 className='job-application-sub-title-text'>
                                <strong>Address</strong> {props.hiringRequest.user.address}
                            </h4>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='job-application-text-row'>
                            <h4 className='job-application-sub-title-text'>
                                <strong>Education</strong> {props.hiringRequest.user.education}
                            </h4>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='job-application-text-row'>
                            <h4 className='job-application-sub-title-text'>
                                <strong>Work Experience</strong> {props.hiringRequest.user.experience}
                            </h4>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='job-application-text-row'>
                            <h4 className='job-application-sub-title-text'>
                                <strong>Cover Letter</strong>
                                {props.hiringRequest.coverLetter}
                            </h4>
                        </div>
                    </div>
                    <SpaceComponent width={'80px'} height={'40px'} />
                    <div className='job-application-button-section'>
                        <div className='job-application-button'>
                            <h4 className='job-application-samll-text'
                                style={{ fontSize: '16px' }}>Download CV</h4>
                            <SpaceComponent width={'15px'} />
                            <FontAwesomeIcon className='job-application-button-icon'
                                icon={faDownload} />
                        </div>
                        <div className='job-application-button'>
                            <h4 className='job-application-samll-text'
                                style={{ fontSize: '16px' }}>Download Certificate</h4>
                            <SpaceComponent width={'15px'} />
                            <FontAwesomeIcon className='job-application-button-icon'
                                icon={faDownload} />
                        </div>
                        {props.role == 'master' ?
                            <div className='job-application-button' onClick={() => {
                                props.onAcceptClicked();
                            }}>
                                <h4 className='job-application-samll-text'
                                    style={{ fontSize: '16px' }}>Accept</h4>
                                <SpaceComponent width={'15px'} />
                                <FontAwesomeIcon className='job-application-button-icon'
                                    icon={faCheck} />
                            </div> : <></>}
                        {props.role != null && ['master', 'blank'].includes(props.role) ?
                            <div className='job-application-button' onClick={() => {
                                if (props.role == 'master')
                                    props.onRejectClicked();
                                else props.onCancelClicked();
                            }}>
                                <h4 className='job-application-samll-text'
                                    style={{ fontSize: '16px' }}>  {props.role == 'master' ? 'Reject' : 'Cancel'}</h4>
                                <SpaceComponent width={'15px'} />
                                <FontAwesomeIcon className='job-application-button-icon'
                                    icon={faCancel} />
                            </div> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobApplicationComponent;