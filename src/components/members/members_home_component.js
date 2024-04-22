import React from 'react';
import './members_home_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faHandsHelping, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../core/space_component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShimmerCardComponent from '../core/state_components/shimmer_card_component';


function MembersHomeComponent(props) {

    const navigator = useNavigate();
    const state = useSelector(state => state.userById);
    const user = useSelector(state => state.user);

    return (
        <div className='members-home-component-root'
            id='/members-home'>
            {state.data && state.data.item ? <>
                <div className='members-home-details-section'>
                    {user.data && user.data.item.id == props.id ?
                        <FontAwesomeIcon className='members-home-details-section-icon' icon={faEdit}
                            onClick={() => navigator('/members/update/' + props.id)} /> : <></>}
                    <div className='members-home-header-title-row'>
                        <FontAwesomeIcon icon={faUser}
                            style={{
                                width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                borderRadius: '10px', padding: '10px'
                            }} />
                        <SpaceComponent width={'20px'} />
                        <h4 className='members-home-header-title-text'>
                            Personal Info
                        </h4>
                    </div>
                    <SpaceComponent height={'20px'} />
                    <div className='members-home-details-container'>
                        <div className='members-home-details-row'>
                            <div className='members-home-details-left-column'>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Name </strong> {state.data.item.firstName + ' ' + state.data.item.lastName}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Gender </strong> {state.data.item.gender ? state.data.item.gender : 'Not set'}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Job </strong> {state.data.item.job ? state.data.item.job : 'This value is not set currently, click the edit icon in the corner or update option in explorer to set a value for this field, so others can know about you.'}
                                    </h4>
                                </div>
                                <SpaceComponent height={'20px'} />
                            </div>
                            <div className='members-home-details-right-column'>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Age </strong> Not set
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Education </strong> {state.data.item.education ? state.data.item.education : 'Not set'}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>University </strong> {state.data.item.university ? state.data.item.university : 'Not set'}
                                    </h4>
                                </div>
                                <SpaceComponent height={'20px'} />
                            </div>
                        </div>
                    </div>
                </div>
                <SpaceComponent height={'20px'} />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <SpaceComponent height={'2px'}
                        width={'93%'}
                        color={'rgb(220,220,220'} />
                </div>
                <SpaceComponent height={'20px'} />
                <div className='members-home-details-section'>
                    {user.data && user.data.item.id == props.id ?
                        <FontAwesomeIcon className='members-home-details-section-icon' icon={faEdit}
                            onClick={() => navigator('/members/update/' + props.id)} /> : <></>}
                    <div className='members-home-header-title-row'>
                        <FontAwesomeIcon icon={faPhone}
                            style={{
                                width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                borderRadius: '10px', padding: '10px'
                            }} />
                        <SpaceComponent width={'20px'} />
                        <h4 className='members-home-header-title-text'>
                            Contact
                        </h4>
                    </div>
                    <SpaceComponent height={'20px'} />
                    <div className='members-home-details-container'>
                        <div className='members-home-details-row'>
                            <div className='members-home-details-left-column'>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>E-mail </strong> {state.data.item.email ? state.data.item.email : 'Not set'}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Phone</strong> {state.data.item.phone ? state.data.item.phone : 'Not set'}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Linkedin </strong> {state.data.item.linkedin ? state.data.item.linkedin : 'Not set'}
                                    </h4>
                                </div>
                                <SpaceComponent height={'20px'} />
                            </div>
                            {/* <SpaceComponent width={'120px'} /> */}
                            <div className='members-home-details-right-column'>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Country</strong> {state.data.item.country ? state.data.item.country : 'Not set'}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>City </strong> {state.data.item.city ? state.data.item.city : 'Not set'}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Address </strong> {state.data.item.address ? state.data.item.address : 'Not set'}
                                    </h4>
                                </div>
                                <SpaceComponent height={'20px'} />
                            </div>
                        </div>
                    </div>
                </div>
                <SpaceComponent height={'20px'} />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                    <SpaceComponent height={'2px'}
                        width={'93%'}
                        color={'rgb(220,220,220'} />
                </div>
                <SpaceComponent height={'20px'} />
                <div className='members-home-details-section'>
                    {user.data && user.data.item.id == props.id ?
                        <FontAwesomeIcon className='members-home-details-section-icon' icon={faEdit}
                            onClick={() => navigator('/members/update/' + props.id)} /> : <></>}
                    <div className='members-home-header-title-row'>
                        <FontAwesomeIcon icon={faHandsHelping}
                            style={{
                                width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                borderRadius: '10px', padding: '10px'
                            }} />
                        <SpaceComponent width={'20px'} />
                        <h4 className='members-home-header-title-text'>
                            About
                        </h4>
                    </div>
                    <SpaceComponent height={'20px'} />
                    <div className='members-home-details-container'>
                        <div className='members-home-details-row'>
                            <div className='members-home-details-left-column'>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Experience </strong> {state.data.item.experience ? state.data.item.experience : 'Not set'}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Profession </strong> {state.data.item.profession ? state.data.item.profession : 'Not set'}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Companies</strong> {state.data.item.companies ? state.data.item.companies : 'Not set'}
                                    </h4>
                                </div>
                                <SpaceComponent height={'20px'} />
                            </div>
                            <div className='members-home-details-right-column'>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Skills </strong> {state.data.item.skills ? state.data.item.skills : 'Not set'}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Job Type</strong> {state.data.item.jobType ? state.data.item.jobType : 'Not set'}
                                    </h4>
                                </div>
                                <div className='members-home-text-row'>
                                    <h4 className='members-home-sub-title-text'>
                                        <strong>Responsebilities </strong> {state.data.item.responsebilities ? state.data.item.responsebilities : 'Not set'}
                                    </h4>
                                </div>
                                <SpaceComponent height={'20px'} />
                            </div>
                        </div>
                    </div>
                </div>
            </> : <></>}
        </div>
    );
}

export default MembersHomeComponent