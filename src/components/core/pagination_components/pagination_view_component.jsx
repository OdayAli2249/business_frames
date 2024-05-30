import React, { useEffect, useState } from 'react';
import './pagination_view_component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTh } from '@fortawesome/free-solid-svg-icons';

function PaginationViewComponent(props) {


    const [view, setView] = useState(props.initialView);

    useEffect(() => {
        props.onViewChanged(view);
    }, [view]);

    return (
        <div className={props.hidden ? 'hidden-view-options-header' : 'view-options-header'}>
            <FontAwesomeIcon icon={faList}
                className={view.list ? 'selected-view-option' : 'view-option'}
                onClick={
                    () => setView({
                        grid: false,
                        list: true
                    })
                } />
            <FontAwesomeIcon icon={faTh}
                className={view.grid ? 'selected-view-option' : 'view-option'}
                onClick={
                    () => setView({
                        grid: true,
                        list: false
                    })
                } />
        </div>
    );
}

export default PaginationViewComponent;