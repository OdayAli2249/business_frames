import React, { useEffect, useState } from 'react';
import './dialog_component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

function DialogComponent(props) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            <div className='dark-background'
                onClick={props.onClose}
                style={props.show ? { zIndex: props.higherZIndex ? '1000' : null } : { display: 'none' }}
            />
            <div className='dialog-component-root' style={props.show ?
                props.mod == 'extra-fill' || windowWidth < 1000 ?
                    {
                        top: '6%',
                        left: '0px',
                        width: '100%',
                        height: '94%',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        borderBottomLeftRadius: '0px',
                        borderBottomRightRadius: '0px',
                        transform: 'none',
                    } : props.mod == 'fill' ? {
                        top: '15%',
                        left: '0px',
                        width: '100%',
                        height: '85%',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        borderBottomLeftRadius: '0px',
                        borderBottomRightRadius: '0px',
                        transform: 'none',
                        zIndex: props.higherZIndex ? '1001' : null
                    } :
                        {
                            zIndex: props.higherZIndex ? '1001' : null,
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            width: props.width, height: props.height + '%', top: ((100 - props.height) / 2) + '%'
                        } : {
                    width: props.width, height: props.height, display: 'none'
                }}>
                <FontAwesomeIcon className='close-dialog' onClick={props.onClose}
                    style={{ color: props.closeIconColor }}
                    icon={faClose} />
                {props.children}
            </div >
        </>
    );
}

export default DialogComponent;