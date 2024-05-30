import React, { useEffect } from 'react';
import './navigation_bar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useState } from 'react';
import CategoriesPopUp from '../categories_pop_up/categories_pop_up';
import { useLocation, useNavigate } from 'react-router-dom';
import SpaceComponent from '../../core/space_component';
import MemberProfileCardComponent from '../../members/cards/member_profile_card_component';
import DialogComponent from '../../core/dialog_components/dialog_component';
import AllCategoriesPopUp from '../categories_pop_up/all_categories_pop_up';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logOut } from '../../../state_management/middlewares/user_middleware';
import NetworkImageComponent from '../../core/network_image_component';
import ConfirmActionComponent from '../../core/confirm_action_component';
import { ToastContainer } from 'react-toastify';

function NavigationBar(props) {

    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showOptionsPopUp, setShowOptionsPopUp] = useState(null);
    const [showProfilePopUp, setShowProfilePopUp] = useState(false);
    const [logoutDialog, setShowLogoutDialog] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, []);

    const categories = (<ul className="categories">
        <li className={selectedCategory === 'home' ? "active-categories-item" : "categories-item"}
            onClick={() => handleCategoryClick('home')}
            onMouseEnter={() => {
                setShowOptionsPopUp(1);
            }} onMouseLeave={() => {
                setShowOptionsPopUp(null);
            }}>
            <h5 className="categories-label">Home</h5>
        </li>
        <SpaceComponent width={'20px'} />
        {showOptionsPopUp === 2 && <CategoriesPopUp onMouseEnter={() => {
            setShowOptionsPopUp(2);
        }}
            onMouseLeave={() => {
                setShowOptionsPopUp(null);
            }}
            type={'service-providers'} />}
        <li className={selectedCategory === 'service-providers' ?
            "active-categories-item" : "categories-item"}
            onClick={() => handleCategoryClick('service-providers')}
            onMouseEnter={() => {
                setShowOptionsPopUp(2);
            }} onMouseLeave={() => {
                setShowOptionsPopUp(null);
            }}>
            <h5 className="categories-label">Service providers</h5>
        </li>
        <SpaceComponent width={'20px'} />
        {showOptionsPopUp === 3 && <CategoriesPopUp onMouseEnter={() => {
            setShowOptionsPopUp(3);
        }}
            onMouseLeave={() => {
                setShowOptionsPopUp(null);
            }}
            type={'members'} />}
        <li className={selectedCategory === 'members' ?
            "active-categories-item" : "categories-item"}
            onClick={() => handleCategoryClick('members')}
            onMouseEnter={() => {
                setShowOptionsPopUp(3);
            }} onMouseLeave={() => {
                setShowOptionsPopUp(null);
            }}>
            <h5 className="categories-label">Members</h5>

        </li>
        <SpaceComponent width={'20px'} />
        {showOptionsPopUp === 5 && <CategoriesPopUp onMouseEnter={() => {
            setShowOptionsPopUp(5);
        }}
            onMouseLeave={() => {
                setShowOptionsPopUp(null);
            }}
            type={'resources'} />}
        <li className={selectedCategory === 'resources' ?
            "active-categories-item" : "categories-item"}
            onClick={() => handleCategoryClick('resources')}
            onMouseEnter={() => {
                setShowOptionsPopUp(5);
            }} onMouseLeave={() => {
                setShowOptionsPopUp(null);
            }}>
            <h5 className="categories-label">Resources</h5>
        </li>
        <SpaceComponent width={'20px'} />
        {showOptionsPopUp === 7 && <CategoriesPopUp onMouseEnter={() => {
            setShowOptionsPopUp(7);
        }}
            onMouseLeave={() => {
                setShowOptionsPopUp(null);
            }}
            type={'branches'} />}
        <li
            className={selectedCategory === 'branches' ?
                "active-categories-item" : "categories-item"}
            onClick={() => handleCategoryClick('branches')}
            onMouseEnter={() => {
                setShowOptionsPopUp(7);
            }} onMouseLeave={() => {
                setShowOptionsPopUp(null);
            }}>
            <h5 className="categories-label">Branches</h5>
        </li>
    </ul>);

    const location = useLocation();
    useEffect(() => {
        setSelectedCategory(location.pathname.split('/')[1]);
    }, [location]);

    const handleCategoryClick = (item) => {
        navigate('/business_frames/' + item);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <nav className="navbar">
            <ToastContainer position="top-center" autoClose={5000} />
            <ul className="authentication">
                {user.failure ?
                    <> <li className="authentication-button"
                        onClick={() =>
                            navigate('/business_frames/auth?tab=signin')
                        }>
                        Log in
                    </li>
                        <li className="authentication-button"
                            onClick={() =>
                                navigate('/business_frames/auth?tab=signup')
                            }>
                            Sign up
                        </li></> : <></>}
                {user.data && user.data.item ?
                    <div className='navbar-profile-row'>
                        {/* <div icon={faUser} className='navbar-profile-avatar' >
                            <FontAwesomeIcon icon={faUser} style={{ width: '30px', height: '30px' }}
                                onClick={() => { navigate('/members/members-home/' + user.data.item.id) }} />
                        </div> */}
                        {user.data.item.profilePictureUrl ? <NetworkImageComponent className='navbar-profile-avatar'
                            onClick={() => { navigate('/business_frames/members/members-home/' + user.data.item.id) }}
                            src={'users/' + user.data.item.profilePictureUrl} /> : <div className='navbar-profile-avatar'
                                onClick={() => { navigate('/business_frames/members/members-home/' + user.data.item.id) }} >
                            <FontAwesomeIcon icon={faUser} style={{ width: '30px', height: '30px', color: 'gray' }} />
                        </div>}
                        <SpaceComponent width={'6px'} />
                        <FontAwesomeIcon icon={faAngleDown} style={{
                            color: 'white', width: '20px',
                            height: '20px', cursor: 'pointer'
                        }}
                            onClick={() => {
                                setShowProfilePopUp(!showProfilePopUp);
                            }} />
                        <div className='profile-pop-up-box' style={{ display: showProfilePopUp ? null : 'none' }}>
                            <MemberProfileCardComponent user={user.item} mod={'small'}
                                onLogoutClicked={() => { setShowLogoutDialog(true) }} />
                        </div>
                    </div> : <></>}
            </ul>

            {windowWidth < 1000 ? <></> : categories}
            <div className='logo-row'>
                {windowWidth < 1000 ? <AllCategoriesPopUp >
                    {categories}
                </AllCategoriesPopUp> : <></>}

                <img onClick={() => {
                    navigate('/business_frames/home')
                }}
                    src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/logo.png'} className='logo' />
            </div>
            <DialogComponent
                higherZIndex={logoutDialog}
                show={logoutDialog}
                height='50'
                onClose={() => setShowLogoutDialog(false)}>
                <ConfirmActionComponent
                    text={'Are you sure you want to log out?'}
                    positiveAction={'Confirm'}
                    negativeAction={'Cancel'}
                    onNegativeAction={() => setShowLogoutDialog(false)}
                    onPositiveAction={() => {
                        dispatch(logOut());
                        setShowLogoutDialog(false)
                    }} />
            </DialogComponent>
        </nav>
    );
}

export default NavigationBar