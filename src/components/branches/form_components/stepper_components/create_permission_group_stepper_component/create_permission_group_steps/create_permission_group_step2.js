import React, { useState, forwardRef, useEffect } from 'react';
import './create_permission_group_step2_style.scss';
import PaginationComponent from '../../../../../core/pagination_components/pagination_component';
import SelectableListItemComponent from '../../../../../core/selectable_list_item_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpaceComponent from '../../../../../core/space_component';
import { faUsers, faUser } from '@fortawesome/free-solid-svg-icons';
import { getBranchUsers } from '../../../../../../state_management/middlewares/branch_users_middleware';

const CreatePermissionGroupStep2 = forwardRef((props, ref) => {

    const [isValid, setIsValid] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState(props.permissionGroup ? props.permissionGroup.userIds : []);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const validate = () => {
        let validationResult = selectedMembers.length != 0;  // to do call child level functio to determine that
        if (validationResult) {
            setIsValid(true)
            props.next({ userIds: selectedMembers })
        }
        else setIsValid(false)
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='create-permission-group-step2-root'
            style={props.style}
            ref={ref}>
            <div className='select-members-grid-container'>
                <div className='create-permission-group-step2-header-title-outer-row'>
                    <div className='row-main-space-between-cross-center'>
                        <FontAwesomeIcon icon={faUsers}
                            className='s-background-padding-w-background-color  secondary-icon-color-m-icon-size' />
                        <SpaceComponent width={'20px'} />
                        <h4 className='basic-m-text-size-l-text-weight'>
                            Select Members
                        </h4>
                    </div>
                </div>
                {isValid == false ? <h3 className='error-text'>
                    It is required to select one member at least before you go to the next step
                </h3> : <></>}
                <PaginationComponent
                    id={'resources-explorer'}
                    initialView={{
                        grid: true,
                        list: false
                    }}
                    onCardClicked={() => {
                    }}
                    pageSize={8}                     // when start fetching data from I/O
                    gridCardSize={windowWidth >= 800 ? 'extra-larg' : 'larg'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    sideBorders={false}
                    showView={false}
                    showPages={true}
                    showSearch={false}
                    fetchParams={{ branchId: props.branchId }}
                    fetchData={getBranchUsers}
                    selectedState={state => state.branchUsers}
                    itemBuilder={(ID, user) => <SelectableListItemComponent
                        key={ID} selectionMod={props.selectionMod}
                        title={user.firstName + ' ' + user.lastName}
                        defaultIcon={faUser}
                        subtitleFirst={user.experience}
                        subtitleSecond={user.email}
                        image={user.profilePictureUrl ? 'users/' + user.profilePictureUrl : null}
                        onItemSelected={() => {
                            if (!selectedMembers.includes(user.id))
                                setSelectedMembers([...selectedMembers, user.id])
                            else {
                                let newSelectedMembers = [...selectedMembers];
                                let indexToRemove = selectedMembers.indexOf(user.id);
                                if (indexToRemove !== -1) {
                                    newSelectedMembers.splice(indexToRemove, 1);
                                }
                                setSelectedMembers(newSelectedMembers)
                            }
                        }}
                        selected={selectedMembers.includes(user.id)} />}
                />
            </div>
        </div>
    );
});

export default CreatePermissionGroupStep2;