import React, { Fragment } from 'react';
import './explorer_loading_component.css';
import MemberProfileCardComponent from '../../members/cards/member_profile_card_component.jsx';
import ShimmerCardComponent from './shimmer_card_component.jsx';
import SpaceComponent from '../space_component.jsx';

function ExplorerLoadingComponent(props) {
    return (
        <div className='explorer-loading-container'>
            <MemberProfileCardComponent />
            <SpaceComponent height={'10px'} />
            {Array.from({ length: 5 }, (_, index) => index + 1).map((index) => <Fragment key={index}>
                <ShimmerCardComponent className='explorer-loading-item' />
                <SpaceComponent height={'30px'} />
            </Fragment>)
            }
        </div>
    );
}

export default ExplorerLoadingComponent;