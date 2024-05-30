import React, { useState } from 'react';
import './create_post_form_component.css';
import { Validations, Validator } from '../../../helpers/validators';
import FilePickerControlComponent from '../../core/form_components/controls/file_picker_control_component';
import SpaceComponent from '../../core/space_component';
import ButtonComponent from '../../core/button_component';
import { PostModel } from '../../../models/post_model';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

function CreatePostFromComponent(props) {

    const [state, setState] = useState({
        id: props.post ? props.post.id : null,
        posterUrl: null,
    });
    const [errorMessages, setErrorMessages] = useState({
        posterUrlErrorMessage: null,
    });
    const validate = (callBack) => {
        var newErrorMessages = { ...errorMessages }
        newErrorMessages.posterUrlErrorMessage = Validator.validate(state.posterUrl, [Validations.REQUIRED]);

        let valid = newErrorMessages.posterUrlErrorMessage == null

        setErrorMessages(newErrorMessages);
        if (valid)
            callBack();

    };

    return (
        <div className='post-card-edit-row'>
            <FilePickerControlComponent
                label={'upload Poster picture'}
                accept={'images'}
                validator={() => { return 'done' }}
                onChange={(value) => {
                    setState({ ...state, posterUrl: value })
                }}
                errorMessage={errorMessages.posterUrlErrorMessage} />
            <SpaceComponent width={'40px'} />
            <div className='create-post-form-button'
                onClick={() => {
                    validate(() => {
                        props.onSubmit(PostModel.build(state));
                    })
                }}>
                {/* <FontAwesomeIcon icon={props.post ? faEdit : faSave} /> */}
                <SpaceComponent width={'10px'} />
                {props.post ? 'Update' : 'Create'}
            </div>
        </div>
    );
}

export default CreatePostFromComponent;