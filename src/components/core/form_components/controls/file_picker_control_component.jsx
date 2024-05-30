import React, { forwardRef, useRef, useState } from 'react';
import './file_picker_control_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faEye, faEyeSlash, faLock, faTrash, faUpload, faWarning } from '@fortawesome/free-solid-svg-icons';
import SpaceComponent from '../../space_component';


const FilePickerControlComponent = forwardRef((props, ref) => {
    const [file, setFile] = useState(props.initialFile);
    const fileInputRef = useRef(null);
    const validate = () => {
        if (props.validator)
            return props.validator();
        else return null
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='file-picker-control-root'>
            <h4 className='file-picker-control-label'>
                {props.label}
            </h4>
            <SpaceComponent height={'10px'} />
            <div className='file-picker-field-row'>
                {!file ?
                    <div className='file-picker-field-empty'>
                        <FontAwesomeIcon className='file-picker-field-inside-button'
                            icon={faUpload}
                            onClick={() => fileInputRef.current.click()} />
                    </div>
                    : <img src={props.accept == 'images' ? URL.createObjectURL(file) :
                    'https://odayali2249.github.io/portfolio-resources/resources/bf/images/pdf.png'}
                        className='file-picker-field-content' />}
                <input className='file-picker-control-field'
                    type={'file'}
                    accept={props.accept == 'images' ? '.jpg,.jpeg,.png,.gif' : '.pdf'}
                    hidden
                    file={file}
                    onChange={(event) => {
                        setFile(event.target.files[0]);
                        props.onChange && props.onChange(event.target.files[0]);
                    }}
                    ref={fileInputRef}
                />
                <SpaceComponent width={'20px'} />
                <div className='file-picker-field-options'>
                    <FontAwesomeIcon className='file-picker-field-button'
                        icon={file ? faEdit : faAdd}
                        onClick={() => fileInputRef.current.click()} />
                    <SpaceComponent height={'10px'} />
                    {!file ? <></> :
                        <FontAwesomeIcon className='file-picker-field-button'
                            icon={faTrash}
                            onClick={() => setFile(null)} />}
                </div>
            </div>
            <SpaceComponent height={'10px'} />
            <div className='file-picker-control-error'>
                {props.errorMessage ? <FontAwesomeIcon className='file-picker-control-error-icon'
                    icon={faWarning} /> : <></>}
                <SpaceComponent width={'6px'} />
                <h4 className='file-picker-control-error-text'>
                    {props.errorMessage}
                </h4>
            </div>
        </div>
    );
})

export default FilePickerControlComponent;