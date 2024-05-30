import './branch_services_style.scss';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from '../core/carousel_component/carousel_component';
import ServiceCardComponent from '../resources/cards/service_card_component';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { modifyService, reset } from '../../state_management/middlewares/modify_service_middleware';
import { Operations } from '../../state_management/actions';
import { getServices } from '../../state_management/middlewares/services_middleware';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import ServiceViewEditComponent from '../resources/dialog_content_component/service_view_edit_component';
import DialogComponent from '../core/dialog_components/dialog_component';
import ConfirmActionComponent from '../core/confirm_action_component';

function BranchServicesComponent(props) {
    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [showDialog, setShowDialog] = useState({
        edit: { service: null, tab: null },
        remove: { show: false, serviceId: null }
    });


    const createResult = useSelector(state => state.modifyService);
    const dispatch = useDispatch();
    const carouselRef = useRef(null);


    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            }) && setShowDialog({ remove: { show: false, serviceId: null }, edit: { service: null, tab: null } })
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
            if (createResult.success)
                carouselRef.current.refresh()
        }
    }, [dispatch, createResult]);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            carouselRef.current.refresh();
            setShowDialog({ remove: { show: false, serviceId: null }, edit: { service: null, tab: null } });
            dispatch(resetAuthStatus());
        }
    });

    return (
        <div className='branch-services-component-root'
            id='/branch-services'>
            {createResult.loading && <div className='unfocus' />}
            <CarouselComponent itemsToShow={windowWidth < 700 ? 1 : 2}
                ref={carouselRef}
                label={'Services'}
                onViewAllClicked={() => navigator('/branches/branch-services/' + props.id)}
                params={{ branchId: props.id }}
                fetchData={getServices}
                selectedState={state => state.services}
                itemBuilder={(ID, service) => <ServiceCardComponent
                    service={service}
                    key={ID}
                    onViewClicked={() => {
                        setShowDialog({ ...showDialog, edit: { service: service, tab: 1 } });
                    }}
                    onEditClicked={() => {
                        setShowDialog({ ...showDialog, edit: { service: service, tab: 2 } });
                    }}
                    onRemoveClicked={() => {
                        setShowDialog({ ...showDialog, remove: { show: true, serviceId: service.id } });
                    }} />}
            />
            {showDialog.edit.service ?
                <DialogComponent
                    show={showDialog.edit.service ? true : false}
                    closeIconColor={'white'}
                    mod='extra-fill'
                    onClose={() => setShowDialog({ ...showDialog, edit: { service: null, tab: null } })}>
                    <ServiceViewEditComponent service={showDialog.edit.service}
                        tab={showDialog.edit.tab}
                        onSubmit={(serviceModel) => dispatch(modifyService({ service: serviceModel, operation: Operations.EDIT }))} />
                </DialogComponent> : <></>}
            <DialogComponent
                higherZIndex={showDialog.remove.higherZIndex}
                show={showDialog.remove.show}
                height='50'
                onClose={() => setShowDialog({ ...showDialog, remove: { show: false, serviceId: null } })}>
                <ConfirmActionComponent
                    text={'Are you sure you want to remove this service?'}
                    positiveAction={'Confirm'}
                    negativeAction={'Cancel'}
                    onNegativeAction={() => setShowDialog({ ...showDialog, remove: { show: false, serviceId: null } })}
                    onPositiveAction={() => {
                        dispatch(modifyService({
                            serviceId: showDialog.remove.serviceId,
                            operation: Operations.REMOVE
                        }));
                        setShowDialog({ ...showDialog, remove: { show: false, serviceId: null } });
                    }} />
            </DialogComponent>
        </div>
    );
}

export default BranchServicesComponent