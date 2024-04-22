import React, { useState, forwardRef } from 'react';
import './create_service_provider_step3.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faLink, faStar } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../../../core/space_component';
import TextFieldControlComponent from '../../../../core/form_components/controls/text_field_control_component';
import TextAreaControlComponent from '../../../../core/form_components/controls/text_area_control_component';
import { Validations, Validator } from '../../../../../helpers/validators';

const CreateServiceProviderStep3 = forwardRef((props, ref) => {
    const [state, setState] = useState({ reviews: [0, 0, 0, 0, 0] });
    const [errorMessages, setErrorMessages] = useState({
        reviewsErrorMessages: [null, null, null, null, null]
    });
    const validate = () => {
        var newErrorMessages = { ...errorMessages }
        var valid = true;
        for (var i = 0; i < 5; i++) {
            newErrorMessages.reviewsErrorMessages[i] = Validator.validate(state.reviews[i], [Validations.REQUIRED]);
            if (newErrorMessages.reviewsErrorMessages[i] != null)
                valid = false;
        }

        setErrorMessages(newErrorMessages);
        if (true) {
            props.next({
                reviews: state.reviews
            })
        }
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='create-service-provider-step3-root'
            style={props.style}
            ref={ref}>
            <div className='step3-section'>
                <div className='step3-header-title-outer-row'>
                    <div className='step3-header-title-row'>
                        <FontAwesomeIcon icon={faStar}
                            style={{
                                width: '36px', height: '36px', backgroundColor: 'rgb(200,200,200)',
                                borderRadius: '10px', padding: '10px'
                            }} />
                        <SpaceComponent width={'20px'} />
                        <h4 className='step3-header-title-text'>
                            Reviews
                        </h4>
                    </div>
                </div>
                <SpaceComponent height={'20px'} />
                <div className='step3-container'>
                    {/* <div className='step3-row'>
                        <div className='step3-left-column'>
                            <TextFieldControlComponent
                                hint={'reviewer name'}
                                label={'Reviewer #1'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                icon={faStar}
                                hint={'review 1-5'}
                                label={'Review'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                icon={faFlag}
                                hint={'reviewer address'}
                                label={'Address'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                hint={'review date'}
                                label={'Date'}
                                type={'date'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextAreaControlComponent
                                label={'Comment'}
                                initialValue={''}
                                // height = {'200px'}
                                // maxLength = {50}
                                onChange={() => { }}
                                hint={'review comment'}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                icon={faLink}
                                hint={'company website link'}
                                label={'Link'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                icon={faLink}
                                hint={'linkedin url'}
                                label={'Linkedin'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                        </div>
                        <div className='step3-right-column'>
                            <TextFieldControlComponent
                                hint={'reviewer name'}
                                label={'Reviewer #2 (Optional)'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                icon={faStar}
                                hint={'review 1-5'}
                                label={'Review'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                icon={faFlag}
                                hint={'reviewer address'}
                                label={'Address'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                hint={'review date'}
                                label={'Date'}
                                type={'date'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextAreaControlComponent
                                label={'Comment'}
                                initialValue={''}
                                // height = {'200px'}
                                // maxLength = {50}
                                onChange={() => { }}
                                hint={'review comment'}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                icon={faLink}
                                hint={'company website link'}
                                label={'Link'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                            <TextFieldControlComponent
                                icon={faLink}
                                hint={'linkedin url'}
                                label={'Linkedin'}
                                type={'text'}
                                initialValue={''}
                                validator={() => { return 'done' }}
                                onChange={() => { }}
                                errorMessage={''} />
                            <SpaceComponent height={'20px'} />
                        </div>
                    </div>
                    <SpaceComponent height={'20px'} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                        <SpaceComponent height={'2px'}
                            width={'94%'}
                            color={'rgb(220,220,220'} />
                    </div> */}
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
                                var newReviews = { reviews: reviewsList };
                                setState(newReviews);
                            }}
                            errorMessage={errorMessages.reviewsErrorMessages[0]} />
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
                                var newReviews = { reviews: reviewsList };
                                setState(newReviews);
                            }}
                            errorMessage={errorMessages.reviewsErrorMessages[1]} />
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
                                var newReviews = { reviews: reviewsList };
                                setState(newReviews);
                            }}
                            errorMessage={errorMessages.reviewsErrorMessages[2]} />
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
                                var newReviews = { reviews: reviewsList };
                                setState(newReviews);
                            }}
                            errorMessage={errorMessages.reviewsErrorMessages[3]} />
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
                                var newReviews = { reviews: reviewsList };
                                setState(newReviews);
                            }}
                            errorMessage={errorMessages.reviewsErrorMessages[4]} />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CreateServiceProviderStep3;