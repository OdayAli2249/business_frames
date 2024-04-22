import React, { useEffect, useRef, useState } from 'react';
import './service_provider_branches_component.css'
import { useNavigate } from 'react-router-dom';
import CarouselComponent from '../core/carousel_component/carousel_component';
import BranchesCarouselCardComponent from '../branches/cards/branches_carousel_card_component';
import { getBranches } from '../../state_management/middlewares/branches_middleware';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';

function ServiceProviderBranchesComponent(props) {
    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const carouselRef = useRef(null);

    useEffect(() => {
        if (user.type == 0) {
            carouselRef.current.refresh();
            dispatch(resetAuthStatus());
        }
    });

    return (
        <div className='service-provider-branches-component-root'
            id='/service-provider-branches'>
            <CarouselComponent
                itemsToShow={(windowWidth >= 700 && windowWidth < 900) ? 2 : windowWidth < 700 ? 1 : 3}
                label={'Branches'}
                ref={carouselRef}
                onViewAllClicked={() => navigator('/service-providers/service-provider-branches/' + props.id)}
                params={{ serviceProviderId: props.id }}                    // make sure this is valid id
                fetchData={getBranches}
                selectedState={state => state.branches}
                showSearch={true}
                itemBuilder={(ID, branch) => <BranchesCarouselCardComponent
                    key={ID}
                    selectionMod='none'
                    branch={branch} />}
            />
        </div>
    );
}

export default ServiceProviderBranchesComponent