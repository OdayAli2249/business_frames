// import React, { useEffect, useRef, useState } from 'react';
// import './members_wrapper_component.css'
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import MembersExplorerComponent from './members_explorer_component';
// import MembersHomePage from '../../../pages/members/members_home_page';
// import DialogComponent from '../../core/dialog_components/dialog_component';
// import HeaderComponent from '../../layouts/header/header_component';

// function MembersWrapperComponent(props) {

//     const navigator = useNavigate();
//     const [removeAccountDialog, setShowRemoveAccountDialog] = useState(false);
//     const [logoutDialog, setShowLogoutDialog] = useState(false);
//     const [currentSection, setCurrentSection] = useState(null);
//     const explorerRef = useRef(null);
//     const [routingMode, setRoutingMode] = useState('default');
//     const location = useLocation();
//     useEffect(() => {
//         let route = location.pathname.split('/')[2];
//         if (route == 'members-home')
//             setRoutingMode('scroll');
//         else
//             setRoutingMode('default');
//     });

//     return (
//         <div className='members-wrapper-root'>
//             <HeaderComponent optionsType={'members'}
//                 onNavigateClicked={() => { explorerRef.current.openSideBar() }} />
//             <div className='members-wrapper-body'>
//                 <MembersExplorerComponent
//                     ref={explorerRef}
//                     onNavigationChanged=
//                     {(section) => {
//                         if (section == 'remove-account')
//                             setShowRemoveAccountDialog(true)
//                         else if (section == 'log-out')
//                             setShowLogoutDialog(true)
//                         else if (section.split('/').length > 2)
//                             navigator(section)
//                         else if (routingMode == 'scroll')
//                             setCurrentSection(section);
//                         else
//                             navigator('/members' + section)

//                     }}
//                     section={routingMode == 'scroll' ? currentSection : null} />
//                 <div className='members-content-wrapper'>
//                     {(routingMode == 'scroll') ?
//                         <MembersHomePage
//                             onSectionChanged={(section) => {
//                                 setCurrentSection(section);
//                             }}
//                             section={routingMode == 'scroll' ? currentSection : null} /> : <Outlet />}
//                 </div>
//                 <DialogComponent
//                     height={'50'}
//                     show={removeAccountDialog}
//                     onClose={() => setShowRemoveAccountDialog(false)}
//                 />
//                 <DialogComponent
//                     height={'50'}
//                     show={logoutDialog}
//                     onClose={() => setShowLogoutDialog(false)}
//                 />
//             </div>
//         </div>
//     );
// }

// export default MembersWrapperComponent

import { Outlet } from 'react-router-dom';
import HeaderComponent from '../../layouts/header/header_component';
import MembersExplorerComponent from './members_explorer_component';
import React, { useRef } from 'react';
import './members_wrapper_component.css'


function MembersWrapperComponent(props) {
    const explorerRef = useRef(null);

    return (
        <div className='members-wrapper-root'>
            <HeaderComponent optionsType={'members'} selectedState={(state) => state.userById}
                onNavigateClicked={() => { explorerRef.current.openSideBar() }} />
            <div className='members-wrapper-body'>
                <MembersExplorerComponent
                    ref={explorerRef} />
                <div className='members-content-wrapper'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MembersWrapperComponent