import React from 'react';
import './service_providers_component.css';
import { useNavigate } from 'react-router-dom';
import { faKey, faMapMarkerAlt, faUserTie, faUsers } from '@fortawesome/free-solid-svg-icons';
import HomeTitleSectionComponent from '../home_title_section_component';
import HomeFeatureCardComponent from '../home_feature_card_component';
import HomeOverviewSectionComponent from '../home_overview_section_component';
import SpaceComponent from '../../core/space_component';

function ServiceProvidersComponent(props) {
    const navigate = useNavigate();
    return (
        <div className='service-providers-component-root'
            id={props.id}>

            <HomeTitleSectionComponent title={'Service Providers'}
                subTitle={"a companies, or organizations contain member have access on resources according to permissions assigned my admin"} />
            <HomeOverviewSectionComponent
                about={[
                    'explore your service providers, all service providers found and start navigate through all its content and relatives.',
                    'go to branches and expose its features where you can modify exactly how it they should look in term of users, resources and user permission in each one.',
                    'expose other users like you and discover their businesses and role in this platform and make connetion with them to make the experience more plenty.'
                ]}
                color={'#af23aa'}
                onExploreClicked={() => {
                    if (props.onExploreClicked)
                        props.onExploreClicked()
                    else
                        navigate('/service-providers?section=2')
                }}
                image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service_providers_home.jpg'}
                type={1}
            />
            <SpaceComponent height={'30px'} />
            <div className='service-providers-features-section'>
                <HomeFeatureCardComponent
                    style={'service-providers-branches-card'}
                    icon={faMapMarkerAlt}
                    title={'Branches'}
                    descriptions={'every service provider contain at least one branch which in turn contaon number of members with different permissions and role according to their jobs.'} />
                <HomeFeatureCardComponent
                    style={'service-providers-permissions-card'}
                    icon={faKey}
                    title={'Permissions'}
                    descriptions={'control how can access and modify your resources, determine spacific members, and update or remove their access to part or all of your resources.'} />
                <HomeFeatureCardComponent
                    style={'service-providers-hiring-requests-card'}
                    icon={faUserTie}
                    title={'Hiring Requests'}
                    descriptions={'you can start modifying others content, first step send hiring requests toa company or service provider, then wait until any respone present.'} />
                <HomeFeatureCardComponent
                    style={'service-providers-members-card'}
                    icon={faUsers}
                    title={'Members'}
                    descriptions={'when user send hiring request and get accepted, he become a member in service provider,you can display members of service provider and access all their service providers.'} />
            </div>
        </div>
    );
}

export default ServiceProvidersComponent