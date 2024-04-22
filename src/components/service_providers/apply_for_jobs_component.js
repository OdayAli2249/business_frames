import React, { useEffect, useRef, useState } from 'react';
import './apply_for_jobs_component.css'
import CarouselComponent from '../core/carousel_component/carousel_component';
import DialogComponent from '../core/dialog_components/dialog_component';
import { useNavigate } from 'react-router-dom';
import JobOfferCarouselCardComponent from './cards/job_offer_carousel_card_component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateJobOfferFormComponent from './form_components/create_job_offer_form_component';
import ButtonComponent from '../core/button_component';
import SpaceComponent from '../core/space_component';
import JobOfferComponent from './dialog_content_component/job_offer_component';
import ApplyForJobFormComponent from './form_components/apply_for_job_form_component';
import { Operations } from '../../state_management/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { getJobOffers } from '../../state_management/middlewares/job_offers_middleware';
import { modifyJobOffer, reset } from '../../state_management/middlewares/modify_job_offer_middleware';
import ConfirmActionComponent from '../core/confirm_action_component';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import { getServiceProviderById } from '../../state_management/middlewares/service_provider_by_id_middleware';


function ApplyForJobsComponent(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navigator = useNavigate();
    const [role, setRole] = useState(null);
    const state = useSelector(state => state.serviceProviderById);

    useEffect(() => {
        setRole(state.data && state.data.item ? state.data.item.userRole : null);
    }, [state]);

    const initialComponentState = {
        view: { show: false, jobOffer: null },
        add: { show: false },
        apply: { show: false, higherZIndex: false, },
        remove: { show: false, jobOfferId: null, higherZIndex: false, },
    }

    const [showDialog, setShowDialog] = useState(initialComponentState);


    const createResult = useSelector(state => state.modifyJobOffer);
    const dispatch = useDispatch();
    const carouselRef = useRef(null);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            carouselRef.current.refresh();
            setShowDialog(initialComponentState)
            dispatch(resetAuthStatus())
            dispatch(getServiceProviderById({ serviceProviderId: props.id, withRoles: true }));
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
        <div className='apply-for-jobs-component-root'
            id='/apply-for-jobs'>
            {createResult.loading && <div className='unfocus' />}
            <CarouselComponent itemsToShow={(windowWidth >= 700 && windowWidth < 900) ? 2 : windowWidth < 700 ? 1 : 3}
                onViewAllClicked={() => navigator('/service-providers/apply-for-jobs')}   // deprecated
                ref={carouselRef}
                label={'Jobs'}
                params={{ serviceProviderId: props.id, role: role }}
                fetchData={getJobOffers}
                selectedState={state => state.jobOffers}
                itemBuilder={(ID, jobOffer) => <JobOfferCarouselCardComponent
                    jobOffer={jobOffer}
                    key={ID}
                    role={role}
                    user={user.data}
                    onRemoveClicked={() => {
                        setShowDialog({
                            ...showDialog,
                            remove: { show: true, jobOfferId: jobOffer.id, higherZIndex: false, }
                        });
                    }}
                    onApplyClicked={() => {
                        setShowDialog({
                            ...showDialog, apply: { show: true, higherZIndex: false, }
                        });
                    }}
                    onViewClicked={() => {
                        setShowDialog({ ...showDialog, view: { show: true, jobOffer: jobOffer } });
                    }}
                />} />
            {role != null && role == 'master' ?
                <SpaceComponent height={'20px'} /> : <></>}
            {role != null && role == 'master' ?
                <ButtonComponent label={'Add job offer'} icon={faPlus} onClick={() =>
                    setShowDialog({ ...showDialog, add: { show: true } })} /> : <></>
            }

            {showDialog.view.show ?
                <DialogComponent
                    mod={'fill'}
                    show={showDialog.view.show}
                    onClose={() => setShowDialog({ ...showDialog, view: { show: false, jobOffer: null } })}>
                    <JobOfferComponent jobOffer={showDialog.view.jobOffer}
                        role={role}
                        user={user.data}
                        onRemoveClicked={() => {
                            setShowDialog({
                                ...showDialog,
                                remove: { show: true, jobOfferId: showDialog.view.jobOffer.id, higherZIndex: true, }
                            });
                        }}
                        onApplyClicked={() => {
                            setShowDialog({
                                ...showDialog, apply: { show: true, higherZIndex: true, }
                            });
                        }} />
                </DialogComponent> : <></>
            }

            <DialogComponent
                higherZIndex={showDialog.remove.higherZIndex}
                show={showDialog.remove.show}
                height='50'
                onClose={() => setShowDialog({ ...showDialog, remove: { show: false, jobOfferId: null, higherZIndex: false } })}>
                <ConfirmActionComponent
                    text={'Are you sure you want to remove this job application?'}
                    positiveAction={'Confirm'}
                    negativeAction={'Cancel'}
                    onNegativeAction={() => setShowDialog({ ...showDialog, remove: { show: false, jobOfferId: null, higherZIndex: false } })}
                    onPositiveAction={() => {
                        dispatch(modifyJobOffer({
                            serviceProviderId: props.id,
                            jobOfferId: showDialog.remove.jobOfferId,
                            operation: Operations.REMOVE
                        }));
                        setShowDialog({ ...showDialog, remove: { show: false, jobOfferId: null } });
                    }} />
            </DialogComponent>

            {showDialog.add.show ?
                <DialogComponent
                    mod={'fill'}
                    show={showDialog.add.show}
                    onClose={() => setShowDialog({ ...showDialog, add: { show: false, jobOffer: null } })}>
                    <CreateJobOfferFormComponent
                        onSubmit={(jobOffer) => dispatch(modifyJobOffer(
                            {
                                serviceProviderId: props.id,
                                jobOffer: jobOffer,
                                operation: Operations.CREATE,
                                subject: 'job-offer'
                            }))} />
                </DialogComponent> : <></>
            }

            <DialogComponent
                mod={'fill'}
                higherZIndex={showDialog.apply.higherZIndex}
                show={showDialog.apply.show}
                onClose={() => setShowDialog({ ...showDialog, apply: { show: false, higherZIndex: false } })}>
                <ApplyForJobFormComponent
                    onSubmit={(hiringRequest) => dispatch(modifyJobOffer(
                        {
                            serviceProviderId: props.id,
                            hiringRequest: hiringRequest,
                            operation: Operations.CREATE,
                            subject: 'hiring-request'
                        }))} />
            </DialogComponent>
        </div>
    );
}

export default ApplyForJobsComponent