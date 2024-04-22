import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './all_categories_pop_up.css';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function AllCategoriesPopUp(props) {

    const [showProfilePopUp, setShowProfilePopUp] = useState(false);

    return (
        <div className='all-categories-profile-row'>
            <FontAwesomeIcon icon={faAngleDown} style={{
                color: 'white', width: '20px',
                height: '20px', cursor: 'pointer'
            }}
                onClick={() => {
                    setShowProfilePopUp(!showProfilePopUp);
                }} />
            <div className='all-categories-pop-up-box' style={{ display: showProfilePopUp ? null : 'none' }}>
                <div className='all-categories-pop-up-content'>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default AllCategoriesPopUp;