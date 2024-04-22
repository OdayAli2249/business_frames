import React, { useEffect, useRef, useState } from 'react';
import './user_auth_page.css';
import CarouselComponent from '../../components/core/carousel_component/carousel_component';
import SpaceComponent from '../../components/core/space_component';
import UserSigninComponent from '../../components/user/user_signin_component';
import UserSignupComponent from '../../components/user/user_signup_component';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset, signUser } from '../../state_management/middlewares/sign_middleware';
import { Operations } from '../../state_management/actions';
import { ToastContainer, toast } from 'react-toastify';

function UserAuthPage(props) {

    const [currentTab, setCurrentTab] = useState(0);
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    const createResult = useSelector(state => state.sign);
    const dispatch = useDispatch();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get('tab');

    useEffect(() => {
        if (tab == 'signup') {
            carouselRef.current.goto(1);
            setCurrentTab(1);
        }
    }, [location]);

    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && navigate('/home')
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
            if (createResult.success && createResult.data.operation == Operations.CREATE) {
                carouselRef.current.goto(0);
                setCurrentTab(0);
            } else if (createResult.success && createResult.success.operation == Operations.LOGIN) {
                navigate('branches/branch-products/7')
            }
        }
    }, [dispatch, createResult]);

    return (
        <div className='user-auth-page-root'>
            <ToastContainer position="top-center" autoClose={5000} />
            {createResult.loading && <div className='unfocus' />}
            <div className='user-auth-page-forground'>
                <h4 className='user-auth-page-home-navigate'
                    onClick={() => {
                        navigate('/home')
                    }}>home</h4>
                <img className='user-auth-page-forground-image'
                    src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/sign up background.png'}></img>
                <div className='user-auth-page-forground-tab-bar'>
                    <div className='user-auth-tab-bar'>
                        <div className='user-auth-tab-bar-button'
                            onClick={() => {
                                carouselRef.current.goto(0);
                                setCurrentTab(0);
                            }}
                            style={{ borderBottom: currentTab == 0 ? '3px solid blue' : null }}>
                            Sign in
                        </div>
                        <SpaceComponent width={'24px'} />
                        <div className='user-auth-tab-bar-button'
                            onClick={() => {
                                carouselRef.current.goto(1);
                                setCurrentTab(1);
                            }}
                            style={{ borderBottom: currentTab == 1 ? '3px solid blue' : null }}>
                            Sign up
                        </div>
                    </div>
                    <div className='user-auth-carousel-container'>
                        <CarouselComponent itemsToShow={1}
                            ref={carouselRef}
                            onChange={(index) => setCurrentTab(index)} >
                            <div className='user-auth-tab'>
                                <UserSigninComponent
                                    onSigninButtonClicked={(credentials) => {
                                        dispatch(signUser({ credentials: credentials, operation: Operations.LOGIN }));
                                    }}
                                    onSignupClicked={() => {
                                        carouselRef.current.goto(1);
                                        setCurrentTab(1);
                                    }} />
                            </div>
                            <div className='user-auth-tab'>
                                <UserSignupComponent
                                    onSignupButtonClicked={(user) => {
                                        dispatch(signUser({ user: user, operation: Operations.CREATE }));
                                    }}
                                    onSigninClicked={() => {
                                        carouselRef.current.goto(0);
                                        setCurrentTab(0);
                                    }} />
                            </div>
                        </CarouselComponent>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAuthPage;