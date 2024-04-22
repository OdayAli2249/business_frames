import React from 'react';
import ButtonComponent from '../button_component';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import './error_component.css';
import 'react-toastify/dist/ReactToastify.css';
import SpaceComponent from '../space_component';

function ErrorComponent(props) {
console.log('__________________________',props.message);
    return (
        <div className='error-component-root'>
            <h3 className='error-message'>{props.message}</h3>
            <SpaceComponent height={'20px'} />
            <img src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/error.png'} className='error-image'></img>
            <SpaceComponent height={'20px'} />
            {props.retry == 'hide' ? <></> : <ButtonComponent label={'Retry'} icon={faRefresh} onClick={props.onRetry} />}
        </div>
    );
}

export default ErrorComponent;