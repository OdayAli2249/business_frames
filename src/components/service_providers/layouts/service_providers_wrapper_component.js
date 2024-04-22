import React, { useRef } from 'react';
import './service_providers_wrapper_component.css'
import { Outlet } from 'react-router-dom';
import ServiceProvidersExplorerComponent from './service_providers_explorer_component';
import HeaderComponent from '../../layouts/header/header_component';

function ServiceProvidersWrapperComponent(props) {
    const explorerRef = useRef(null);

    return (
        <div className='service-providers-wrapper-root'>
            <HeaderComponent optionsType={'service-providers'} selectedState={(state) => state.serviceProviderById}
                onNavigateClicked={() => { explorerRef.current.openSideBar() }} />
            <div className='service-providers-wrapper-body'>
                <ServiceProvidersExplorerComponent
                    ref={explorerRef} />
                <div className='service-providers-content-wrapper'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ServiceProvidersWrapperComponent