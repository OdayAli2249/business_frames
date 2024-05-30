import React, { useEffect, useState } from 'react';
import './create_service_form_component.css';
import TextFieldControlComponent from '../../core/form_components/controls/text_field_control_component';
import { faCogs, faDollarSign, faSave, faStar, faVoteYea, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpaceComponent from '../../core/space_component';
import TextAreaControlComponent from '../../core/form_components/controls/text_area_control_component';
import FilePickerControlComponent from '../../core/form_components/controls/file_picker_control_component';
import { Validations, Validator } from '../../../helpers/validators';
import { useDispatch, useSelector } from 'react-redux';
import { ServiceModel } from '../../../models/service_model';
import { createService } from '../../../state_management/middlewares/create_service_middleware';
import { ToastContainer, toast } from 'react-toastify';
import { reset } from '../../../state_management/middlewares/create_service_middleware';

function CreateServiceFormComponent(props) {

    const [state, setState] = useState({
        id: props.service ? props.service.id : null,
        name: null,
        rating: null,
        reviews: null,
        shortDescription: null,
        price: null,
        description: null,
        scope: null,
        features: [null, null, null, null],
        images: [null, null, null]
    });
    const [errorMessages, setErrorMessages] = useState({
        nameErrorMessage: null,
        ratingErrorMessage: null,
        reviewsErrorMessage: null,
        shortDescriptionErrorMessage: null,
        priceErrorMessage: null,
        descriptionErrorMessage: null,
        scopeErrorMessage: null,
        featuresErrorMessage: [null, null, null, null],
        imagesErrorMessage: [null, null, null]
    });
    const validate = (callBack) => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.nameErrorMessage = Validator.validate(state.name, [Validations.REQUIRED]);
        newErrorMessages.ratingErrorMessage = Validator.validate(state.rating, [Validations.REQUIRED]);
        newErrorMessages.reviewsErrorMessage = Validator.validate(state.reviews, [Validations.REQUIRED]);
        newErrorMessages.shortDescriptionErrorMessage = Validator.validate(state.shortDescription, [Validations.REQUIRED]);
        newErrorMessages.priceErrorMessage = Validator.validate(state.price, [Validations.REQUIRED]);
        newErrorMessages.descriptionErrorMessage = Validator.validate(state.description, [Validations.REQUIRED]);
        newErrorMessages.scopeErrorMessage = Validator.validate(state.scope, [Validations.REQUIRED]);
        newErrorMessages.imagesErrorMessage[0] = Validator.validate(state.images[0], [Validations.REQUIRED]);
        newErrorMessages.imagesErrorMessage[1] = Validator.validate(state.images[1], [Validations.REQUIRED]);
        newErrorMessages.imagesErrorMessage[2] = Validator.validate(state.images[2], [Validations.REQUIRED]);

        let valid = props.service ? true : newErrorMessages.nameErrorMessage == null &&
            newErrorMessages.ratingErrorMessage == null &&
            newErrorMessages.reviewsErrorMessage == null &&
            newErrorMessages.reviewsErrorMessage == null &&
            newErrorMessages.shortDescriptionErrorMessage == null &&
            newErrorMessages.descriptionErrorMessage == null &&
            newErrorMessages.scopeErrorMessage == null &&
            newErrorMessages.imagesErrorMessage[0] == null &&
            newErrorMessages.imagesErrorMessage[1] == null &&
            newErrorMessages.imagesErrorMessage[2] == null

        setErrorMessages(newErrorMessages);
        if (valid)
            callBack();

    };

    return (
        <div className='create-service-form-component-root'
            style={props.dialogMod ? { height: 'auto', marginTop: '60px', marginBottom: '20px' } : {}}>
            <ToastContainer position="top-center" autoClose={5000} />
            <div className='create-service-form-component-content'>
                <SpaceComponent height={'40px'} />
                <div className='create-service-form-section'>
                    <div className='create-service-form-header-title-outer-row'>
                        <div className='create-service-form-header-title-row'>
                            <FontAwesomeIcon icon={faCogs}
                                style={{
                                    width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                    borderRadius: '10px', padding: '10px'
                                }} />
                            <SpaceComponent width={'20px'} />
                            <h4 className='create-service-form-header-title-text'>
                                Create Service
                            </h4>
                        </div>
                    </div>
                    <SpaceComponent height={'20px'} />
                    <div className='create-service-form-container'>
                        <div className='create-service-form-row'>
                            <div className='create-service-form-left-column'>
                                <TextFieldControlComponent
                                    hint={'enter service name'}
                                    label={'Name'}
                                    type={'text'}
                                    initialValue={props.service ? props.service.name : ''}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setState({ ...state, name: value })
                                    }}
                                    errorMessage={errorMessages.name} />
                                <SpaceComponent height={'20px'} />
                                <div className='user-name-row'>
                                    <TextFieldControlComponent
                                        icon={faStar}
                                        hint={'enter rating'}
                                        label={'Rating'}
                                        type={'number'}
                                        initialValue={props.service ? props.service.rating : ''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setState({ ...state, rating: value })
                                        }}
                                        errorMessage={errorMessages.ratingErrorMessage} />
                                    <SpaceComponent width={'20px'} />
                                    <TextFieldControlComponent
                                        icon={faVoteYea}
                                        hint={'enter reviews number'}
                                        label={'Reviews'}
                                        type={'number'}
                                        initialValue={props.service ? props.service.reviews : ''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setState({ ...state, reviews: value })
                                        }}
                                        errorMessage={errorMessages.reviewsErrorMessage} />
                                </div>
                                <SpaceComponent height={'20px'} />
                                <TextFieldControlComponent
                                    hint={'enter description'}
                                    label={'Short Description'}
                                    type={'text'}
                                    initialValue={props.service ? props.service.shortDescription : ''}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setState({ ...state, shortDescription: value })
                                    }}
                                    errorMessage={errorMessages.shortDescriptionErrorMessage} />
                                <SpaceComponent height={'20px'} />
                                <TextAreaControlComponent
                                    label={'Description'}
                                    initialValue={props.service ? props.service.description : ''}

                                    hint={'enter description'}
                                    onChange={(value) => {
                                        setState({ ...state, description: value })
                                    }}
                                    errorMessage={errorMessages.descriptionErrorMessage}
                                />
                                <SpaceComponent height={'20px'} />
                                <TextAreaControlComponent
                                    label={'Scope'}
                                    initialValue={props.service ? props.service.scope : ''}
                                    onChange={(value) => {
                                        setState({ ...state, scope: value })
                                    }}
                                    errorMessage={errorMessages.scopeErrorMessage}
                                    hint={'enter scope'}
                                />
                            </div>
                            <div className='create-service-form-right-column'>
                                <TextFieldControlComponent
                                    icon={faDollarSign}
                                    hint={'enter price'}
                                    label={'Price'}
                                    type={'number'}
                                    initialValue={props.service ? props.service.price : ''}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setState({ ...state, price: value })
                                    }}
                                    errorMessage={errorMessages.priceErrorMessage} />
                                <SpaceComponent height={'20px'} />
                                <TextAreaControlComponent
                                    label={'Features (4 maximun)'}
                                    initialValue={props.service && props.service.features.length >= 1 ? props.service.features[0] : ''}
                                    height={'80px'}
                                    onChange={(value) => {
                                        var newFeatures = [...state.features];
                                        newFeatures[0] = value;
                                        setState({ ...state, features: newFeatures })
                                    }}
                                    hint={'enter feature'}
                                />
                                <SpaceComponent height={'20px'} />
                                <TextAreaControlComponent
                                    label={''}
                                    initialValue={props.service && props.service.features.length >= 2 ? props.service.features[1] : ''}
                                    height={'80px'}
                                    onChange={(value) => {
                                        var newFeatures = [...state.features];
                                        newFeatures[1] = value;
                                        setState({ ...state, features: newFeatures })
                                    }}
                                    hint={'enter feature'}
                                />
                                <SpaceComponent height={'20px'} />
                                <TextAreaControlComponent
                                    label={''}
                                    initialValue={props.service && props.service.features.length >= 3 ? props.service.features[2] : ''}
                                    height={'80px'}
                                    onChange={(value) => {
                                        var newFeatures = [...state.features];
                                        newFeatures[2] = value;
                                        setState({ ...state, features: newFeatures })
                                    }}
                                    hint={'enter feature'}
                                />
                                <SpaceComponent height={'20px'} />
                                <TextAreaControlComponent
                                    label={''}
                                    initialValue={props.service && props.service.features.length >= 4 ? props.service.features[3] : ''}
                                    height={'80px'}
                                    onChange={(value) => {
                                        var newFeatures = [...state.features];
                                        newFeatures[3] = value;
                                        setState({ ...state, features: newFeatures })
                                    }}
                                    hint={'enter feature'}
                                />
                                <SpaceComponent height={'20px'} />
                            </div>
                        </div>
                    </div>
                    <div className='photo-picker-row'>
                        <FilePickerControlComponent
                            label={'upload picture'}
                            accept={'images'}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var newImages = [...state.images];
                                newImages[0] = value;
                                setState({ ...state, images: newImages })
                            }}
                            errorMessage={errorMessages.imagesErrorMessage[0]} />
                        <SpaceComponent width={'20px'} />
                        <FilePickerControlComponent
                            label={'upload picture'}
                            accept={'images'}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var newImages = [...state.images];
                                newImages[1] = value;
                                setState({ ...state, images: newImages })
                            }}
                            errorMessage={errorMessages.imagesErrorMessage[1]} />
                        <SpaceComponent width={'20px'} />
                        <FilePickerControlComponent
                            label={'upload picture'}
                            accept={'images'}
                            validator={() => { return 'done' }}
                            onChange={(value) => {
                                var newImages = [...state.images];
                                newImages[2] = value;
                                setState({ ...state, images: newImages })
                            }}
                            errorMessage={errorMessages.imagesErrorMessage[2]} />
                    </div>
                    <SpaceComponent height={'40px'} />
                    <div className='create-service-form-button-row'>
                        <div className='create-service-form-button'
                            onClick={() => {
                                validate(() => {
                                    props.onSubmit(ServiceModel.build(state));
                                })
                            }}>
                            <FontAwesomeIcon icon={props.service ? faEdit : faSave} />
                            <SpaceComponent width={'10px'} />
                            {props.service ? 'Update' : 'Create'}
                        </div>
                    </div> : <></>
                </div>
            </div>
        </div>
    );
}

export default CreateServiceFormComponent;