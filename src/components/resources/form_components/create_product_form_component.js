import React, { useEffect, useState } from 'react';
import './create_product_form_component.css';
import TextFieldControlComponent from '../../core/form_components/controls/text_field_control_component';
import { faDollarSign, faLink, faRulerCombined, faSave, faEdit, faSortAmountUp, faStar, faStore, faTags, faTrademark, faVoteYea, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpaceComponent from '../../core/space_component';
import DropDownMenuControlComponent from '../../core/form_components/controls/drop_down_menu_control_component';
import TextAreaControlComponent from '../../core/form_components/controls/text_area_control_component';
import FilePickerControlComponent from '../../core/form_components/controls/file_picker_control_component';
import { Validations, Validator } from '../../../helpers/validators';
import { useDispatch, useSelector } from 'react-redux';
import { ProductModel } from '../../../models/product_model';
import { createProduct } from '../../../state_management/middlewares/modify_product_middleware';
import { reset } from '../../../state_management/middlewares/modify_product_middleware';
import { ToastContainer, toast } from 'react-toastify';

function CreateProductFormComponent(props) {

    const [state, setState] = useState({
        id: props.product ? props.product.id : null,
        name: null,
        rating: null,
        reviews: null,
        amazonLink: null,
        shortDescription: null,
        colors: [null, null, null, null],
        sizes: [null, null, null, null],
        price: null,
        brand: null,
        category: null,
        amount: null,
        dimesion: null,
        weight: null,
        features: [null, null, null, null],
        images: [null, null, null]
    });
    const [errorMessages, setErrorMessages] = useState({
        nameErrorMessage: null,
        ratingErrorMessage: null,
        reviewsErrorMessage: null,
        amazonLinkErrorMessage: null,
        shortDescriptionErrorMessage: null,
        priceErrorMessage: null,
        brandErrorMessage: null,
        categoryErrorMessage: null,
        amountErrorMessage: null,
        imagesErrorMessage: [null, null, null]
    });
    const validate = (callBack) => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.nameErrorMessage = Validator.validate(state.name, [Validations.REQUIRED]);
        newErrorMessages.ratingErrorMessage = Validator.validate(state.rating, [Validations.REQUIRED]);
        // newErrorMessages.reviewsErrorMessage = Validator.validate(state.reviews, [Validations.REQUIRED]);
        newErrorMessages.amazonLinkErrorMessage = Validator.validate(state.amazonLink, [Validations.REQUIRED]);
        newErrorMessages.shortDescriptionErrorMessage = Validator.validate(state.shortDescription, [Validations.REQUIRED]);
        newErrorMessages.priceErrorMessage = Validator.validate(state.price, [Validations.REQUIRED]);
        newErrorMessages.brandErrorMessage = Validator.validate(state.brand, [Validations.REQUIRED]);
        newErrorMessages.categoryErrorMessage = Validator.validate(state.category, [Validations.REQUIRED]);
        newErrorMessages.amountErrorMessage = Validator.validate(state.amount, [Validations.REQUIRED]);
        newErrorMessages.imagesErrorMessage[0] = Validator.validate(state.images[0], [Validations.REQUIRED]);
        newErrorMessages.imagesErrorMessage[1] = Validator.validate(state.images[1], [Validations.REQUIRED]);
        newErrorMessages.imagesErrorMessage[2] = Validator.validate(state.images[2], [Validations.REQUIRED]);

        let valid = props.product ? true : newErrorMessages.nameErrorMessage == null &&
            newErrorMessages.ratingErrorMessage == null &&
            // newErrorMessages.reviewsErrorMessage == null &&
            newErrorMessages.amazonLinkErrorMessage == null &&
            newErrorMessages.shortDescriptionErrorMessage == null &&
            newErrorMessages.priceErrorMessage == null &&
            newErrorMessages.brandErrorMessage == null &&
            newErrorMessages.categoryErrorMessage == null &&
            newErrorMessages.amountErrorMessage == null &&
            newErrorMessages.imagesErrorMessage[0] == null &&
            newErrorMessages.imagesErrorMessage[1] == null &&
            newErrorMessages.imagesErrorMessage[2] == null
        if (!props.product)
            setErrorMessages(newErrorMessages);
        if (valid)
            callBack();

    };

    return (
        <div className='create-product-form-component-root'>
            {/* {<div className='unfocus-product-create-dialog' />} */}
            <div className='create-product-form-component-content'
                style={props.dialogMode ? { marginLeft: '0px' } : {}}>
                <SpaceComponent height={'40px'} />
                <div className='create-product-form-section'>
                    <div className='create-product-form-header-title-outer-row'>
                        <div className='create-product-form-header-title-row'>
                            <FontAwesomeIcon icon={faStore}
                                style={{
                                    width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                    borderRadius: '10px', padding: '10px'
                                }} />
                            <SpaceComponent width={'20px'} />
                            <h4 className='create-product-form-header-title-text'>
                                Create Product
                            </h4>
                        </div>
                    </div>
                    <SpaceComponent height={'20px'} />
                    <div className='create-product-form-container'>
                        <div className='create-product-form-row'>
                            <div className='create-product-form-left-column'
                                style={props.dialogMode ? { width: '46%' } : {}}>
                                <TextFieldControlComponent
                                    hint={'enter product name'}
                                    label={'Name'}
                                    type={'text'}
                                    initialValue={props.product ? props.product.name : ''}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setState({ ...state, name: value })
                                    }}
                                    errorMessage={errorMessages.nameErrorMessage} />
                                <SpaceComponent height={'20px'} />
                                <div className='user-name-row'>
                                    <TextFieldControlComponent
                                        icon={faStar}
                                        hint={'enter rating'}
                                        label={'Rating'}
                                        type={'number'}
                                        initialValue={props.product ? props.product.rating : ''}
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
                                        initialValue={props.product ? props.product.reviews : ''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setState({ ...state, reviews: value })
                                        }}
                                        errorMessage={errorMessages.reviews} />
                                </div>
                                <SpaceComponent height={'20px'} />
                                <TextFieldControlComponent
                                    icon={faLink}
                                    hint={'enter amazon link'}
                                    label={'Amazon'}
                                    type={'text'}
                                    initialValue={props.product ? props.product.amazonLink : ''}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setState({ ...state, amazonLink: value })
                                    }}
                                    errorMessage={errorMessages.amazonLinkErrorMessage} />
                                <SpaceComponent height={'20px'} />
                                <TextFieldControlComponent
                                    hint={'enter description'}
                                    label={'Short Description'}
                                    type={'text'}
                                    initialValue={props.product ? props.product.shortDescription : ''}
                                    validator={() => { return 'done' }}
                                    onChange={(value) => {
                                        setState({ ...state, shortDescription: value })
                                    }}
                                    errorMessage={errorMessages.shortDescriptionErrorMessage} />
                                <SpaceComponent height={'20px'} />
                                <div className='user-name-row'>
                                    <TextFieldControlComponent
                                        hint={''}
                                        label={'Color#1'}
                                        type={'color'}
                                        initialValue={''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            var newColors = [...state.colors];
                                            newColors[0] = value;
                                            setState({ ...state, colors: newColors })
                                        }}
                                        errorMessage={''} />
                                    <SpaceComponent width={'20px'} />
                                    <TextFieldControlComponent
                                        hint={''}
                                        label={'Color#2'}
                                        type={'color'}
                                        initialValue={''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            var newColors = [...state.colors];
                                            newColors[1] = value;
                                            setState({ ...state, colors: newColors })
                                        }}
                                        errorMessage={''} />
                                    <SpaceComponent width={'20px'} />
                                    <TextFieldControlComponent
                                        hint={''}
                                        label={'Color#3'}
                                        type={'color'}
                                        initialValue={''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            var newColors = [...state.colors];
                                            newColors[2] = value;
                                            setState({ ...state, colors: newColors })
                                        }}
                                        errorMessage={''} />
                                    <SpaceComponent width={'20px'} />
                                    <TextFieldControlComponent
                                        hint={''}
                                        label={'Color#4'}
                                        type={'color'}
                                        initialValue={''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            var newColors = [...state.colors];
                                            newColors[3] = value;
                                            setState({ ...state, colors: newColors })
                                        }}
                                        errorMessage={''} />
                                </div>
                                <SpaceComponent height={'20px'} />
                                <div className='user-name-row'>
                                    <DropDownMenuControlComponent
                                        options={['none', 'S', 'L', 'XL', 'XXL']}
                                        initialValue={props.product && props.product.sizes.length >= 1 ? props.product.sizes[0] : 'none'}
                                        onChange={(value) => {
                                            var newSizes = [...state.sizes];
                                            newSizes[0] = value;
                                            setState({ ...state, sizes: newSizes })
                                        }}
                                        errorMessage={''}
                                        label={'Size#1'} />
                                    <SpaceComponent width={'20px'} />
                                    <DropDownMenuControlComponent
                                        options={['none', 'S', 'L', 'XL', 'XXL']}
                                        initialValue={props.product && props.product.sizes.length >= 2 ? props.product.sizes[1] : 'none'}
                                        onChange={(value) => {
                                            var newSizes = [...state.sizes];
                                            newSizes[1] = value;
                                            setState({ ...state, sizes: newSizes })
                                        }}
                                        errorMessage={''}
                                        label={'Size#2'} />
                                    <SpaceComponent width={'20px'} />
                                    <DropDownMenuControlComponent
                                        options={['none', 'S', 'L', 'XL', 'XXL']}
                                        initialValue={props.product && props.product.sizes.length >= 3 ? props.product.sizes[2] : 'none'}
                                        onChange={(value) => {
                                            var newSizes = [...state.sizes];
                                            newSizes[2] = value;
                                            setState({ ...state, sizes: newSizes })
                                        }}
                                        errorMessage={''}
                                        label={'Size#3'} />
                                    <SpaceComponent width={'20px'} />
                                    <DropDownMenuControlComponent
                                        options={['none', 'S', 'L', 'XL', 'XXL']}
                                        initialValue={props.product && props.product.sizes.length >= 4 ? props.product.sizes[3] : 'none'}
                                        onChange={(value) => {
                                            var newSizes = [...state.sizes];
                                            newSizes[3] = value;
                                            setState({ ...state, sizes: newSizes })
                                        }}
                                        errorMessage={''}
                                        label={'Size#4'} />
                                </div>
                            </div>
                            <div className='create-product-form-right-column'
                                style={props.dialogMode ? { width: '46%' } : {}}>
                                <div className='product-column'>
                                    <TextFieldControlComponent
                                        icon={faDollarSign}
                                        hint={'enter price'}
                                        label={'Price'}
                                        type={'number'}
                                        initialValue={props.product ? props.product.price : ''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setState({ ...state, price: value })
                                        }}
                                        errorMessage={errorMessages.priceErrorMessage} />
                                    <SpaceComponent width={'20px'} />
                                    <TextFieldControlComponent
                                        icon={faTrademark}
                                        hint={'enter brand'}
                                        label={'Brand'}
                                        type={'text'}
                                        initialValue={props.product ? props.product.brand : ''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setState({ ...state, brand: value })
                                        }}
                                        errorMessage={errorMessages.brandErrorMessage} />
                                    <SpaceComponent width={'20px'} />
                                    <TextFieldControlComponent
                                        icon={faTags}
                                        hint={'enter category'}
                                        label={'Category'}
                                        type={'text'}
                                        initialValue={props.product ? props.product.category : ''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setState({ ...state, category: value })
                                        }}
                                        errorMessage={errorMessages.categoryErrorMessage} />
                                </div>
                                <SpaceComponent height={'20px'} />
                                <div className='product-column'>
                                    <TextFieldControlComponent
                                        icon={faSortAmountUp}
                                        hint={'enter amount'}
                                        label={'Amount'}
                                        type={'number'}
                                        initialValue={props.product ? props.product.amount : ''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setState({ ...state, amount: value })
                                        }}
                                        errorMessage={errorMessages.amountErrorMessage} />
                                    <SpaceComponent width={'20px'} />
                                    <TextFieldControlComponent
                                        icon={faRulerCombined}
                                        hint={'enter dimension'}
                                        label={'Dimension(cm)'}
                                        type={'number'}
                                        initialValue={props.product ? props.product.dimesion : ''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setState({ ...state, dimesion: value })
                                        }} />
                                    <SpaceComponent width={'20px'} />
                                    <TextFieldControlComponent
                                        icon={faWeightHanging}
                                        hint={'enter wieght'}
                                        label={'Weight(kg)'}
                                        type={'number'}
                                        initialValue={props.product ? props.product.weight : ''}
                                        validator={() => { return 'done' }}
                                        onChange={(value) => {
                                            setState({ ...state, weight: value })
                                        }} />
                                </div>
                            </div>
                        </div>
                        <SpaceComponent height={'20px'} />
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                            <SpaceComponent height={'2px'}
                                width={'94%'}
                                color={'rgb(220,220,220'} />
                        </div>
                        <SpaceComponent height={'30px'} />
                        <TextAreaControlComponent
                            label={'Features (4 maximun)'}
                            initialValue={props.product && props.product.features.length >= 1 ? props.product.features[0] : ''}
                            height={'80px'}
                            hint={'enter feature'}
                            onChange={(value) => {
                                var newFeatures = [...state.features];
                                newFeatures[0] = value;
                                setState({ ...state, features: newFeatures })
                            }} />
                        <TextAreaControlComponent
                            label={''}
                            initialValue={props.product && props.product.features.length >= 2 ? props.product.features[1] : ''}
                            height={'80px'}
                            hint={'enter feature'}
                            onChange={(value) => {
                                var newFeatures = [...state.features];
                                newFeatures[1] = value;
                                setState({ ...state, features: newFeatures })
                            }} />
                        <SpaceComponent height={'20px'} />
                        <TextAreaControlComponent
                            label={''}
                            initialValue={props.product && props.product.features.length >= 3 ? props.product.features[2] : ''}
                            height={'80px'}
                            hint={'enter feature'}
                            onChange={(value) => {
                                var newFeatures = [...state.features];
                                newFeatures[2] = value;
                                setState({ ...state, features: newFeatures })
                            }} />
                        <SpaceComponent height={'20px'} />
                        <TextAreaControlComponent
                            label={''}
                            initialValue={props.product && props.product.features.length >= 4 ? props.product.features[3] : ''}
                            height={'80px'}
                            hint={'enter feature'}
                            onChange={(value) => {
                                var newFeatures = [...state.features];
                                newFeatures[3] = value;
                                setState({ ...state, features: newFeatures })
                            }} />
                        <SpaceComponent height={'20px'} />
                    </div>
                    <SpaceComponent height={'30px'} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                        <SpaceComponent height={'2px'}
                            width={'94%'}
                            color={'rgb(220,220,220'} />
                    </div>
                    <SpaceComponent height={'30px'} />
                    <div className='user-name-row'>
                        <FilePickerControlComponent
                            label={'upload profile picture'}
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
                            label={'upload profile picture'}
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
                            label={'upload profile picture'}
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
                    <div className='create-product-form-button-row'>
                        <div className='create-product-form-button'
                            onClick={() => {
                                validate(() => {
                                    var o = ProductModel.build(state);
                                    props.onSubmit(ProductModel.build(state));
                                })
                            }}>
                            <FontAwesomeIcon icon={props.product ? faEdit : faSave} />
                            <SpaceComponent width={'10px'} />
                            {props.product ? 'Update' : 'Create'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProductFormComponent;