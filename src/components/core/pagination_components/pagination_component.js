import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './pagination_component.css'
import FilterComponent from './filter_component';
import PaginationBodyComponent from './pagination_body_component';
import PaginationViewComponent from './pagination_view_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faLayerGroup, faAdd } from '@fortawesome/free-solid-svg-icons';
import SearchControlComponent from '../form_components/controls/search_control_component';
import SpaceComponent from '../space_component';
import ShimmerCardComponent from '../state_components/shimmer_card_component';
import ErrorComponent from '../state_components/error_component';
import NoDataComponent from '../state_components/no_data_component';
import { useDispatch, useSelector } from 'react-redux';


const PaginationComponent = forwardRef((props, ref) => {

    const state = useSelector(props.selectedState);

    const [optionHeaderState, setOptionHeaderState] = useState(
        {
            filterOptionSelected: false,
            viewOptionSelected: false
        }
    );

    const pagesRef = useRef(null);
    const [filterData, setFilterData] = useState({ ...props.fetchParams, offset: 0, limit: props.pageSize });
    const dispatch = useDispatch();

    const refresh = (n) => dispatch(props.fetchData({ ...filterData, byRefresh: true }));

    React.useImperativeHandle(ref, () => ({
        refresh
    }));

    const [view, setView] = useState(
        props.initialView
    );

    return (
        <div className='pagiantion-component-root'
            id={props.id}>
            {props.showFilter || props.showView || props.showSearch ?
                <SpaceComponent height={'10px'} /> : <></>}

            {props.showFloatingAddButton && props.showFloatingAddButton(state.data) ?
                <FontAwesomeIcon className='floating-add-button'
                    icon={faAdd}
                    onClick={() => {
                        props.onFloatingAddButtonClicked && props.onFloatingAddButtonClicked();
                    }} /> : <></>}

            {/* search section */}
            {props.showFilter || props.showView || props.showSearch ?
                <div className='options-header'>
                    {props.showFilter ?
                        <FontAwesomeIcon icon={faFilter}
                            onClick={
                                () => setOptionHeaderState(prevOptionHeaderState => ({
                                    ...prevOptionHeaderState,
                                    filterOptionSelected: !prevOptionHeaderState.filterOptionSelected
                                }))
                            }
                            className={optionHeaderState.filterOptionSelected ?
                                'selected-option-header-icon' : 'option-header-icon'} />
                        : <></>
                    }
                    {props.showFilter ?
                        <SpaceComponent width={'15px'} />
                        : <></>}
                    {props.showView ?

                        <FontAwesomeIcon icon={faLayerGroup}
                            onClick={
                                () => setOptionHeaderState(prevOptionHeaderState => ({
                                    ...prevOptionHeaderState,
                                    viewOptionSelected: !prevOptionHeaderState.viewOptionSelected
                                }))
                            }
                            className={optionHeaderState.viewOptionSelected ?
                                'selected-option-header-icon' : 'option-header-icon'} />
                        : <></>

                    }
                    <SpaceComponent width={'15px'} />
                    {props.showSearch ?
                        <SearchControlComponent show={true} onSearchClicked={(query) => {
                            pagesRef.current.reset()
                            setFilterData({ ...filterData, pageNumber: 0, limit: props.pageSize, query: query });
                            dispatch(props.fetchData({
                                ...filterData,
                                offset: 0,
                                limit: props.pageSize,
                                query: query
                            }));
                        }} />
                        : <></>
                    }
                </div> : <></>}
            <SpaceComponent height={'4px'} />

            {/* views section */}

            <PaginationViewComponent
                initialView={view}
                onViewChanged={(view) => {
                    setView(view)
                    console.log(view)
                }}
                hidden={!optionHeaderState.viewOptionSelected} />

            {/* filters section */}
            {
                props.showFilter ?
                    <FilterComponent filters={props.filters}
                        onFilterChanged={(selecteFilters) => {
                            console.log(selecteFilters);
                        }}
                        hidden={!optionHeaderState.filterOptionSelected} />
                    : <></>
            }

            {/* content section */}
            <PaginationBodyComponent
                ref={pagesRef}
                onIndicecsChanged={(pageNumber) => {
                    setFilterData({
                        ...filterData,
                        offset: (pageNumber - 1) * props.pageSize,
                        limit: props.pageSize
                    });
                    dispatch(props.fetchData({
                        ...filterData,
                        offset: (pageNumber - 1) * props.pageSize,
                        limit: props.pageSize
                    }));
                }}
                view={view.list || state.failure ||
                    (state.data != null && state.data.items != null && state.data.items.length == 0) ? 'list' : 'grid'}
                gridCardSize={props.gridCardSize}
                height={props.height}                      // constant or auto
                sideBorders={props.sideBorders}
                showPages={props.showPages}>
                {state.failure ? <ErrorComponent message={state.failure.description[0].slice(2)} onRetry={() => {
                    dispatch(props.fetchData(filterData));
                }} /> :
                    state.data && state.data.items.length == 0 ? <NoDataComponent /> :
                        Array.from({
                            length:
                                state.data && state.data.items ? Math.min(props.pageSize, state.data.items.length)
                                    : props.pageSize
                        },
                            (_, index) => index).map((index) =>
                                view.list ? <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                                    {state.loading ? <ShimmerCardComponent type={'list'} /> :
                                        props.itemBuilder(null, state.data.items[index])}
                                    <SpaceComponent height={'10px'} />
                                </div> : state.loading ? <ShimmerCardComponent key={index} type={'grid'} /> :
                                    props.itemBuilder(index, state.data.items[index])
                            )
                }
            </PaginationBodyComponent>
        </div>
    );
})

export default PaginationComponent;