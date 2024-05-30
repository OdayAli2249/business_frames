import React, { useState } from 'react';
import './service_provider_details_header_component.css'
import { faChartLine, faPlus } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../core/space_component';
import ButtonComponent from '../../core/button_component';
import DialogComponent from '../../core/dialog_components/dialog_component';
import CreateServiceProviderStep4 from '../form_components/stepper_components/create_service_provider_steps/create_service_provider_step4';
import NetworkImageComponent from '../../core/network_image_component';
import { useSelector } from 'react-redux';

function ServiceProviderDetailsHeaderComponent(props) {

    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const state = useSelector(state => state.serviceProviderById);

    return (
        <div className='service-provider-details-header-component-root'>
            {state.data && state.data.item ?
                <div className='service-provider-details-section'>
                    <h2 className='service-provider-details-info-title-main'>
                        All details
                    </h2>
                    <SpaceComponent height={'10px'} />
                    <div className='service-provider-details-body'>
                        <div className='service-provider-details-info-section'>
                            <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '10px' }}>
                                <h3 className='service-provider-details-info-samll-text'>
                                    {state.data.item.summary}
                                </h3>
                            </div>
                            <SpaceComponent height={'30px'} />
                            <div className='service-provider-details-info-button-section'>
                                <ButtonComponent label={'Create branch'} onClick={() => setShowCreateDialog(true)} icon={faPlus} />
                                <SpaceComponent width={'15px'} />
                                <ButtonComponent label={'Statistics'} icon={faChartLine} />
                            </div>
                            <SpaceComponent height={'15px'} />
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div className='service-provider-details-images-section'>
                            {state.data.item.images[0] && <NetworkImageComponent className='service-provider-details-main-image'
                                src={'service-providers/' + state.data.item.images[0]} />}
                            <SpaceComponent height={'10px'} />
                            <div className='service-provider-details-images-container'>
                                {state.data.item.images[1] && <NetworkImageComponent className='service-provider-details-images'
                                    src={'service-providers/' + state.data.item.images[1]} />}
                                <SpaceComponent width={'10px'} />
                                {state.data.item.images[2] && <NetworkImageComponent className='service-provider-details-images'
                                    src={'service-providers/' + state.data.item.images[2]} />}
                                <SpaceComponent width={'10px'} />
                                {state.data.item.images[3] && <NetworkImageComponent className='service-provider-details-images'
                                    src={'service-providers/' + state.data.item.images[3]} />}
                            </div>
                        </div>
                    </div>
                </div> : <></>}
            {showCreateDialog ?
                <DialogComponent
                    show={showCreateDialog}
                    height='95'
                    onClose={() => setShowCreateDialog(false)}>
                    <CreateServiceProviderStep4 id={props.id} />
                </DialogComponent> : <></>}
        </div>
    );
}

export default ServiceProviderDetailsHeaderComponent;