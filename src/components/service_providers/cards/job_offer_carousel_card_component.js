import React from 'react';
import './job_offer_carousel_card_component.css';
import { faCheck, faTrash, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../core/space_component';
import ButtonComponent from '../../core/button_component';


function JobOfferCarouselCardComponent(props) {

    return (
        <div className='jobs-carousel-card'
        // key={props.id}
        >
            <div className='job-info'>
                <img className='job-type-icon'
                    src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/profession.png'} />
                <h4 className='job-property-text'>
                    <strong>Job Vacancy</strong> {props.jobOffer.experience}
                </h4>
                <h4 className='job-property-text'>
                    <strong>Job Type</strong> {props.jobOffer.jobType}
                </h4>
                <h4 className='job-property-text'>
                    {props.jobOffer.workingHours}
                </h4>
                <h4 className='job-property-text'>
                    <strong>Job Location</strong> {props.jobOffer.location}
                </h4>
                <h4 className='job-property-text'>
                    {props.jobOffer.qualification.length > 80 ? props.jobOffer.qualification.substring(0, 80) :
                        props.jobOffer.qualification}...
                </h4>
            </div>
            <SpaceComponent height={'15px'} />
            <div className='jobs-carousel-card-button-section'>
                <ButtonComponent label={'Details'} icon={faExternalLinkAlt}
                    onClick={() => props.onViewClicked()} />
                <SpaceComponent width={'15px'} />
                {(props.role != null && ['master', 'blank'].includes(props.role)) || !props.user ?
                    <ButtonComponent label={props.role == 'master' ? 'Remove' : 'Apply'}
                        icon={props.role == 'master' ? faTrash : faCheck}
                        onClick={() => {
                            if (props.role == 'master')
                                props.onRemoveClicked();
                            else props.onApplyClicked();
                        }} /> : <></>}
            </div>
        </div>
    );
}

export default JobOfferCarouselCardComponent;