import React from 'react';
import './branches_component.css';
import { useNavigate } from 'react-router-dom';
import { faFolder, faKey, faUsers } from '@fortawesome/free-solid-svg-icons';
import HomeTitleSectionComponent from '../home_title_section_component';
import HomeFeatureCardComponent from '../home_feature_card_component';
import HomeOverviewSectionComponent from '../home_overview_section_component';
import SpaceComponent from '../../core/space_component';


function BranchesComponent(props) {
    const navigate = useNavigate();
    return (
        <div className='branches-component-root'
            id={props.id}>
            <HomeTitleSectionComponent title={'Branches'}
                subTitle={"Explore our company's diverse branches for innovative solutions."} />
            <HomeOverviewSectionComponent
                about={[
                    'Our talented team members across all branches are dedicated to providing exceptional service and expertise to meet your needs and exceed expectations.',
                    'Our branches offer a wealth of resources, including expert insights, cutting-edge technology, and customized solutions, to help you achieve your goals and maximize success.',
                    'Our branches operate under strict permission protocols to ensure secure access and protection of sensitive data. Trust us to safeguard your information and privacy.'
                ]}
                color={'#3c58b6'}
                onExploreClicked={() => {
                    if (props.onExploreClicked)
                        props.onExploreClicked()
                    else
                        navigate('/business_frames/branches?section=2')
                }}
                image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/branches_home.jpg'}
                type={0}
            />
            <SpaceComponent height={'30px'} />
            <div className='branches-features-section'>
                <HomeFeatureCardComponent
                    style={'branches-resources-card'}
                    icon={faFolder}
                    title={'Resources'}
                    descriptions={'Our branches provide a diverse range of resources, including industry-leading research, expert analysis, and innovative tools, to help you stay ahead of the curve and achieve your goals.'} />
                <HomeFeatureCardComponent
                    style={'branches-permissions-card'}
                    icon={faKey}
                    title={'Permissions'}
                    descriptions={'Our branches have a granular permission system that allows us to control access to information and resources,ensuring that members only see what they need to do their jobs effectively.'} />
                <HomeFeatureCardComponent
                    style={'branches-members-card'}
                    icon={faUsers}
                    title={'Members'}
                    descriptions={'Our branches are powered by a dedicated team of professionals with diverse backgrounds and expertise, united in their commitment to delivering exceptional service and value to our clients.'} />
            </div>
        </div>
    );
}

export default BranchesComponent