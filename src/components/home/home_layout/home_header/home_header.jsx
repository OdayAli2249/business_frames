import React from 'react';
import './home_header.css';
import SpaceComponent from '../../../core/space_component';
import { faBuilding, faFolderOpen, faMapMarkerAlt, faSearch, faUsers } from '@fortawesome/free-solid-svg-icons';
import QiuckNavigateOptionComponent from './qiuck_navigate_option_component';
import SearchControlComponent from '../../../core/form_components/controls/search_control_component';
import { useNavigate } from 'react-router-dom';

function HomeHeader(props) {

    const navigator = useNavigate();

    return (
        <div className='home-header-section'>
            <div className='home-header-image-back-ground'>
                <img src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/home_header.jpg'} alt="home header image" className='home-header-image-back-ground' />

            </div>
            <div className='home-header-gradient-back-ground'>
            </div>
            <div className='home-header-details-back-ground'>
                <div className='home-header-details'>
                    <h1 className='home-header-title'>Business Frames</h1>
                    <SpaceComponent height={'16px'} />
                    <h5 className='home-header-discription' >scroll down to display starting points of navigation</h5>
                    <SpaceComponent height={'16px'} />
                    <SearchControlComponent />
                    <SpaceComponent height={'16px'} />
                    <h5 className='home-header-discription'>
                        A content management website is a platform for creating, editing, and publishing
                        digital content, such as services, products, and posts.</h5>
                </div>
            </div>
            <div className='qiuck-navigate-section'>
                <ul className='qiuck-navigate-options'>
                    <QiuckNavigateOptionComponent
                        onClick={() => navigator('/business_frames/service-providers')}
                        title={'Service Providers'}
                        icon={faBuilding}
                        text={'explore your service providers, all service providers found and start navigate through all its content and relatives.'}
                    ></QiuckNavigateOptionComponent>
                    <SpaceComponent width={'10px'} />
                    <QiuckNavigateOptionComponent
                        onClick={() => navigator('/business_frames/branches')}
                        title={'Branches'}
                        icon={faMapMarkerAlt}
                        text={'go to branches and expose its features where you can modify exactly how it they should look in term of users, resources and user permission in each one, '}></QiuckNavigateOptionComponent>
                    <SpaceComponent width={'10px'} />
                    <QiuckNavigateOptionComponent
                        onClick={() => navigator('/business_frames/resources')}
                        title={'Resources'}
                        icon={faFolderOpen}
                        text={'resources is the mean content we framed and organized, you can do whatever you want in your content.'}></QiuckNavigateOptionComponent>
                    <SpaceComponent width={'10px'} />
                    <QiuckNavigateOptionComponent
                        onClick={() => navigator('/business_frames/members')}
                        title={'Users'}
                        icon={faUsers}
                        text={'expose other users like you and discover their businesses and role in this platform and make connetion with them to make the experience more plenty.'}></QiuckNavigateOptionComponent>
                </ul>
            </div>
        </div>
    );
}

export default HomeHeader;