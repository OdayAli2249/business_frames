import React, { Component, forwardRef, useEffect, useRef, useState } from 'react';
import Carousel from 'react-elastic-carousel';
import './carousel_component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import ShimmerCardComponent from '../state_components/shimmer_card_component';
import ErrorComponent from '../state_components/error_component';
import NoDataComponent from '../state_components/no_data_component';
import { useDispatch, useSelector } from 'react-redux';

const CarouselComponent = forwardRef((props, ref) => {

    const carouselRef = useRef(null);
    // const [state, setState] = useState({ isloading: false, isSuccess: true, isFailure: false, })
    const carouselState = useSelector(props.selectedState ? props.selectedState : state => state.blank);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.fetchData)
            dispatch(props.fetchData(props.params))
    }, [])

    const customArrow = ({ type, onClick }) => (
        <div
            className={`custom-arrow-${type}`}
            onClick={onClick}
            style={{
                display: 'none', width: '50px', height: '50%',
                transform: 'scale(55)',
                transform: type === "PREV" ? 'translate(0px, 50%)' : 'translate(-0px, 50%)',
                zIndex: 1,
                justifyContent: 'center', alignItems: 'center',
                borderRadius: '25px',
                backgroundColor: '#333', color: 'white',
                padding: '0px', margin: '0px',
                cursor: 'pointer',
            }}
        >
            {type === "PREV" ? <FontAwesomeIcon icon={faCaretLeft} /> : <FontAwesomeIcon icon={faCaretRight} />}
        </div>
    );

    const goto = (index) => { carouselRef.current.goTo(index); }

    const refresh = () => dispatch(props.fetchData({ ...props.params, byRefresh: true }));

    React.useImperativeHandle(ref, () => ({
        goto, refresh
    }));

    return (
        <div className='carousel-container'>
            {(props.onViewAllClicked || props.label) && <div className='carousel-header'>
                <div className='carousel-title'>
                    {props.label}
                </div>
                {props.onViewAllClicked && <div className='carousel-show-all'
                    onClick={() => {
                        props.onViewAllClicked()
                    }}>
                    View all
                </div>}
            </div>}
            <Carousel
                ref={carouselRef}
                renderArrow={customArrow}
                itemsToShow={props.itemsToShow ? props.itemsToShow : 3}
                onChange={(_, index) => props.onChange ? props.onChange(index) : null} >
                {/* {state.failure ? <ErrorComponent /> :
                    state.data && state.data.items.length == 0 == 0 ? <NoDataComponent /> :
                        state.isloading ?
                            Array.from({ length: props.itemsToShow ? props.itemsToShow : 3 },
                                (_, index) => index + 1).map((index) => <ShimmerCardComponent type={'grid'} />)
                            : props.children} */}
                {carouselState.info ? props.children :
                    carouselState.failure ? <ErrorComponent message={carouselState.failure.description[0].slice(2)} onRetry={() => {
                        dispatch(props.fetchData(props.params));
                    }} /> : carouselState.data && carouselState.data.items.length == 0 ? <NoDataComponent /> :
                        Array.from({ length: carouselState.data && carouselState.data.items.length > 2 ? carouselState.data.items.length : 3 },
                            (_, index) => index).map((index) =>
                                carouselState.loading ? <ShimmerCardComponent key={index} type={'grid'} /> :
                                    index >= carouselState.data.items.length ? <div key={index} style={{ width: '95%' }} /> :
                                        props.itemBuilder(index, carouselState.data.items[index])
                            )
                }
            </Carousel>
        </div>
    )
})

export default CarouselComponent;