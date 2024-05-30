import React from 'react';
import './service_provider_reviews_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faStar } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../core/space_component';
import ServiceProviderTopReviewsComponent from './service_provider_top_reviews_component';
import LinearProgressBarComponent from '../../core/linear_progress_bar_component';
import { useSelector } from 'react-redux';

function ServiceProviderReviewsComponent(props) {

    const state = useSelector(state => state.serviceProviderById);

    return (
        <div className='service-provider-reviews-component-root'>
            {state.data && state.data.item ?
                <>
                    <div className='service-provider-statistical-rating-section'>
                        <h2 className='service-provider-reviews-title'>
                            Customer Reviews
                        </h2>
                        <div className='service-provider-reviews-rating'>
                            {Array.from({ length: 5 }, (_, index) => index + 1).map((index) =>
                                <FontAwesomeIcon key={index} className='service-provider-reviews-rating-icon'
                                    icon={faStar} />
                            )
                            }
                            <h2 className='service-provider-reviews-title' style={{ fontSize: '16px' }}>5 out of 5</h2>
                        </div>
                        <h4 className='service-provider-reviews-sub-title'>
                            13 global ratings
                        </h4>
                        <SpaceComponent height={'10px'} />
                        <LinearProgressBarComponent perfixText={'5 stars'} percentage={65} />
                        <SpaceComponent height={'3px'} />
                        <LinearProgressBarComponent perfixText={'4 stars'} percentage={15} />
                        <SpaceComponent height={'3px'} />
                        <LinearProgressBarComponent perfixText={'3 stars'} percentage={10} />
                        <SpaceComponent height={'3px'} />
                        <LinearProgressBarComponent perfixText={'2 stars'} percentage={10} />
                        <SpaceComponent height={'3px'} />
                        <LinearProgressBarComponent perfixText={'1 stars'} percentage={0} />
                        <h2 style={{ fontSize: '18px', textAlign: 'left' }}>
                            How customer reviews and ratings work?
                        </h2>
                        <h4 className='service-provider-reviews-sub-title'
                            style={{ fontSize: '12px', textAlign: 'left', marginRight: '60px' }}>
                            At Ecolce, we value our customers' feedback and opinions. Our customer reviews and ratings
                            system allows customers to leave honest and unbiased feedback about their experiences with our products
                            and services.
                        </h4>
                    </div>
                    <div className='service-provider-top-reviews-section'>
                        <div className='service-provider-top-reviews-container'>
                            <h4 className='service-provider-reviews-sub-title'>
                                Top Reviews
                            </h4>
                            <SpaceComponent width={'10px'} />
                            <FontAwesomeIcon style={{
                                borderRadius: '5px', padding: '5px', color: 'blue'
                            }}
                                icon={faArrowDown} />
                        </div>

                        <h2 style={{ fontSize: '18px', textAlign: 'left' }}>
                            Top reviews from client companies
                        </h2>
                        <ServiceProviderTopReviewsComponent
                            review={5}
                            reviewer={'Liza cod'}
                            reviewDate={'may 25, 2023'}
                            reviewAddress={'Germany'}
                            reviewComment={'Bought this for my grandson based on the video my doughter sent me of bath time it is a hit'} />
                        <div style={{ height: '40px' }} />
                        <ServiceProviderTopReviewsComponent
                            review={5}
                            reviewer={'David shnawer'}
                            reviewDate={'june 4, 2023'}
                            reviewAddress={'united state'}
                            reviewComment={"I recently purchased a road bike from Pedal Power Bikes and I couldn't be happier with my purchase. The bike is lightweight, smooth, and fast, and it has exceeded my expectations in terms of performance."} />
                    </div></> : <></>}
        </div>
    );
}

export default ServiceProviderReviewsComponent;