import React from 'react';
import './resources_component.css';
import { useNavigate } from 'react-router-dom';
import { faBox, faCogs, faKey, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import HomeTitleSectionComponent from '../home_title_section_component';
import HomeFeatureCardComponent from '../home_feature_card_component';
import HomeOverviewSectionComponent from '../home_overview_section_component';
import SpaceComponent from '../../core/space_component';


function ResourcesComponent(props) {
    const navigate = useNavigate();
    return (
        <div className='resources-component-root'
            id={props.id}>
            <HomeTitleSectionComponent title={'Resources'}
                subTitle={"Expert resources tailored to your unique needs and goals, cotains: services, products and posts"} />
            <HomeOverviewSectionComponent
                about={[
                    'explore all resources that could be found in a branch and modify its property, and as always any action is restricted to whatever permission you get provided by admin.',
                    "admin provide permission to those resources to mebers like you, or you may be an admin in this branch resources so you should controll member's permissions.",
                    'resources could be: services - like doing car wash, food delivery, home services and alot more. products - sell your products to others by exposing this product info in this platform. posts - make adverts to motivate other to puchase your products/services.'
                ]}
                color={'rgb(184, 136, 34)'}
                onExploreClicked={() => {
                    if (props.onExploreClicked)
                        props.onExploreClicked()
                    else
                        navigate('/business_frames/resources?section=2')
                }}
                image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/resources_home.jpg'}
                type={1}
            />
            <SpaceComponent height={'30px'} />
            <div className='resources-features-section'>
                <HomeFeatureCardComponent
                    style={'resources-permissions-card'}
                    icon={faKey}
                    title={'Permissions'}
                    descriptions={'Our branches have a granular permission system that allows us to control access to information and resources, ensuring that members only see what they need to do their jobs effectively.'} />
                <HomeFeatureCardComponent
                    style={'resources-products-card'}
                    icon={faBox}
                    title={'Products'}
                    descriptions={'Our high-quality products are designed to meet your needs and exceed your expectations, providing exceptional value and performance that you can rely on.'} />
                <HomeFeatureCardComponent
                    style={'resources-services-card'}
                    icon={faCogs}
                    title={'Services'}
                    descriptions={' Our comprehensive services are tailored to your unique requirements, delivering expert solutions and support to help you achieve your goals and maximize success.'} />
                <HomeFeatureCardComponent
                    style={'resources-posts-card'}
                    icon={faStickyNote}
                    title={'Posts'}
                    descriptions={'Our informative and engaging posts provide valuable insights and perspectives on industry trends, best practices, and emerging technologies, helping you stay ahead of the curve.'} />
            </div>
        </div>
    );
}

export default ResourcesComponent