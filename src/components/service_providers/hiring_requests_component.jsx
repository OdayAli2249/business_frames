import './hiring_requests_component.css';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from '../core/carousel_component/carousel_component';
import HiringRequestCarouselCardComponent from './cards/hiring_request_carousel_card_component';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import DialogComponent from '../core/dialog_components/dialog_component';
import { Operations } from '../../state_management/actions';
import JobApplicationComponent from './dialog_content_component/job_application_component';
import AddMemberToBranchComponent from './dialog_content_component/add_member_to_branch_component';
import { getHiringRequests } from '../../state_management/middlewares/hiring_requests_middleware';
import { modifyHiringRequest, reset } from '../../state_management/middlewares/modify_hiring_request_middleware';
import ConfirmActionComponent from '../core/confirm_action_component';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import CreateJobOfferFormComponent from './form_components/create_job_offer_form_component';

function HiringRequestsComponent(props) {
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
    const carouselRef = useRef(null);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            carouselRef.current.refresh();
            setShowDialog(initialComponentState)
            dispatch(resetAuthStatus())
        }
    });


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
                carouselRef.current.refresh()
        }
    }, [dispatch, createResult]);

    return (
        <div className='hiring-requests-component-root'
            id='/hiring-requests'>
            {createResult.loading && <div className='unfocus' />}
            {role ? <CarouselComponent itemsToShow={(windowWidth >= 700 && windowWidth < 900) ? 3 : windowWidth < 700 ? 2 : 4}
                ref={carouselRef}
                onViewAllClicked={() => navigator('/service-providers/hiring-requests/' + props.id)}
                params={{ serviceProviderId: props.id, role: role, offset: 0, limit: 6 }}
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
                        serviceProviderId={props.id}
                        onSubmit={({ sourceBranches, operation }) => dispatch(modifyHiringRequest(
                            {
                                operation: operation,
                                branchId: sourceBranches[0],
                                users: [showDialog.accept.hiringRequest.user.id],
                            }))} />
                    {/* <CreateJobOfferFormComponent
                                onSubmit={(jobOffer) => { }} /> */}
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
    );
}

export default HiringRequestsComponent