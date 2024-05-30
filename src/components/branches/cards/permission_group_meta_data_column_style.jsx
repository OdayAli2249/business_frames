import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function PermissionGroupMetaDataColumn(props) {
    return (
        <div className='column-main-center-cross-center'>
            <FontAwesomeIcon icon={props.icon}
                className='secondary-icon-color-m-icon-size' />
            <div className='permission-groups-card-sub-title'>
                {props.label}
            </div>
            <div className='medium-s-text-size-s-text-weight'>
                {props.number}
            </div>
        </div>
    );
}

export default PermissionGroupMetaDataColumn;