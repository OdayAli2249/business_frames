import React, { forwardRef, useEffect, useState } from 'react';
import './pagination_body_component.css';
import SpaceComponent from '../space_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faFilter } from '@fortawesome/free-solid-svg-icons';


const PaginationBodyComponent = forwardRef((props, ref) => {

    let initialState = {
        indices: [
            {
                show: false,
                value: -1,
            },
            { value: 1, isSelected: true },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            {
                value: -2,
            }
        ],
        selectedIndex: 1
    }

    const gridCardSize = new Map([
        ['small', 'data-section-small'],
        ['medium', 'data-section-medium'],
        ['larg', 'data-section-larg'],
        ['extra-larg', 'data-section-extra-larg']
    ]);

    const [pageIndices, setPagePageIndices] = useState(initialState);

    const reset = () => {
        setPagePageIndices(initialState)
    };

    React.useImperativeHandle(ref, () => ({
        reset
    }));

    const onPageNumberClick = (number) => {
        if (number > 0) {
            if (number > 2) {
                setPagePageIndices({
                    indices: [
                        { value: -1 },
                        { value: number - 2 },
                        { value: number - 1 },
                        { value: number, isSelected: true },
                        { value: number + 1 },
                        { value: number + 2 },
                        { value: -2 }],
                    selectedIndex: number
                }
                )
            } else {
                let state = {
                    indices: [
                        {
                            show: false,
                            value: -1,
                        },
                        { value: 1, isSelected: false },
                        { value: 2, isSelected: false },
                        { value: 3 },
                        { value: 4 },
                        { value: 5 },
                        {
                            value: -2,
                        }],
                    selectedIndex: number
                };
                number == 1 ? state.indices[1].isSelected = true : state.indices[2].isSelected = true;
                setPagePageIndices(state)
            }
        }
    };

    useEffect(() => {
        props.onIndicecsChanged(pageIndices.selectedIndex);
    }, [pageIndices]);

    return (
        <div className='content-section' >
            <div className={props.view == 'grid' ?
                gridCardSize.get(props.gridCardSize)
                : 'data-section-list'}
                style={props.sideBorders == false ?
                    { height: props.height, border: '0px' } : { height: props.height }}>
                {props.children}
            </div>
            <SpaceComponent height={'30px'} />
            {props.showPages ?
                <div className='page-number-section'>
                    {pageIndices.indices.map((val, index) =>
                    (<div key={index} className={val.isSelected ? 'selected-page-number-container' : 'page-number-container'}
                        onClick={
                            () => { onPageNumberClick(val.value) }
                        }>
                        {val.value == -1 ?
                            <FontAwesomeIcon icon={faCaretLeft} />
                            : val.value == -2 ? <FontAwesomeIcon icon={faCaretRight} />
                                : val.value}
                    </div>)
                    )}
                </div> : <></>
            }
        </div>
    );
})

export default PaginationBodyComponent;