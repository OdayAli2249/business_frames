import React from 'react';
import './members_component.css';
import { useNavigate } from 'react-router-dom';
import { faKey, faMapMarkerAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import HomeTitleSectionComponent from '../home_title_section_component';
import HomeFeatureCardComponent from '../home_feature_card_component';
import HomeOverviewSectionComponent from '../home_overview_section_component';
import SpaceComponent from '../../core/space_component';

function MembersComponent(props) {
    const navigate = useNavigate();
    return (
        <div className='members-component-root'
            id={props.id}>
            <HomeTitleSectionComponent title={'Members'}
                subTitle={"a companies, or organizations contain member have access on resources according to permissions assigned my admin."} />
            <HomeOverviewSectionComponent
                about={[
                    'explore your service providers, all service providers found and start navigate through all its content and relatives.',
                    'go to branches and expose its features where you can modify exactly how it they should look in term of users, resources and user permission in each one.',
                    'expose other users like you and discover their businesses and role in this platform and make connetion with them to make the experience more plenty.'
                ]}
                color={'#da4444'}
                onExploreClicked={() => {
                    if (props.onExploreClicked)
                        props.onExploreClicked()
                    else
                        navigate('/business_frames/members?section=2')
                }}
                image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/members_home.jpg'}
                type={0}
            />
              <SpaceComponent height = {'30px'}/>
            <div className='members-features-section'>
                <HomeFeatureCardComponent
                    style={'members-resources-card'}
                    icon={faMapMarkerAlt}
                    title={'Resources'}
                    descriptions={'Our branches provide a diverse range of resources, including industry-leading research, expert analysis, and innovative tools, to help you stay ahead of the curve and achieve your goals.'} />
                <HomeFeatureCardComponent
                    style={'members-permissions-card'}
                    icon={faKey}
                    title={'Permissions'}
                    descriptions={'Our branches have a granular permission system that allows us to control access to information and resources, ensuring that members only see what they need to do their jobs effectively.'} />
                <HomeFeatureCardComponent
                    style={'members-members-card'}
                    icon={faUsers}
                    title={'Members'}
                    descriptions={'Our branches are powered by a dedicated team of professionals with diverse backgrounds and expertise, united in their commitment to delivering exceptional service and value to our clients.'} />
            </div>
        </div>
    );
}

export default MembersComponent