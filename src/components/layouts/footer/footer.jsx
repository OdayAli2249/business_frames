import React from 'react';
import './footer.css';
import SpaceComponent from '../../core/space_component';
import { useNavigate } from 'react-router-dom';

function Footer(props) {
    const navigate = useNavigate();

    return (
        <footer className='footer'>
            <div className='footer-content'>
                <div className='footer-column'>
                    <h4 className='footer-column-title'>
                        Service Providers
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        branches
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        hiring requests
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        job offers
                    </h4>
                    <SpaceComponent height={'40px'} />
                    <h4 className='footer-column-title'>
                        Resources
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        products
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        services
                    </h4>
                </div>
                <div className='footer-column'>
                    <h4 className='footer-column-title'>
                        Branches
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        permissions
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        members
                    </h4>
                    <SpaceComponent height={'40px'} />
                    <h4 className='footer-column-title'>
                        User
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        find member
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        remove account
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        update account
                    </h4>
                </div>
                <div className='footer-column'>
                    <h4 className='footer-column-title'>
                        Home
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        get started
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        explore service providers
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        explore branches
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        explore members
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        profile
                    </h4>
                    <h4 className='footer-column-sub-title'>
                        about
                    </h4>
                </div>
                <div className='footer-column'>
                    <img onClick={() => {
                        navigate('/home')
                    }}
                        src={'https://odayali2249.github.io/portfolio-resources/resources/bf/images/logo.png'} className='footer-logo' />
                    <SpaceComponent height={'20px'} />
                    <div className='footer-row'>
                        <div className='footer-contact' />
                        <SpaceComponent width={'10px'} />
                        <div className='footer-contact' />
                        <SpaceComponent width={'10px'} />
                        <div className='footer-contact' />
                        <SpaceComponent width={'10px'} />
                        <div className='footer-contact' />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;