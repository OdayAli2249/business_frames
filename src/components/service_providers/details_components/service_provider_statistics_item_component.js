import React from 'react';
import './service_provider_statistics_item_component.css';
import SpaceComponent from '../../core/space_component';
import CircularProgressBarComponent from '../../core/circular_progress_bar_component';

function ServiceProviderStatisticsItemComponent(props) {
    return (
        <div className='service-provider-statistics-grid-item'>
            <CircularProgressBarComponent
                color={props.percentageColor}
                width={120}
                height={120}
                percentage={props.percentage} />
            <SpaceComponent height={'10px'} />
            <SpaceComponent height={'1px'}
                width={'90%'}
                color={'rgb(220,220,220'}
            />
            <SpaceComponent height={'10px'} />
            <div className='service-provider-statistics-grid-item-body'>
                <img className='service-provider-details-info-grid-item-image'
                    src={props.image}></img>
                <div className='service-provider-details-info-grid-item-descriptions'>
                    <h3 className='service-provider-details-info-samll-text'
                        style={{ fontSize: '16px' }}>{props.title}</h3>
                    <h5 className='service-provider-details-info-samll-text'
                        style={{ fontSize: '12px', color: 'gray' }}>{props.descriptions}</h5>
                </div>
            </div>
        </div>
    );
}

export default ServiceProviderStatisticsItemComponent;