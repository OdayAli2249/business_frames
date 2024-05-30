import React from 'react';
import './categories_pop_up.css';
import HomeOverviewSectionComponent from '../../home/home_overview_section_component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

function CategoriesPopUp(props) {
    const navigator = useNavigate();
    const user = useSelector(state => state.user);
    const loginToast = () => toast('You have to login first', {
        position: 'top-center',
        autoClose: 5000,
        type: 'error'
    })

    return (
        <li >
            <div className='hover-box' onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}>
                <div className='pop-up-box' >
                    {props.type == 'service-providers' ?
                        <HomeOverviewSectionComponent
                            about={[
                                'explore your service providers, all service providers found and start navigate through all its content and relatives.',
                                'go to branches and expose its features where you can modify exactly how it they should look in term of users, resources and user permission in each one.',
                                'expose other users like you and discover their businesses and role in this platform and make connetion with them to make the experience more plenty.'
                            ]}
                            color={'#af23aa'}
                            onExploreClicked={() => {
                                user.data && user.data.item ?
                                    navigator('/service-providers?section=2')
                                    : loginToast()
                            }}
                            image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/service_providers_home.jpg'}
                            type={1}
                            size={'small'}
                        /> : <></>}
                    {props.type == 'members' ?
                        <HomeOverviewSectionComponent
                            about={[
                                'explore your service providers, all service providers found and start navigate through all its content and relatives.',
                                'go to branches and expose its features where you can modify exactly how it they should look in term of users, resources and user permission in each one.',
                                'expose other users like you and discover their businesses and role in this platform and make connetion with them to make the experience more plenty.'
                            ]}
                            color={'#da4444'}
                            onExploreClicked={() => {
                                user.data && user.data.item ?
                                    navigator('/members?section=2')
                                    : loginToast()
                            }}
                            image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/members_home.jpg'}
                            type={0}
                            size={'small'}
                        /> : <></>}
                    {props.type == 'resources' ?
                        <HomeOverviewSectionComponent
                            about={[
                                'explore all resources that could be found in a branch and modify its property, and as always any action is restricted to whatever permission you get provided by admin.',
                                "admin provide permission to those resources to mebers like you, or you may be an admin in this branch resources so you should controll member's permissions.",
                                'resources could be: services - like doing car wash, food delivery, home services and alot more. products - sell your products to others by exposing this product info in this platform. posts - make adverts to motivate other to puchase your products/services.'
                            ]}
                            color={'rgb(184, 136, 34)'}
                            onExploreClicked={() => {
                                user.data && user.data.item ?
                                    navigator('/resources?section=2')
                                    : loginToast()
                            }}
                            image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/resources_home.jpg'}
                            type={1}
                            size={'small'}
                        /> : <></>}
                    {props.type == 'branches' ?
                        <HomeOverviewSectionComponent
                            about={[
                                'Our talented team members across all branches are dedicated to providing exceptional service and expertise to meet your needs and exceed expectations.',
                                'Our branches offer a wealth of resources, including expert insights, cutting-edge technology, and customized solutions, to help you achieve your goals and maximize success.',
                                'Our branches operate under strict permission protocols to ensure secure access and protection of sensitive data. Trust us to safeguard your information and privacy.'
                            ]}
                            color={'#3c58b6'}
                            onExploreClicked={() => {
                                user.data && user.data.item ?
                                    navigator('/branches?section=2')
                                    : loginToast()
                            }}
                            image={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/branches_home.jpg'}
                            type={0}
                            size={'small'}
                        /> : <></>}
                </div>
            </div>
        </li>
    );
}

export default CategoriesPopUp