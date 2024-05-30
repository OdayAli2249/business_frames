import React from 'react';
import './create_service_provider_page.css';
import CreateServiceProviderStepperComponent from '../../components/service_providers/form_components/stepper_components/create_service_provider_stepper_component';
import { useParams } from 'react-router-dom';


function CraeteServiceProviderPage(props) {
    
    const { id } = useParams();

    return (
        <div className='create-service-provider-root'>
            <CreateServiceProviderStepperComponent headerPadding={80} height={'540px'} />
        </div>
    );
}

export default CraeteServiceProviderPage