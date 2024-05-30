import React from 'react';
import './service_provider_statistics_component.css';
import SpaceComponent from '../../core/space_component';
import 'react-circular-progressbar/dist/styles.css';
import ServiceProviderStatisticsItemComponent from './service_provider_statistics_item_component';
import { useSelector } from 'react-redux';


function ServiceProviderStatisticsComponent(props) {

    const state = useSelector(state => state.serviceProviderById);

    return (
        <div className='service-provider-statistics-component-root'>
            {state.data && state.data.item ?
                <>
                    <h2 className='service-provider-statistics-title'>
                        Statistics
                    </h2>
                    <SpaceComponent height={'30px'} />
                    <div className='service-provider-statistics-grid-section'>
                        <ServiceProviderStatisticsItemComponent
                            title={'Competitives'}
                            descriptions={state.data.item.competitives}
                            percentage={100 - state.data.item.marketPercentage}
                            percentageColor={'rgba(62, 152, 199)'}
                            image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/users_icon.png'} />
                        <ServiceProviderStatisticsItemComponent
                            title={'Minor Customers'}
                            descriptions={state.data.item.minorCustomers}
                            percentage={state.data.item.minorPercentage}
                            percentageColor={'rgba(103, 209, 189)'}
                            image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/minor.png'} />
                        <ServiceProviderStatisticsItemComponent
                            title={'Skill Workers'}
                            descriptions={state.data.item.skillWorkers}
                            percentage={100 - state.data.item.traineePercentage}
                            percentageColor={'rgba(103, 199, 179)'}
                            image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/skill_worker.png'} />
                        <ServiceProviderStatisticsItemComponent
                            title={'Market Share'}
                            descriptions={state.data.item.marketShare}
                            percentage={state.data.item.marketPercentage}
                            percentageColor={'rgba(83, 169, 199)'}
                            image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/market_share.png'} />
                        <ServiceProviderStatisticsItemComponent
                            title={'ِAdult Customers'}
                            descriptions={state.data.item.adultCustomers}
                            percentage={100 - state.data.item.minorPercentage}
                            percentageColor={'rgba(53, 179, 169)'}
                            image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/adult.png'} />
                        <ServiceProviderStatisticsItemComponent
                            title={'ِTrainee Employees'}
                            descriptions={state.data.item.traineeEmployees}
                            percentage={state.data.item.traineePercentage}
                            percentageColor={'rgba(62, 152, 199)'}
                            image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service provider resources/trainee.png'} />
                    </div></> : <></>}
        </div>
    );
}

export default ServiceProviderStatisticsComponent;