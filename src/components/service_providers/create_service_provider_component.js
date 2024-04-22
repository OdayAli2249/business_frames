import React from 'react';
import './create_service_provider_component.css'
import { useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../core/button_component';


function CreateServiceProviderComponent(props) {
    const navigator = useNavigate();

    return (
        <div className='service-provider-create-component-root'
            id='/service-provider-create'>
            <ButtonComponent label={'Create Service Provider'} icon={faPlus} onClick={() => {
                navigator('/service-providers/service-provider-create/' + props.id)
            }} />
        </div>
    );
}

export default CreateServiceProviderComponent