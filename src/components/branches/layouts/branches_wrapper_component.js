import React, { useRef } from 'react';
import './branches_wrapper_style.scss'
import { Outlet } from 'react-router-dom';
import BranchesExplorerComponent from './branches_explorer_component';
import HeaderComponent from '../../layouts/header/header_component';


function BranchesWrapperComponent(props) {
    const explorerRef = useRef(null);

    return (
        <div className='branches-wrapper-root'>
            <HeaderComponent optionsType={'branches'} selectedState={(state) => state.branchById}
                onNavigateClicked={() => { explorerRef.current.openSideBar() }} />
            <div className='branches-wrapper-body'>
                <BranchesExplorerComponent
                    ref={explorerRef} />
                <div className='branches-content-wrapper'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default BranchesWrapperComponent