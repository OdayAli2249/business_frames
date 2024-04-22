import React, { useEffect, useState } from 'react';
import './root_layout.css';
import NavigationBar from '../navigation_bar/navigation_bar';
import Footer from '../footer/footer';
import { Outlet, useLocation } from 'react-router-dom';

function RootLayout(props) {

    const location = useLocation();
    const [layout, setLayout] = useState(0);
    useEffect(() => {
        setLayout(location.pathname.split('/')[2] ? 1 :
            location.pathname.split('/')[1] == 'auth' ? 2 : 0);
    }, [location]);

    return (
        <div className='root-layout'>
            <main>
                {location.pathname.split('/')[1] == 'auth' ? <></> : <NavigationBar />}
                <div style={{ height: (layout == 0 ? 60 : layout == 2 ? 0 : 180) + 'px' }} />
                <div style={{
                    width: '100%', height: 'calc(100vh - ' +
                        (layout == 0 ? 60 : layout == 2 ? 0 : 180) + 'px)', overflowY: layout == 0 ? 'scroll' : 'hidden',
                    display: 'flex', flexDirection: 'column'
                }}>
                    <Outlet />
                </div>
                {/* {location.pathname.split('/')[1] == 'auth' ? <></> : <Footer />} */}
            </main>
        </div>
    );
}

export default RootLayout;