import React, { useEffect, useState } from 'react';
import './product_card_component.css';
import SpaceComponent from '../../core/space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faExternalLinkAlt, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../../core/button_component';
import NetworkImageComponent from '../../core/network_image_component';

function ProductCardComponent(props) {


    return (
        <div className='product-card-component-root'>
            <div className='product-card-row'>
                <div className='product-card-left'>
                    <h4 className='product-card-left-title'>
                        {props.product.name}
                    </h4>
                    <SpaceComponent height={'10px'} />
                    <h4 className='product-view-details-sub-title'>
                        Price {props.product.price}$
                    </h4>
                    <SpaceComponent height={'10px'} />
                    <h4 className='product-card-left-description'>
                        {props.product.shortDescription.length > 70 ? props.product.shortDescription.slice(0, 69) + '...' :
                            props.product.shortDescription}
                    </h4>
                </div>
                <div className='product-card-right'>
                    {props.product.images && <NetworkImageComponent className='product-card-image'
                        src={'products/' + props.product.images[0]} />}
                    <SpaceComponent height={'10px'} />
                    <div className='product-card-rating'>
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
            </div>
            <SpaceComponent height={'15px'} />
            <div className='product-card-info-button-section'>
                <ButtonComponent label={'View'} icon={faExternalLinkAlt} onClick={() => {
                    props.onViewClicked();
                }} />
                <SpaceComponent width={'15px'} height={'15px'} />
                {!props.hideOptions && props.product.permissions && props.product.permissions.map(permission => permission[1]).includes('1') ?
                    <ButtonComponent label={'edit'} icon={faEdit} onClick={() => {
                        props.onEditClicked();
                    }} /> : <></>}
                {!props.hideOptions && props.product.permissions && props.product.permissions.map(permission => permission[2]).includes('1') ?
                    <>
                        <SpaceComponent width={'15px'} height={'15px'} />
                        <ButtonComponent label={'remove'} icon={faTrash} onClick={() => {
                            props.onRemoveClicked();
                        }} /></> : <></>}
            </div>
        </div>
    );
}

export default ProductCardComponent;