import React from 'react';
import './shimmer_card_component.css';

function ShimmerCardComponent(props) {
    return (
        <>
            {props.className ?
                <div className={props.className + ' custom-shape-shimmer'} style={props.style} >
                    <div className="shimmer"></div>
                </div> :
                <div className={props.type == 'list' ? 'shimmer-card-root-list-component'
                    : 'shimmer-card-root-grid-component'} style={{ height: props.height }} >
                    <div className="shimmer"></div>
                </div>}
        </>
    );
}

export default ShimmerCardComponent;