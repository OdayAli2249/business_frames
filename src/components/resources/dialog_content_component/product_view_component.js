import React, { useState } from 'react';
import './product_view_component.css'
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faExternalLink, faMapMarkerAlt, faRulerCombined, faSortAmountUp, faStar, faTags, faTrademark, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import NetworkImageComponent from '../../core/network_image_component';

function ProductViewComponent(props) {
    const navigator = useNavigate();

    // const state = useSelector(props.products);

    const [images, setImages] = useState(props.product.images ? [
        'products/' + props.product.images[0],
        'products/' + props.product.images[1],
        'products/' + props.product.images[2],
    ] : [])

    return (
        <div className='product-view-component-root'>
            <div className='product-view-component-content'>
                {
                    props.product.images ?
                        <div className='product-view-images-section'>
                            <NetworkImageComponent className='product-view-main-image'
                                src={images[0]} />
                            <div className='product-view-images-row'>
                                <NetworkImageComponent className='product-view-image-item'
                                    src={images[1]}
                                    onClick={() => setImages([images[1], images[0], images[2]])} />
                                <SpaceComponent width={'18px'} />
                                <NetworkImageComponent className='product-view-image-item'
                                    src={images[2]}
                                    onClick={() => setImages([images[2], images[1], images[0]])} />
                            </div>
                        </div> : <></>
                }
                <div className='product-view-details-section'>
                    <h4 className='product-view-details-title'>
                        {props.product.name}
                    </h4>
                    <div className='product-view-details-rating'>
                        <div className='product-reviews-rating'>
                            {Array.from({ length: Math.floor(props.product.rating) }, (_, index) => index + 1).map((idx) =>
                                <FontAwesomeIcon key={idx} className='product-reviews-rating-icon'
                                    icon={faStar} />
                            )
                            }
                        </div>
                        <SpaceComponent width={'10px'} />
                        <h4 className='product-view-details-sub-title'>
                            {props.product.rating} rating . {props.product.reviews}+ reviews
                        </h4>
                    </div>
                    <h4 className='product-view-details-discriptions'>
                        {props.product.shortDescription}
                    </h4>
                    <SpaceComponent height={'15px'} />
                    <div className='product-view-details-permissions'>
                        <div className='product-view-button'
                            onClick={() => {
                                navigator('/branches/branches-home/' + props.product.branchId);
                            }}>
                            Product Branch
                            <SpaceComponent width={'10px'} />
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </div>
                        <SpaceComponent width={'10px'} />
                        <div className='product-view-button'
                            onClick={() => {
                            }}>
                            Product in Amazon
                            <SpaceComponent width={'10px'} />
                            <FontAwesomeIcon icon={faExternalLink} />
                        </div>
                    </div>
                    <SpaceComponent height={'15px'} />
                    <div className='product-view-details-info'>
                        {props.product.colors && props.product.colors.length != 0 ?
                            <div className='product-view-details-info-row'>
                                <h4 className='product-view-details-sub-title'>
                                    Colors
                                </h4>
                                <SpaceComponent width={'10px'} />
                                <div className='product-view-details-info-row-inside'>
                                    <div className='product-view-details-info-row-color'
                                        style={{ backgroundColor: props.product.colors[0] }} />
                                    <SpaceComponent width={'10px'} />
                                    <div className='product-view-details-info-row-color'
                                        style={{ backgroundColor: props.product.colors[1] }} />
                                    <SpaceComponent width={'10px'} />
                                    <div className='product-view-details-info-row-color'
                                        style={{ backgroundColor: props.product.colors[2] }} />
                                    <SpaceComponent width={'10px'} />
                                    <div className='product-view-details-info-row-color'
                                        style={{ backgroundColor: props.product.colors[3] }} />
                                    <SpaceComponent width={'10px'} />
                                </div>
                            </div> : <></>}
                        <SpaceComponent width={'15px'} />
                        {props.product.sizes && props.product.sizes.length != 0 ?
                            <div className='product-view-details-info-row'>
                                <h4 className='product-view-details-sub-title'>
                                    Sizes
                                </h4>
                                <SpaceComponent width={'10px'} />
                                <div className='product-view-details-info-row-inside'>
                                    {Array.from({ length: props.product.sizes.length }, (_, index) => index).map((idx) =>
                                        <h5 style={{ padding: '4px' }}>{props.product.sizes[idx] + '. '}</h5>
                                    )
                                    }
                                </div>
                            </div> : <></>}
                    </div>
                    <SpaceComponent height={'8px'} />
                    <div className='product-view-details-meta'>
                        <div className='product-view-details-meta-column'>
                            <div className='product-view-details-meta-columnitem'>
                                <FontAwesomeIcon icon={faDollarSign} />
                                <SpaceComponent width={'8px'} />
                                <h4 className='product-view-details-discriptions'>
                                    {props.product.price}$
                                </h4>
                            </div>
                            <SpaceComponent height={'8px'} />
                            <div className='product-view-details-meta-columnitem'>
                                <FontAwesomeIcon icon={faTags} />
                                <SpaceComponent width={'8px'} />
                                <h4 className='product-view-details-discriptions'>
                                    {props.product.category}
                                </h4>
                            </div>
                            <SpaceComponent height={'8px'} />
                            <div className='product-view-details-meta-columnitem'>
                                <FontAwesomeIcon icon={faRulerCombined} />
                                <SpaceComponent width={'8px'} />
                                <h4 className='product-view-details-discriptions'>
                                    {/* 10cm w - 14.3 h */}
                                    {props.product.dimesion}
                                </h4>
                            </div>
                        </div>
                        <SpaceComponent width={'8px'} />
                        <div className='product-view-details-meta-column'>
                            <div className='product-view-details-meta-columnitem'>
                                <FontAwesomeIcon icon={faTrademark} />
                                <SpaceComponent width={'8px'} />
                                <h4 className='product-view-details-discriptions'>
                                    {props.product.brand}
                                </h4>
                            </div>
                            <SpaceComponent height={'8px'} />
                            <div className='product-view-details-meta-columnitem'>
                                <FontAwesomeIcon icon={faSortAmountUp} />
                                <SpaceComponent width={'8px'} />
                                <h4 className='product-view-details-discriptions'>
                                    +{props.product.amount} item
                                </h4>
                            </div>
                            <SpaceComponent height={'8px'} />
                            <div className='product-view-details-meta-columnitem'>
                                <FontAwesomeIcon icon={faWeightHanging} />
                                <SpaceComponent width={'8px'} />
                                <h4 className='product-view-details-discriptions'>
                                    {props.product.weight} kg
                                </h4>
                            </div>
                        </div>
                    </div>
                    <SpaceComponent height={'10px'} />
                    {props.product.features && props.product.features.length != 0 ?
                        <div className='product-view-details-features'>
                            <h4 className='product-view-details-sub-title'>
                                Features:
                            </h4>
                            <ul className='product-view-details-features-list'>
                                {props.product.features.map((feature, index) => <li key={index} >
                                    {feature}</li>)}
                            </ul>
                        </div> : <></>}

                </div>
            </div>
        </div>
    );
}

export default ProductViewComponent;