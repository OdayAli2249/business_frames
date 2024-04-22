import React, { useEffect, useState } from 'react';
import './apply_for_jobs_page.css';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import JobOfferCarouselCardComponent from '../../components/service_providers/cards/job_offer_carousel_card_component';

function ApplyForJobsPage(props) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='apply-for-jobs-root'>
            <h3>ApplyForJobsPage</h3>
            <div className='apply-for-jobs-grid-container'>
                <PaginationComponent
                    id={'resources-explorer'}
                    filters={new Map([
                        ['filter-type-1', ['filter-type-1-option-1', 'filter-type-1-option-2', 'filter-type-1-option-3',]],
                        ['filter-type-2', ['filter-type-2-option-1', 'filter-type-2-option-2', 'filter-type-2-option-3',]],
                        ['filter-type-3', ['filter-type-3-option-1', 'filter-type-3-option-2', 'filter-type-3-option-3',]]
                    ])}
                    initialView={{
                        grid: true,
                        list: false
                    }}
                    onCardClicked={() => {
                        // navigator('/service-providers/service-providers-home')
                    }}
                    pageSize={6}                     // when start fetching data from I/O
                    gridCardSize={(windowWidth >= 1200 && windowWidth < 1500) ?
                        'extra-larg' : (windowWidth >= 800 && windowWidth < 1200) ? 'extra-larg' : 'larg'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    showView={false}
                    sideBorders = {false}
                    showPages={true}
                    showSearch={true}
                    itemBuilder={(ID) => <JobOfferCarouselCardComponent
                        onShowDetailsClicked={() => {
                        }}
                        onApplyClicked={() => {
                        }}
                        key={ID} />}
                />
            </div>
        </div>
    );
}

export default ApplyForJobsPage