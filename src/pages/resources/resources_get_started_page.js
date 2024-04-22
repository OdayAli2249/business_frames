import React, { useEffect, useRef, useState } from 'react';
import './resources_get_started_page.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import ResourcesComponent from '../../components/home/resources/resources_component';
import SpaceComponent from '../../components/core/space_component';
import ServiceCardComponent from '../../components/resources/cards/service_card_component';
import ProductCardComponent from '../../components/resources/cards/product_card_component';
import { getProducts } from '../../state_management/middlewares/products_middleware';
import { getServices } from '../../state_management/middlewares/services_middleware';
import ProductViewEditComponent from '../../components/resources/dialog_content_component/product_view_edit_component';
import DialogComponent from '../../components/core/dialog_components/dialog_component';
import ServiceViewEditComponent from '../../components/resources/dialog_content_component/service_view_edit_component';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';


function ResourcesGetStartedPage(props) {
    const navigate = useNavigate();
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
        if (user.type == 0) {
            dispatch(resetAuthStatus());
        }
    });

    const [showDialog, setShowDialog] = useState({
        viewProduct: { show: false, product: null },
        viewService: { show: false, service: null }
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const section = searchParams.get('section');
    const location = useLocation();

    useEffect(() => {
        if (section == 2) {
            const element = document.getElementById('resources-explorer');
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
        } else {
            const element = document.getElementById('resources-component');
            if (element)
                element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    return (
        <div className='resources-get-started-root'
            id='/resources-get-started-component' >
            <SpaceComponent height={'120px'} />
            <ResourcesComponent
                id={'resources-component'}
                onExploreClicked={() => {
                    const element = document.getElementById('resources-explorer');
                    if (element)
                        element.scrollIntoView({ behavior: 'smooth' });
                }} />
            <SpaceComponent height={'20px'} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <SpaceComponent height={'2px'}
                    width={'94%'}
                    color={'rgb(220,220,220'} />
            </div>
            <SpaceComponent height={'20px'} />
            <h4 className='resources-get-started-title'>
                Services
            </h4>
            <SpaceComponent height={'20px'} />
            <div className='resources-grid-container'>
                <PaginationComponent
                    id={'resources-explorer'}
                    filters={new Map([
                        ['filter-type-1', ['filter-type-1-option-1', 'filter-type-1-option-2', 'filter-type-1-option-3',]],
                        ['filter-type-2', ['filter-type-2-option-1', 'filter-type-2-option-2', 'filter-type-2-option-3',]],
                        ['filter-type-3', ['filter-type-3-option-1', 'filter-type-3-option-2', 'filter-type-3-option-3',]]
                    ])}
                    initialView={{
                        grid: true,
                        list: false
                    }}
                    // onCardClicked={() => {
                    //     navigate('/resources/resources-home')
                    // }}
                    pageSize={6}                     // when start fetching data from I/O
                    gridCardSize={windowWidth >= 800 && windowWidth < 1400 ? 'extra-larg' : 'larg'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    showView={false}
                    sideBorders={false}
                    showPages={true}
                    showSearch={true}
                    fetchParams={{ branchId: -1 }}
                    fetchData={getServices}
                    selectedState={state => state.services}
                    itemBuilder={(ID, service) => <ServiceCardComponent
                        service={service}
                        hideOptions={true}
                        key={ID}
                        onViewClicked={() => {
                            setShowDialog({ ...showDialog, viewService: { show: true, service: service } });
                        }}
                    />}
                />
            </div>
            <SpaceComponent height={'20px'} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <SpaceComponent height={'2px'}
                    width={'94%'}
                    color={'rgb(220,220,220'} />
            </div>
            <SpaceComponent height={'20px'} />
            <h4 className='resources-get-started-title'>
                Products
            </h4>
            <SpaceComponent height={'20px'} />
            <div className='resources-grid-container'>
                <PaginationComponent
                    id={'resources-explorer'}
                    filters={new Map([
                        ['filter-type-1', ['filter-type-1-option-1', 'filter-type-1-option-2', 'filter-type-1-option-3',]],
                        ['filter-type-2', ['filter-type-2-option-1', 'filter-type-2-option-2', 'filter-type-2-option-3',]],
                        ['filter-type-3', ['filter-type-3-option-1', 'filter-type-3-option-2', 'filter-type-3-option-3',]]
                    ])}
                    initialView={{
                        grid: true,
                        list: false
                    }}
                    // onCardClicked={() => {
                    //     navigate('/resources/resources-home')
                    // }}
                    pageSize={6}                     // when start fetching data from I/O
                    gridCardSize={windowWidth >= 800 && windowWidth < 1400 ? 'extra-larg' : 'larg'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    showView={false}
                    sideBorders={false}
                    showPages={true}
                    showSearch={true}
                    fetchParams={{ branchId: -1 }}
                    fetchData={getProducts}
                    selectedState={state => state.products}
                    itemBuilder={(ID, product) => <ProductCardComponent
                        product={product}
                        hideOptions={true}
                        key={ID}
                        onViewClicked={() => {
                            setShowDialog({ ...showDialog, viewProduct: { show: true, product: product } });
                        }}
                    />}
                />
            </div>
            {showDialog.viewProduct.show ?
                <DialogComponent
                    show={showDialog.viewProduct.show}
                    closeIconColor={'white'}
                    mod='extra-fill'
                    onClose={() => setShowDialog({ ...showDialog, viewProduct: { show: false, product: null } })}>
                    <ProductViewEditComponent product={showDialog.viewProduct.product} />
                </DialogComponent> : <></>}
            {showDialog.viewService.show ?
                <DialogComponent
                    show={showDialog.viewService.show}
                    closeIconColor={'white'}
                    mod='extra-fill'
                    onClose={() => setShowDialog({ ...showDialog, viewService: { show: false, service: null } })}>
                    <ServiceViewEditComponent service={showDialog.viewService.service} />
                </DialogComponent> : <></>}
        </div>
    );
}

export default ResourcesGetStartedPage

