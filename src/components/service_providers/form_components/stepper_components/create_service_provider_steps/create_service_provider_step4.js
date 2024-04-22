import React, { useState, forwardRef, useEffect } from 'react';
import './create_service_provider_step4.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../../../core/space_component';
import TextFieldControlComponent from '../../../../core/form_components/controls/text_field_control_component';
import FilePickerControlComponent from '../../../../core/form_components/controls/file_picker_control_component';
import TextAreaControlComponent from '../../../../core/form_components/controls/text_area_control_component';
import { Validations, Validator } from '../../../../../helpers/validators';
import ButtonComponent from '../../../../core/button_component';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { BranchModel } from '../../../../../models/branch_model';
import { createBranch, reset } from '../../../../../state_management/middlewares/create_branch_middleware';
import { useNavigate } from 'react-router-dom';

const CreateServiceProviderStep4 = forwardRef((props, ref) => {

    const createResult = useSelector(state => state.createBranch);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && navigator('/branches/branches-home/' + createResult.data.id)
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
        }
    }, [dispatch, createResult]);

    const [state, setState] = useState({
        name: null,
        summary: null,
        market: null,
        marketPercentage: null,
        reviews: [null, null, null, null, null],
        logoUrl: null,
        promotionPhotos: [null, null, null],
    });
    const [errorMessages, setErrorMessages] = useState({
        nameErrorMessage: null,
        summaryErrorMessage: null,
        marketErrorMessage: null,
        marketPercentageErrorMessage: null,
        reviewsErrorMessage: [null, null, null, null, null],
        logoUrlErrorMessage: null,
        promotionPhotosErrorMessage: [null, null, null],
    });

    const validate = (callBack) => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.nameErrorMessage = Validator.validate(state.name, [Validations.REQUIRED]);
        newErrorMessages.summaryErrorMessage = Validator.validate(state.summary, [Validations.REQUIRED]);
        newErrorMessages.marketErrorMessage = Validator.validate(state.market, [Validations.REQUIRED]);
        newErrorMessages.marketPercentageErrorMessage = Validator.validate(state.marketPercentage, [Validations.REQUIRED]);
        for (var i = 0; i < 5; i++)
            newErrorMessages.reviewsErrorMessage[i] = Validator.validate(state.reviews[i], [Validations.REQUIRED]);
        newErrorMessages.logoUrlErrorMessage = Validator.validate(state.logoUrl, [Validations.REQUIRED]);
        for (var i = 0; i < 3; i++)
            newErrorMessages.promotionPhotosErrorMessage[i] = Validator.validate(state.promotionPhotos[i], [Validations.REQUIRED]);

        let valid = newErrorMessages.nameErrorMessage == null &&
            newErrorMessages.summaryErrorMessage == null &&
            newErrorMessages.marketPercentageErrorMessage == null &&
            newErrorMessages.marketErrorMessage == null &&
            newErrorMessages.logoUrlErrorMessage == null &&
            newErrorMessages.reviewsErrorMessage[0] == null &&
            newErrorMessages.reviewsErrorMessage[1] == null &&
            newErrorMessages.reviewsErrorMessage[2] == null &&
            newErrorMessages.reviewsErrorMessage[3] == null &&
            newErrorMessages.reviewsErrorMessage[4] == null &&
            newErrorMessages.promotionPhotosErrorMessage[0] == null &&
            newErrorMessages.promotionPhotosErrorMessage[1] == null &&
            newErrorMessages.promotionPhotosErrorMessage[2] == null;

        setErrorMessages(newErrorMessages);
        if (valid)
            callBack();
    };


    return (
        <div className='create-service-provider-step4-root' style={props.style} ref={ref}>
            <div className='step4-section'>
                <div className='step4-header-title-outer-row'>
                    <div className='step4-header-title-row'>
                        <FontAwesomeIcon icon={faMapMarkerAlt}
                            style={{
                                width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                borderRadius: '10px', padding: '10px'
                            }} />
                        <SpaceComponent width={'20px'} />
                        <h4 className='step4-header-title-text'>
                            Branches
                        </h4>
                    </div>
                </div>
                <SpaceComponent height={'20px'} />
                <div className='step4-container'>
                    {/* <SpaceComponent height={'20px'} />
                    <div className='step4-branches-row'>
                        {Array.from({ length: branchesNumber }, (_, index) => index + 1).map((index) =>
                            <h4 className={(errorMessages[branchesNumber - 1].summaryErrorMessage == null &&
                                errorMessages[branchesNumber - 1].marketErrorMessage == null &&
                                errorMessages[branchesNumber - 1].percentageErrorMessage == null) ?
                                (selectedBranch == index ? 'selected-step4-branch-text' :
                                    'step4-branch-text') : 'error-step4-branch-text'}
                                onClick={() => setSelectedBranch(index)}>
                                Branch {index}
                            </h4>
                        )
                        }
                        {branchesNumber < 5 ? <FontAwesomeIcon className='step4-add-branch'
                            icon={faPlus}
                            onClick={() => { setBranchesNumber(branchesNumber + 1) }} /> : <></>}
                        {branchesNumber > 1 ? <FontAwesomeIcon className='step4-add-branch'
                            icon={faMinus}
                            onClick={() => {
                                if (selectedBranch == branchesNumber)
                                    setSelectedBranch(branchesNumber - 1)
                                setBranchesNumber(branchesNumber - 1)
                            }} /> : <></>}
                    </div> 
                    <SpaceComponent height={'30px'} />
                    <h4 className='step1-header-title-text'>
                        Branch #{selectedBranch}
                    </h4>*/}
                    <SpaceComponent height={'20px'} />
                    <div className='step4-row'>
                        <div className='step4-left-column'>
                            <TextFieldControlComponent
                                hint={'name'}
                                label={'Name'}
                                type={'text'}
                                initialValue={state.percentage}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, name: value })
                                }}
                                errorMessage={errorMessages.nameErrorMessage} />
                            <SpaceComponent height={'20px'} />
                            <TextAreaControlComponent
                                label={'Summry'}
                                initialValue={state.summary}
                                onChange={(value) => {
                                    setState({ ...state, summary: value })
                                }}
                                maxLength={5000}
                                errorMessage={errorMessages.summaryErrorMessage}
                                hint={'enter summary info'} />
                            <SpaceComponent height={'20px'} />
                        </div>
                        <div className='step4-right-column'>
                            <TextAreaControlComponent
                                label={'Market'}
                                initialValue={state.market}
                                onChange={(value) => {
                                    setState({ ...state, market: value })
                                }}
                                errorMessage={errorMessages.marketErrorMessage}
                                hint={'enter market info'} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                hint={'percentage'}
                                label={'Market percentage'}
                                type={'number'}
                                initialValue={state.percentage}
                                validator={() => { return 'done' }}
                                onChange={(value) => {
                                    setState({ ...state, marketPercentage: value })
                                }}
                                errorMessage={errorMessages.marketErrorMessage} />
                            <SpaceComponent height={'20px'} />
                        </div>
                    </div>
                    <SpaceComponent height={'30px'} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                        <SpaceComponent height={'2px'}
                            width={'94%'}
                            color={'rgb(220,220,220'} />
                    </div>
                    <SpaceComponent height={'30px'} />
                    <h4 className='step1-header-title-text'>
                        Reviews
                    </h4>
                    <SpaceComponent height={'20px'} />
                    <div className='step3-row'>
                        <TextFieldControlComponent
                            style={{ flex: 1 }}
                            hint={''}
                            label={'Star #1'}
                            type={'number'}
                            initialValue={''}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var reviewsList = [...state.reviews];
                                reviewsList[0] = value;
                                setState({ ...state, reviews: reviewsList })
                            }}
                            errorMessage={errorMessages.reviewsErrorMessage[0]} />
                        <SpaceComponent width={'28px'} />
                        <TextFieldControlComponent
                            style={{ flex: 1 }}
                            hint={''}
                            label={'Star #2'}
                            type={'number'}
                            initialValue={''}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var reviewsList = [...state.reviews];
                                reviewsList[1] = value;
                                setState({ ...state, reviews: reviewsList })
                            }}
                            errorMessage={errorMessages.reviewsErrorMessage[1]} />
                        <SpaceComponent width={'28px'} />
                        <TextFieldControlComponent
                            style={{ flex: 1 }}
                            hint={''}
                            label={'Star #3'}
                            type={'number'}
                            initialValue={''}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var reviewsList = [...state.reviews];
                                reviewsList[2] = value;
                                setState({ ...state, reviews: reviewsList })
                            }}
                            errorMessage={errorMessages.reviewsErrorMessage[2]} />
                        <SpaceComponent width={'28px'} />
                        <TextFieldControlComponent
                            style={{ flex: 1 }}
                            hint={''}
                            label={'Star #4'}
                            type={'number'}
                            initialValue={''}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var reviewsList = [...state.reviews];
                                reviewsList[3] = value;
                                setState({ ...state, reviews: reviewsList })
                            }}
                            errorMessage={errorMessages.reviewsErrorMessage[3]} />
                        <SpaceComponent width={'28px'} />
                        <TextFieldControlComponent
                            style={{ flex: 1 }}
                            hint={''}
                            label={'Star #5'}
                            type={'number'}
                            initialValue={''}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var reviewsList = [...state.reviews];
                                reviewsList[4] = value;
                                setState({ ...state, reviews: reviewsList })
                            }}
                            errorMessage={errorMessages.reviewsErrorMessage[4]} />
                    </div>
                    <SpaceComponent height={'30px'} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                        <SpaceComponent height={'2px'}
                            width={'94%'}
                            color={'rgb(220,220,220'} />
                    </div>
                    <SpaceComponent height={'30px'} />
                    <h4 className='step1-header-title-text'>
                        Logo
                    </h4>
                    <SpaceComponent height={'20px'} />
                    <div className='step1-row'>
                        <FilePickerControlComponent
                            label={''}
                            accept={'images'}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                setState({ ...state, logoUrl: value })
                            }}
                            errorMessage={errorMessages.logoUrlErrorMessage} />
                        <SpaceComponent height={'20px'} />
                    </div>
                    <SpaceComponent height={'30px'} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                        <SpaceComponent height={'2px'}
                            width={'94%'}
                            color={'rgb(220,220,220'} />
                    </div>
                    <SpaceComponent height={'30px'} />
                    <h4 className='step1-header-title-text'>
                        Promotion Photos
                    </h4>
                    <SpaceComponent height={'20px'} />
                    <div className='step1-row'>
                        <FilePickerControlComponent
                            label={''}
                            accept={'images'}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var promotionPhotosList = [...state.promotionPhotos];
                                promotionPhotosList[0] = value;
                                setState({ ...state, promotionPhotos: promotionPhotosList })
                            }}
                            errorMessage={errorMessages.promotionPhotosErrorMessage[0]} />
                        <SpaceComponent height={'20px'} />
                        <FilePickerControlComponent
                            label={''}
                            accept={'images'}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var promotionPhotosList = [...state.promotionPhotos];
                                promotionPhotosList[1] = value;
                                setState({ ...state, promotionPhotos: promotionPhotosList })
                            }}
                            errorMessage={errorMessages.promotionPhotosErrorMessage[1]} />
                        <SpaceComponent height={'20px'} />
                        <FilePickerControlComponent
                            label={''}
                            accept={'images'}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var promotionPhotosList = [...state.promotionPhotos];
                                promotionPhotosList[2] = value;
                                setState({ ...state, promotionPhotos: promotionPhotosList })
                            }}
                            errorMessage={errorMessages.promotionPhotosErrorMessage[2]} />
                        <SpaceComponent height={'20px'} />
                    </div>
                    <SpaceComponent height={'30px'} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                        <SpaceComponent height={'2px'}
                            width={'94%'}
                            color={'rgb(220,220,220'} />
                    </div>
                    <SpaceComponent height={'30px'} />
                    <ButtonComponent label={'Create Branch'} icon={faSave} onClick={() => {
                        validate(() => {
                            var branchModel = BranchModel.build(state);
                            dispatch(createBranch({ branch: state, serviceProviderId: props.id }));
                        })
                    }} />
                </div>
            </div>
        </div>
    );
});

export default CreateServiceProviderStep4;