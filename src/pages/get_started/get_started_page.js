import React from 'react';
import './get_started_page.css';
import { useNavigate } from 'react-router-dom';

function GetStartedPage(props) {
    const navigate = useNavigate();

    return (
        <div className='get-started-root'>

            <div className='get-started-side-section'>
                <h1 className='get-started-title'>
                    The place where you organize every thing in frames
                </h1>
                <h5 className='get-started-sub-title'>
                    Our store and content management web app is designed to help you manage your online store and content
                    easily and efficiently. With our intuitive interface and powerful features, you can create and manage
                    products, categories, pages, and more with just a few clicks. Whether you're a small business owner
                    or a large enterprise, our app has everything you need to succeed online. Start using our app today
                    and take your online presence to the next level!
                </h5>
                <div className='get-started-page-button'
                    onClick={() => {
                        navigate('/home')
                    }}>
                    <h3 >Get started</h3>
                </div>

            </div>
            <div className='get-started-image-section'>
                <img src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/get_started.jpg'} alt="get started" className='get-started-img' />
            </div>

        </div>
    );
}

export default GetStartedPage;