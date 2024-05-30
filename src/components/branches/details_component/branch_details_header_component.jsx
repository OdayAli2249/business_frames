import React from 'react';
import './branch_details_header_style.scss'
import { faPhone, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpaceComponent from '../../core/space_component';
import ButtonComponent from '../../core/button_component';
import CircularProgressBarComponent from '../../core/circular_progress_bar_component';
import LinearProgressBarComponent from '../../core/linear_progress_bar_component';
import NetworkImageComponent from '../../core/network_image_component';
import { useSelector } from 'react-redux';

function BranchDetailsHeaderComponent(props) {

    const state = useSelector(state => state.branchById);

    const computeRating = (index) => {
        return (Number(state.data.item.reviews[index]) / (
            Number(state.data.item.reviews[0]) +
            Number(state.data.item.reviews[1]) +
            Number(state.data.item.reviews[2]) +
            Number(state.data.item.reviews[3]) +
            Number(state.data.item.reviews[4])) * 100
        )
    }

    const computeTotalRating = () => {
        return 5 - (computeRating(0) * 5 +
            computeRating(1) * 4 +
            computeRating(2) * 3 +
            computeRating(3) * 2 +
            computeRating(4)) / 100

    }

    return (
        <div className='branch-details-header-component-root'
            id='/branch-details'>
            {state.data && state.data.item ? <>
                <h2 className='basic-l-text-size-l-text-weight'>
                    All details
                </h2>
                <SpaceComponent height={'20px'} />
                <div className='branch-details-section'>
                    <div className='branch-statistical-left-section'>
                        <SpaceComponent height={'20px'} />
                        <div className='branch-statistics-item'>
                            <CircularProgressBarComponent
                                color={'rgba(83, 169, 199)'}
                                width={200}
                                height={200}
                                percentage={state.data.item.marketPercentage} />
                            <SpaceComponent height={'10px'} />
                            <SpaceComponent height={'1px'}
                                width={'90%'}
                                color={'rgb(220,220,220'}
                            />
                            <SpaceComponent height={'10px'} />
                            <div className='branch-statistics-grid-item-body'>
                                <img className='branch-details-info-grid-item-image'
                                    src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/market_share.png'}></img>
                                <div className='column-main-start-cross-start'>
                                    <h3 className='basic-s-text-size-m-text-weight'>Market Share</h3>
                                    <h5 className='medium-xs-text-size-m-text-weight'>
                                        {state.data.item.market}</h5>
                                </div>
                            </div>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <h2 className='basic-m-text-size-m-text-weight'>
                            Customer Reviews
                        </h2>

                        <div className='row-main-start-cross-center'>
                            {state.data.item.reviews ?
                                Array.from({ length: Math.floor(computeTotalRating()) }, (_, index) => index + 1).map((idx) =>
                                    <FontAwesomeIcon key={idx} className='orange-icon-color-s-icon-size'
                                        icon={faStar} />
                                ) : <></>
                            }
                            {state.data.item.reviews ?
                                <h2 className='basic-s-text-size-m-text-weight'>{Math.floor(computeTotalRating())} out of 5</h2> : <></>}
                        </div>
                        <h4 className='basic-s-text-size-m-text-weight'>
                            13 global ratings
                        </h4>
                        <SpaceComponent height={'10px'} />
                        {state.data.item.reviews ? <>
                            <LinearProgressBarComponent percentage={Math.floor(computeRating(4))} prefixText={'5 stars'} />
                            <SpaceComponent height={'3px'} />
                            <LinearProgressBarComponent percentage={Math.floor(computeRating(3))} prefixText={'4 stars'} />
                            <SpaceComponent height={'3px'} />
                            <LinearProgressBarComponent percentage={Math.floor(computeRating(2))} prefixText={'3 stars'} />
                            <SpaceComponent height={'3px'} />
                            <LinearProgressBarComponent percentage={Math.floor(computeRating(1))} prefixText={'2 stars'} />
                            <SpaceComponent height={'3px'} />
                            <LinearProgressBarComponent percentage={Math.floor(computeRating(0))} prefixText={'1 stars'} />
                        </> : <></>}
                        <h2 style={{ fontSize: '18px' }}>
                            How customer reviews and ratings work?
                        </h2>
                        <h4 className='medium-xs-text-size-m-text-weight'>
                            At Ecolce, we value our customers' feedback and opinions. Our customer reviews and ratings
                            system allows customers to leave honest and unbiased feedback about their experiences with our products
                            and services.
                        </h4>
                    </div>
                    <SpaceComponent width={'20px'} />
                    <div className='branch-basic-details-section'>
                        <div className='branch-details-body'>
                            {state.data.item.promotionPhotos ?
                                <div className='branch-details-images-section'>
                                    {state.data.item.promotionPhotos[0] && <NetworkImageComponent className='branch-details-main-image'
                                        src={'branches/' + state.data.item.promotionPhotos[0]} />}
                                    <SpaceComponent height={'10px'} />
                                    <div className='branch-details-images-container'>
                                        {state.data.item.promotionPhotos[1] && <NetworkImageComponent className='branch-details-images'
                                            src={'branches/' + state.data.item.promotionPhotos[1]} />}
                                        <SpaceComponent width={'10px'} />
                                        {state.data.item.promotionPhotos[2] && <NetworkImageComponent className='branch-details-images'
                                            src={'branches/' + state.data.item.promotionPhotos[2]} />}
                                    </div>
                                </div> : <></>}
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='branch-details-info-section'>
                            {state.data.item.summary ?
                                <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '10px' }}>
                                    <h3 className='basic-xs-text-size-m-text-weight'>
                                        {state.data.item.summary}  </h3>
                                </div> : <></>}
                            <SpaceComponent height={'15px'} />
                            <ButtonComponent label={'Contacts'} icon={faPhone} />
                            <SpaceComponent height={'15px'} />
                        </div>
                    </div>
                </div></> : <></>}
        </div>
    );
}

export default BranchDetailsHeaderComponent;