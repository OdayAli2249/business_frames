import React, { Fragment } from 'react';
import './header_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCheckCircle, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../core/space_component';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NetworkImageComponent from '../../core/network_image_component';
import ShimmerCardComponent from '../../core/state_components/shimmer_card_component';


function HeaderComponent(props) {
    const navigator = useNavigate();
    const state = useSelector(props.selectedState);
    const { id } = useParams();

    return (
        <div className='header-root'>
            <div className='header-bar'>
                {state.data && state.data.item ?
                    <Fragment>
                        <FontAwesomeIcon className='navigate-button'
                            icon={faBars}
                            onClick={props.onNavigateClicked} />
                        <div className='header-profile'>
                            <div className='details-info-title'>
                                {state.data.item.logoUrl && <NetworkImageComponent className='details-info-title-logo'
                                    src={props.optionsType + '/' + state.data.item.logoUrl} />}
                                <div className='details-info-title-content'>
                                    <div className='details-info-title-container'>
                                        <h2 className='details-info-title-main'>
                                            {props.optionsType == 'members' ? state.data.item.firstName + ' ' + state.data.item.lastName :
                                                state.data.item.name}
                                        </h2>
                                        <FontAwesomeIcon className='details-info-title-main-icon'
                                            icon={faCheckCircle} />
                                    </div>
                                    <h4 className='details-info-title-category'>
                                        {state.data.item.target ? (
                                            state.data.item.target.length > 90 ? state.data.item.target.slice(0, 89) + '...' :
                                                state.data.item.target) :
                                            state.data.item.summary &&
                                                state.data.item.summary.length > 90 ?
                                                state.data.item.summary.slice(0, 89) + '...' :
                                                state.data.item.summary}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        {props.optionsType == 'branches' ?
                            <div className='header-info'>
                                <div className='header-info-card'
                                    onClick={() => navigator('/branches/members-find/' + id)}>Members</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/branches/branch-permission-groups/' + id)}>Permissions</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/branches/branch-services/' + id)}>Services</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/branches/branch-products/' + id)}>Products</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/branches/branch-posts/' + id)}>Posts</div>
                            </div> : <></>}
                        {props.optionsType == 'service-providers' ?
                            <div className='header-info'>
                                <div className='header-info-card'
                                    onClick={() => navigator('/service-providers/service-provider-details/' + id)}>Details</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/service-providers/hiring-requests/' + id)}>Hiring requests</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/service-providers/members-find/' + id)}>Members</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/service-providers/service-provider-branches/' + id)}>Branches</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/service-providers/service-providers-home/' + id)}>Home</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/service-providers/service-provider-create/' + id)}>Create</div>
                            </div> : <></>}
                        {props.optionsType == 'members' ?
                            <div className='header-info'>
                                <div className='header-info-card'
                                    onClick={() => navigator('/members/members-home')}>Details</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/members/member-service-providers')}>Servcie Providers</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/members/')}>Find Members</div>
                                <SpaceComponent width={'10px'} />
                                <div className='header-info-card'
                                    onClick={() => navigator('/members/update')}>Update</div>
                            </div>
                            : <></>}
                    </Fragment>
                    : state.loading ?
                        <>
                            <ShimmerCardComponent className='details-info-title-logo' />
                            <div className='header-info'>
                                <ShimmerCardComponent className='header-info-card-loading' style={{ width: '100px' }} />
                                <SpaceComponent width={'10px'} />
                                <ShimmerCardComponent className='header-info-card-loading' style={{ width: '70px' }} />
                                <SpaceComponent width={'10px'} />
                                <ShimmerCardComponent className='header-info-card-loading' style={{ width: '160px' }} />
                                <SpaceComponent width={'10px'} />
                                <ShimmerCardComponent className='header-info-card-loading' style={{ width: '120px' }} />
                            </div>
                        </> : <></>}
            </div>
        </div>
    );
}

export default HeaderComponent