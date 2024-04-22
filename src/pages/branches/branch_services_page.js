
import React, { useEffect, useRef, useState } from 'react';
import './branch_services_page.css';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import ServiceCardComponent from '../../components/resources/cards/service_card_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import DialogComponent from '../../components/core/dialog_components/dialog_component';
import CreateServiceFormComponent from '../../components/resources/form_components/create_service_form_component';
import { getServices } from '../../state_management/middlewares/services_middleware';
import ServiceViewEditComponent from '../../components/resources/dialog_content_component/service_view_edit_component';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { modifyService, reset } from '../../state_management/middlewares/modify_service_middleware';
import { Operations } from '../../state_management/actions';
import { useParams } from 'react-router-dom';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import ConfirmActionComponent from '../../components/core/confirm_action_component';


function BranchServicesPage(props) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [showDialog, setShowDialog] = useState({
        add: false,
        edit: { service: null, tab: null },
        remove: { show: false, serviceId: null }
    });

    const { id } = useParams();

    const createResult = useSelector(state => state.modifyService);
    const dispatch = useDispatch();
    const paginationRef = useRef(null);


    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            }) && setShowDialog({ add: false, remove: { show: false, serviceId: null }, edit: { service: null, tab: null } })
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
            if (createResult.success)
                paginationRef.current.refresh()
        }
    }, [dispatch, createResult]);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            paginationRef.current.refresh();
            setShowDialog({ add: false, remove: { show: false, serviceId: null }, edit: { service: null, tab: null } });
            dispatch(resetAuthStatus());
        }
    });

    return (
        <div className='branch-services-root'>
            <ToastContainer position="top-center" autoClose={5000} />
            {createResult.loading && <div className='unfocus' />}
            <div className='branch-services-grid-container'>
                <PaginationComponent
                    ref={paginationRef}
                    filters={new Map([
                        ['filter-type-1', ['filter-type-1-option-1', 'filter-type-1-option-2', 'filter-type-1-option-3',]],
                        ['filter-type-2', ['filter-type-2-option-1', 'filter-type-2-option-2', 'filter-type-2-option-3',]],
                        ['filter-type-3', ['filter-type-3-option-1', 'filter-type-3-option-2', 'filter-type-3-option-3',]]
                    ])}
                    initialView={{
                        grid: true,
                        list: false
                    }}
                    onCardClicked={() => {
                    }}
                    pageSize={6}                     // when start fetching data from I/O
                    gridCardSize={(windowWidth >= 1200 && windowWidth < 1500) ?
                        'extra-larg' : (windowWidth >= 800 && windowWidth < 1200) ? 'extra-larg' : 'larg'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    showView={false}
                    sideBorders={false}
                    showPages={true}
                    showSearch={true}
                    fetchParams={{ branchId: id }}
                    fetchData={getServices}
                    selectedState={state => state.services}
                    // showFloatingAddButton={(data) => data && data.permissions == '100'}
                    onFloatingAddButtonClicked={() => setShowDialog({ ...showDialog, add: true })}
                    showFloatingAddButton={(data) => true}
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
            </div>
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
            {/* {showDialog.add ? */}
            <DialogComponent
                show={showDialog.add}
                onClose={() => setShowDialog({ ...showDialog, add: false })}>
                <CreateServiceFormComponent
                    onSubmit={(serviceModel) => dispatch(modifyService({
                        service: serviceModel,
                        operation: Operations.CREATE,
                        branchId: id
                    }))}
                    dialogMode={true} />
            </DialogComponent>
            {/* : <></>} */}

        </div>
    );
}

export default BranchServicesPage