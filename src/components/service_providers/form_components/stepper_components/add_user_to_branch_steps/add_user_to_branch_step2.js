import React, { useState, forwardRef } from 'react';
import './add_user_to_branch_step2.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpaceComponent from '../../../../core/space_component';
import { useNavigate } from 'react-router-dom';

const AddUserToBranchStep2 = forwardRef((props, ref) => {

    const [isValid, setIsValid] = useState(null);
    const navigator = useNavigate();

    const validate = () => {
        let validationResult = true;  // to do call child level function to determine that
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
        <div className='add-user-to-branch-step2-root'
            style={props.style}
            ref={ref}>
            <div className='provid-permissions-row'>
                <img src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/permissions.png'} className='provid-permissions-image' />
                <SpaceComponent width={'15px'} />
                <div className='provid-permissions-column'>
                    <h4 className='provid-permissions-side-text'>
                        Almost done! you just have to give this user permission -optional-
                        or else he can not do any thing as member in this service provider.
                    </h4>
                    <SpaceComponent height={'15px'} />
                    <div className='provid-permissions-button'
                        onClick={() => navigator('/branches/branch-permission-group-create/' + props.branchId)}>
                        <h4 className='provid-permissions-samll-text'>Add</h4>
                        <SpaceComponent width={'15px'} />
                        <FontAwesomeIcon className='provid-permissions-button-icon'
                            icon={faPlus} />
                    </div>
                </div>
            </div>
            <br />
            {isValid == false ? 'not valid' : ''}
        </div>
    );
});

export default AddUserToBranchStep2;