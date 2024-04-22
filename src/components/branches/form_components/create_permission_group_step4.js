import React, { useState, forwardRef } from 'react';
import './create_permission_group_step4_style.scss'
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpaceComponent from '../../core/space_component';

const CreatePermissionGroupStep4 = forwardRef((props, ref) => {

    const [isValid, setIsValid] = useState(null);

    const validate = () => {
        let validationResult = true;  // to do call child level functio to determine that
        if (validationResult) {
            setIsValid(true)
            props.next()
        }

        else setIsValid(false)
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='create-permission-group-step4-root'
            style={props.style}
            ref={ref}>
            <div className='create-permission-group-step4-header-title-outer-row'>
                <div className='row-main-space-between-cross-center'>
                    <FontAwesomeIcon icon={faTasks}
                        className='s-background-padding-w-background-color  secondary-icon-color-m-icon-size' />
                    <SpaceComponent width={'20px'} />
                    <h4 className='basic-m-text-size-l-text-weight'>
                        Summary
                    </h4>
                </div>
            </div>
            <SpaceComponent height={'40px'} />
            <div className='create-permission-group-step4-column'>
                <div className='create-permission-group-step4-offer-text-row'>
                    <h4 className='basic-s-text-size-s-text-weight'>
                        <strong>Note</strong> Before creating a permissions group, please be aware that members with assigned permissions will have the capability to perform specific operations on resources. Ensure access is granted judiciously to maintain security and data integrity.
                    </h4>
                </div>
                {/* <div className='create-permission-group-step4-offer-text-row'>
                    <h4 className='basic-s-text-size-s-text-weight'>
                        <strong>Description</strong> we are responsible for creating
                        the new collection of RGX bicycles with the new-modern form
                        and features.
                    </h4>
                </div>
                <div className='row-main-center-cross-start'>
                    <h4 className='basic-s-text-size-s-text-weight'>
                        <strong>Operations</strong> edit - create - delete
                    </h4>
                </div>
                <div className='create-permission-group-step4-offer-text-row'>
                    <h4 className='basic-s-text-size-s-text-weight'>
                        <strong>Members</strong> ammar - oday - mohammed - hani - yasser - omar
                    </h4>
                </div>
                <div className='create-permission-group-step4-offer-text-row'>
                    <h4 className='basic-s-text-size-s-text-weight'>
                        <strong>Resources</strong>
                        products : RGX bic - Cable bic - refrigerators
                        services : fixing with YSD
                    </h4>
                </div> */}
            </div>
            <br />
            {isValid == false ? 'not valid' : ''}
        </div>
    );
});

export default CreatePermissionGroupStep4;