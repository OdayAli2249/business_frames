import React, { useEffect, useRef, useState } from 'react';
import CarouselComponent from '../../core/carousel_component/carousel_component';
import './product_view_edit_component.css';
import ProductViewComponent from './product_view_component';
import SpaceComponent from '../../core/space_component';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateProductFormComponent from '../form_components/create_product_form_component';

function ProductViewEditComponent(props) {

    const [currentTab, setCurrentTab] = useState(0);
    const carouselRef = useRef(null);
    useEffect(() => {
        if (props.tab == 2) {
            carouselRef.current.goto(1);
            setCurrentTab(1);
        }
    }, []);

    return (
        <div className='product-view-edit-component-root'>
            {props.product.permissions && props.product.permissions.map(permission => permission[1]).includes('1') &&
                <FontAwesomeIcon className='product-view-edit-floating-edit-button'
                    icon={faEdit}
                    onClick={() => {
                        carouselRef.current.goto(1);
                        setCurrentTab(1);
                    }} />}
            <div className='product-view-edit-component-content'>
                <div className='product-view-edit-header'>
                    <h4 className='product-view-edit-header-title'>
                        Product Details
                    </h4>
                </div>
                <div className='product-view-edit-tab-bar'>
                    <div className='product-view-edit-tab-bar-button'
                        onClick={() => {
                            carouselRef.current.goto(0);
                            setCurrentTab(0);
                        }}
                        style={{ borderBottom: currentTab == 0 ? '5px solid black' : null }}>
                        View
                    </div>
                    <SpaceComponent width={'12px'} />
                    {props.product.permissions && props.product.permissions.map(permission => permission[1]).includes('1') ?
                        <div className='product-view-edit-tab-bar-button'
                            onClick={() => {
                                carouselRef.current.goto(1);
                                setCurrentTab(1);
                            }}
                            style={{ borderBottom: currentTab == 1 ? '5px solid black' : null }}>
                            Update
                        </div> : <></>}
                </div>
                <div className='product-view-edit-carousel-container'>
                    {props.product.permissions && props.product.permissions.map(permission => permission[1]).includes('1') ?
                        <CarouselComponent itemsToShow={1}
                            ref={carouselRef}
                            onChange={(index) => setCurrentTab(index)} >
                            <ProductViewComponent product={props.product} />
                            <CreateProductFormComponent product={props.product} onSubmit={props.onSubmit} />
                        </CarouselComponent> :
                        <ProductViewComponent product={props.product} />}
                </div>
            </div>
        </div>
    );
}

export default ProductViewEditComponent;