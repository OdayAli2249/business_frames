import React, { useState, forwardRef, useEffect } from 'react';
import './add_user_to_branch_step1.css'
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../../../core/pagination_components/pagination_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../../../core/space_component';
import BranchesCarouselCardComponent from '../../../../branches/cards/branches_carousel_card_component';
import { getBranches } from '../../../../../state_management/middlewares/branches_middleware';

const AddUserToBranchStep1 = forwardRef((props, ref) => {

    const [isValid, setIsValid] = useState(null);
    const navigator = useNavigate();
    const [selectedItems, setSelectedItems] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const validate = () => {
        let validationResult = selectedItems.length != 0;  // to do call child level functio to determine that
        if (validationResult) {
            setIsValid(true)
            props.next(props.branchKey == 'source' ?
                { sourceBranches: selectedItems } : { targetBranch: selectedItems })
        }
        else setIsValid(false)
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));
    return (
        <div className='add-user-to-branch-step1-root' style={props.style}
            ref={ref}>
            <div className='service-provider-branches-dialog-content-grid-container'>
                <div className='add-user-row'>
                    <h3 className='add-user-samll-text'>
                        {props.title}
                    </h3>
                    <SpaceComponent width={'10px'} />
                    <FontAwesomeIcon className='add-user-icon' onClick={props.onClose}
                        icon={faUser} />
                    <FontAwesomeIcon className='add-user-icon' onClick={props.onClose}
                        icon={faPlus} />
                </div>
                {isValid == false ? <h3 className='add-user-samll-error-text'>
                    It is required to select branch before you go to the next step
                </h3> : <></>}
                <PaginationComponent
                    // id={'resources-explorer'}
                    initialView={{
                        grid: true,
                        list: false
                    }}
                    // onCardClicked={() => {
                    //     navigator('/branches/branches-home')
                    // }}
                    pageSize={10}                     // when start fetching data from I/O
                    gridCardSize={windowWidth >= 800 && windowWidth < 1100 ? 'larg' : 'medium'}
                    height={windowHeight > 550 && windowHeight < 700 ? '300px' :
                        windowHeight <= 550 ? '130px' : '380px'}                       // contatnt or auto
                    showFilter={false}
                    showView={false}
                    sideBorders={false}
                    showPages={false}
                    showSearch={false}
                    fetchParams={{ serviceProviderId: props.serviceProviderId }}                    // make sure this is valid id
                    fetchData={getBranches}
                    selectedState={state => state.branches}
                    itemBuilder={(ID, branch) => <BranchesCarouselCardComponent key={ID} selectionMod={props.selectionMod}
                        branch={branch}
                        onItemSelected={() => {
                            if (!selectedItems.includes(branch.id)) {
                                if (props.selectionMod == 'multi')
                                    setSelectedItems([...selectedItems, branch.id])
                                else setSelectedItems([branch.id])
                            }
                            else {
                                let newSelectedItems = [...selectedItems];
                                let indexToRemove = selectedItems.indexOf(branch.id);
                                if (indexToRemove !== -1) {
                                    newSelectedItems.splice(indexToRemove, 1);
                                }
                                setSelectedItems(newSelectedItems)
                            }
                        }}
                        selected={selectedItems.includes(branch.id)} />}
                />
            </div>
            <br />
        </div>
    );
});

export default AddUserToBranchStep1;