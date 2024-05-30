import React, { useState } from 'react';
import './search_control_component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../space_component';

function SearchControlComponent(props) {

    const [value, setValue] = useState('');

    return (
        <div className='home-header-search-bar' style={{ display: props.show ? 'flex' : 'none' }}>
            <input type='text'
                placeholder='Search'
                className='home-search-field'
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}>
            </input>
            {value && <FontAwesomeIcon icon={faClose}
                onClick={() => {
                    setValue('');
                    props.onSearchClicked(null);
                }}
                className='home-header-clear-icon' />}
            <div className='home-search-button'
                onClick={() => props.onSearchClicked(value)}>
                <FontAwesomeIcon icon={faSearch}
                    className='home-header-search-icon' />
            </div>
        </div>
    );
}

export default SearchControlComponent;