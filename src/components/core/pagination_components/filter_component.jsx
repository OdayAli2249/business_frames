import React, { useState } from 'react';
import './filter_component.css'

function FilterComponent(props) {

    const [selectedFilterValuesMap, setSelectedFilterValuesMap] = useState(new Map());
    const [selectedFilterType, setSelectedFilterType] = useState(Array.from(props.filters.keys())[0]);
    // console.log(selectedFilterValuesMap);
    return (
        <div className={props.hidden ? 'hidden-filters-section-root' : 'filters-section-root'}>
            <div className='filter-types'>
                {Array.from(props.filters.keys()).map((key) => (
                    <div className={selectedFilterType === key ?
                        'selected-filter-type' :
                        'filter-type'} key={key} onClick={() => {
                            setSelectedFilterType(key);
                        }}>
                        {key}
                    </div>
                ))}
            </div>
            <div className='filter-type-options'
            >
                {props.filters.get(selectedFilterType).map((option) => (
                    <div className={selectedFilterValuesMap.get(selectedFilterType)
                        && selectedFilterValuesMap.get(selectedFilterType).includes(option) ?
                        'selected-filter-type-option' : 'filter-type-option'}
                        key={option}
                        onClick={() => {
                            var newSelectedFilterValuesMap = new Map(selectedFilterValuesMap);
                            if (selectedFilterValuesMap.get(selectedFilterType)
                                && !selectedFilterValuesMap.get(selectedFilterType).includes(option)) {
                                newSelectedFilterValuesMap.set(selectedFilterType, [...
                                    selectedFilterValuesMap.get(selectedFilterType), option]);
                            }
                            else if (selectedFilterValuesMap.get(selectedFilterType)) {
                                newSelectedFilterValuesMap.set(selectedFilterType,
                                    selectedFilterValuesMap.get(selectedFilterType).filter((opt) => opt !== option))
                            } else {
                                newSelectedFilterValuesMap.set(selectedFilterType, [option])
                            }

                            setSelectedFilterValuesMap(newSelectedFilterValuesMap);
                            props.onFilterChanged(newSelectedFilterValuesMap)         // you may need to put this in useEffect
                        }}>{option}</div>
                ))}
            </div>
        </div>
    );
}

export default FilterComponent;