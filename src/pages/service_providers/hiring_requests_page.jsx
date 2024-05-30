import React, { useEffect, useRef, useState } from 'react';
import './hiring_requests_page.css'
import { useNavigate, useParams } from 'react-router-dom';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import HiringRequestCarouselCardComponent from '../../components/service_providers/cards/hiring_request_carousel_card_component';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmActionComponent from '../../components/core/confirm_action_component';
import DialogComponent from '../../components/core/dialog_components/dialog_component';
import { modifyHiringRequest, reset } from '../../state_management/middlewares/modify_hiring_request_middleware';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import { ToastContainer, toast } from 'react-toastify';
import JobApplicationComponent from '../../components/service_providers/dialog_content_component/job_application_component';
import { getHiringRequests } from '../../state_management/middlewares/hiring_requests_middleware';
import AddMemberToBranchComponent from '../../components/service_providers/dialog_content_component/add_member_to_branch_component';
import { Operations } from '../../state_management/actions';


function HiringRequestsPage(props) {

    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [role, setRole] = useState(null);
    const state = useSelector(state => state.serviceProviderById);

    useEffect(() => {
        setRole(state.data && state.data.item ? state.data.item.userRole : null);
    }, [state]);

    const initialComponentState = {
        view: { show: false, hiringRequest: null },
        reject: { show: false, hiringRequestId: null, higherZIndex: false, },
        accept: { show: false, hiringRequest: null, higherZIndex: false, },
        cancel: { show: false, hiringRequestId: null, higherZIndex: false, },
    }

    const [showDialog, setShowDialog] = useState(initialComponentState);


    const createResult = useSelector(state => state.modifyHiringRequest);
    const dispatch = useDispatch();
    const paginationRef = useRef(null);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            paginationRef.current.refresh();
            setShowDialog(initialComponentState)
            dispatch(resetAuthStatus())
        }
    });

    const { id } = useParams();


    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            }) && setShowDialog(initialComponentState)
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

    return (
        <div className='hiring-requests-root'>
            <ToastContainer position="top-center" autoClose={5000} />
            {createResult.loading && <div className='unfocus' />}
            <div className='hiring-requests-grid-container'>
                {role ?
                    <PaginationComponent
                        id={'resources-explorer'}
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
                        showSearch={false}
                        fetchParams={{ serviceProviderId: id, role: role, offset: 0, limit: 6 }}
                        fetchData={getHiringRequests}
                        selectedState={state => state.hiringRequests}
                        itemBuilder={(ID, hiringRequest) => <HiringRequestCarouselCardComponent
                            hiringRequest={hiringRequest}
                            key={ID}
                            role={role}
                            user={user.data}
                            onRejectClicked={() => {
                                setShowDialog({
                                    ...showDialog,
                                    reject: { show: true, hiringRequestId: hiringRequest.id, higherZIndex: false, }
                                });
                            }}
                            onCancelClicked={() => {
                                setShowDialog({
                                    ...showDialog, cancel:
                                        { show: true, hiringRequestId: hiringRequest.id, higherZIndex: false, }
                                });
                            }}
                            onViewClicked={() => {
                                setShowDialog({ ...showDialog, view: { show: true, hiringRequest: hiringRequest } });
                            }}
                            onAcceptClicked={() => {
                                setShowDialog({ ...showDialog, accept: { show: true, hiringRequest: hiringRequest, higherZIndex: false } });
                            }}
                        />}
                    /> : <></>}
                {showDialog.view.show ?
                    <DialogComponent
                        mod={'fill'}
                        show={showDialog.view.show}
                        onClose={() => setShowDialog({ ...showDialog, view: { show: false, hiringRequest: null } })}>
                        <JobApplicationComponent hiringRequest={showDialog.view.hiringRequest}
                            role={role}
                            user={user.data}
                            onRejectClicked={() => {
                                setShowDialog({
                                    ...showDialog, reject: {
                                        show: true, hiringRequestId: showDialog.view.hiringRequest.id,
                                        higherZIndex: true,
                                    }
                                });
                            }}
                            onCancelClicked={() => {
                                setShowDialog({
                                    ...showDialog, cancel: {
                                        show: true, hiringRequestId: showDialog.view.hiringRequest.id,
                                        higherZIndex: true,
                                    }
                                });
                            }}
                            onAcceptClicked={() => {
                                setShowDialog({
                                    ...showDialog, accept: {
                                        show: true,
                                        higherZIndex: true,
                                        hiringRequest: showDialog.view.hiringRequest
                                    }
                                });
                            }} />
                    </DialogComponent> : <></>}
                {showDialog.accept.show ?
                    <DialogComponent
                        mod={'fill'}
                        higherZIndex={showDialog.accept.higherZIndex}
                        show={showDialog.accept.show}
                        onClose={() => setShowDialog({ ...showDialog, accept: { show: false, hiringRequest: null } })}>
                        <AddMemberToBranchComponent stepNumber={0}
                            operation={Operations.ACCEPT}
                            serviceProviderId={id}
                            onSubmit={({ sourceBranches, operation }) => dispatch(modifyHiringRequest(
                                {
                                    operation: operation,
                                    branchId: sourceBranches[0],
                                    users: [showDialog.accept.hiringRequest.user.id],
                                }))} />
                    </DialogComponent> : <></>}
                <DialogComponent
                    higherZIndex={showDialog.reject.higherZIndex}
                    show={showDialog.reject.show}
                    height='50'
                    onClose={() => setShowDialog({ ...showDialog, reject: { show: false, hiringRequestId: null } })}>
                    <ConfirmActionComponent
                        text={'Are you sure you want to reject this job application?'}
                        positiveAction={'Confirm'}
                        negativeAction={'Cancel'}
                        onNegativeAction={() => setShowDialog({ ...showDialog, reject: { show: false, hiringRequestId: null } })}
                        onPositiveAction={() => {
                            dispatch(modifyHiringRequest({
                                hiringRequestId: showDialog.reject.hiringRequestId,
                                operation: Operations.REJECT
                            }));
                            setShowDialog({ ...showDialog, reject: { show: false, hiringRequestId: null } });
                        }} />
                </DialogComponent>
                <DialogComponent
                    higherZIndex={showDialog.cancel.higherZIndex}
                    show={showDialog.cancel.show}
                    height='50'
                    onClose={() => setShowDialog({ ...showDialog, cancel: { show: false, hiringRequestId: null } })}>
                    <ConfirmActionComponent
                        text={'Are you sure you want to cancel this job application?'}
                        positiveAction={'Confirm'}
                        negativeAction={'Cancel'}
                        onNegativeAction={() => setShowDialog({ ...showDialog, cancel: { show: false, hiringRequestId: null } })}
                        onPositiveAction={() => {
                            dispatch(modifyHiringRequest({
                                hiringRequestId: showDialog.cancel.hiringRequestId,
                                operation: Operations.CANCEL
                            }));
                            setShowDialog({ ...showDialog, cancel: { show: false, hiringRequestId: null } });
                        }} />
                </DialogComponent>
            </div>
        </div>
    );
}

export default HiringRequestsPage