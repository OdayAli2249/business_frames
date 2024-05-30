import React, { useEffect, useState } from 'react';
import './the_ceos_component.css'
import CarouselComponent from '../core/carousel_component/carousel_component';
import MemberCarouselCardComponent from '../members/cards/member_carousel_card_component';
import { getCEOs } from '../../state_management/middlewares/ceos_middleware';

function TheCEOsComponent(props) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='the-ceos-component-root'
            id='/the-ceos'>
            <CarouselComponent
                label={'The CEOs'}
                itemsToShow={(windowWidth >= 700 && windowWidth < 900) ? 3 : windowWidth < 700 ? 2 : 4}
                params={{ serviceProviderId: props.id, roles: ['master', 'sub-master'] }}
                fetchData={getCEOs}
                selectedState={state => state.ceos}
                itemBuilder={(ID, user) => <MemberCarouselCardComponent
                    user={user}
                    key={ID}
                />}
            />
        </div>
    );
}

export default TheCEOsComponent