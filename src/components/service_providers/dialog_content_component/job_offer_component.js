import React from 'react';
import './job_offer_component.css';
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

function JobOfferComponent(props) {
    return (
        <div className='job-offer-component-root'>
            <h4 className='job-offer-header-title-text'>
                Job Offer
            </h4>
            <div className='job-offer-details-container'>
                <div className='job-offer-details-row'>
                    <div className='job-offer-details-column'>
                        <FontAwesomeIcon icon={faBusinessTime}
                            style={{
                                width: '60px', height: '60px', backgroundColor: 'rgb(200,200,200)',
                                borderRadius: '50px', padding: '20px'
                            }} />
                        <SpaceComponent height={'20px'} />
                        <div className='job-offer-text-row'>
                            <h4 className='job-offer-sub-title-text'>
                                <strong>Experience</strong> {props.jobOffer.experience}
                            </h4>
                        </div>
                        <div className='job-offer-text-row'>
                            <h4 className='job-offer-sub-title-text'>
                                <strong>Job Type</strong> {props.jobOffer.jobType}
                            </h4>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='job-offer-text-row'>
                            <h4 className='job-offer-sub-title-text'>
                                <strong>Qualification</strong> {props.jobOffer.qualification}
                            </h4>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='job-offer-text-row'>
                            <h4 className='job-offer-sub-title-text'>
                                <strong>Roles and Responsibilities</strong>{props.jobOffer.responsibilities}
                            </h4>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='job-offer-text-row'>
                            <h4 className='job-offer-sub-title-text'>
                                <strong>Skills Required</strong>{props.jobOffer.skills}
                            </h4>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='job-offer-text-row'>
                            <h4 className='job-offer-sub-title-text'>
                                <strong>Employee Benefits</strong>{props.jobOffer.benefits}
                            </h4>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='job-offer-text-row'>
                            <h4 className='job-offer-sub-title-text'>
                                <strong>Flexible working hours</strong>{props.jobOffer.workingHours}
                            </h4>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='job-offer-text-row'>
                            <h4 className='job-offer-sub-title-text'>
                                <strong>Company Activities</strong>{props.jobOffer.companyActivities}
                            </h4>
                        </div>
                        <SpaceComponent height={'20px'} />
                    </div>
                    <div className='job-offer-button-section'>
                        {(props.role != null && ['master', 'blank'].includes(props.role))||(props.user && props.user.item) ?
                            <div className='job-offer-button' onClick={() => {
                                if (props.role == 'master')
                                    props.onRemoveClicked();
                                else props.onApplyClicked();
                            }}>
                                <h4 className='job-offer-samll-text'
                                    style={{ fontSize: '16px' }}>{
                                        props.role == 'master' ? 'Remove' : 'Apply'}</h4>
                                <SpaceComponent width={'15px'} />
                                <FontAwesomeIcon className='job-offer-button-icon'
                                    icon={props.role == 'master' ? faTrash : faCheck} />
                            </div> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobOfferComponent;