import React, { useState, forwardRef, useRef } from 'react';
import './create_permission_group_step3_style.scss'
import CarouselComponent from '../../../../../core/carousel_component/carousel_component';
import SpaceComponent from '../../../../../core/space_component';
import PaginationComponent from '../../../../../core/pagination_components/pagination_component';
import SelectableListItemComponent from '../../../../../core/selectable_list_item_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faTools } from '@fortawesome/free-solid-svg-icons';
import { getServices } from '../../../../../../state_management/middlewares/services_middleware';
import { getProducts } from '../../../../../../state_management/middlewares/products_middleware';
import { getPosts } from '../../../../../../state_management/middlewares/posts_middleware';

const CreatePermissionGroupStep3 = forwardRef((props, ref) => {

    const [isValid, setIsValid] = useState(null);

    const [currentTab, setCurrentTab] = useState(0);
    const carouselRef = useRef(null);

    const [selectedPosts, setSelectedPosts] = useState(props.permissionGroup ? props.permissionGroup.postIds : []);
    const [selectedProducts, setSelectedProducts] = useState(props.permissionGroup ? props.permissionGroup.productIds : []);
    const [selectedServices, setSelectedServices] = useState(props.permissionGroup ? props.permissionGroup.serviceIds : []);
    const validate = () => {
        let validationResult = selectedPosts.length != 0
            || selectedProducts.length != 0
            || selectedServices.length != 0;  // to do call child level functio to determine that
        if (validationResult) {
            setIsValid(true)
            props.next({
                serviceIds: selectedServices,
                postIds: selectedPosts,
                productIds: selectedProducts
            })
        }
        else setIsValid(false)
    };

    React.useImperativeHandle(ref, () => ({
        validate
    }));

    return (
        <div className='create-permission-group-step3-root'
            style={props.style}
            ref={ref}>
            <div className='create-permission-group-step3-header-title-outer-row'>
                <div className='row-main-space-between-cross-center'>
                    <FontAwesomeIcon icon={faBoxOpen}
                        className='s-background-padding-w-background-color  secondary-icon-color-m-icon-size' />
                    <SpaceComponent width={'20px'} />
                    <h4 className='basic-m-text-size-l-text-weight'>
                        Select Resources
                    </h4>
                </div>
            </div>
            <div className='create-permission-group-step3-content'>
                {isValid == false ? <h3 className='error-text'>
                    It is required to select one resource at least before you go to the next step
                </h3> : <></>}
                <div className='create-permission-group-step3-tab-bar'>
                    <div className='create-permission-group-step3-tab-bar-button'
                        onClick={() => {
                            carouselRef.current.goto(0);
                            setCurrentTab(0);
                        }}
                        style={{ borderBottom: currentTab == 0 ? '5px solid #333' : null }}>
                        Services
                    </div>
                    <SpaceComponent width={'12px'} />
                    <div className='create-permission-group-step3-tab-bar-button'
                        onClick={() => {
                            carouselRef.current.goto(1);
                            setCurrentTab(1);
                        }}
                        style={{ borderBottom: currentTab == 1 ? '5px solid #333' : null }}>
                        Products
                    </div>
                    <SpaceComponent width={'12px'} />
                    <div className='create-permission-group-step3-tab-bar-button'
                        onClick={() => {
                            carouselRef.current.goto(2);
                            setCurrentTab(2);
                        }}
                        style={{ borderBottom: currentTab == 2 ? '5px solid #333' : null }}>
                        Posts
                    </div>
                </div>
                <div className='create-permission-group-step3-carousel-container'>
                    <CarouselComponent itemsToShow={1}
                        ref={carouselRef}
                        onChange={(index) => setCurrentTab(index)} >
                        <div className='select-resources-grid-container'>
                            <div >
                                Select Services
                            </div>
                            <PaginationComponent
                                id={'resources-explorer'}
                                initialView={{
                                    grid: true,
                                    list: false
                                }}
                                pageSize={8}
                                gridCardSize='extra-larg'
                                height='auto'
                                showFilter={false}
                                sideBorders={false}
                                showView={false}
                                showPages={true}
                                showSearch={false}
                                fetchParams={{ branchId: props.branchId }}
                                fetchData={getServices}
                                selectedState={state => state.services}
                                itemBuilder={(ID, service) => <SelectableListItemComponent
                                    key={ID} selectionMod={props.selectionMod}
                                    title={service.name}
                                    subtitleFirst={service.price + '$'}
                                    subtitleSecond={service.shortDescription}
                                    defaultIcon={faTools}
                                    image={service.images && service.images.length >= 1 ?
                                        'services/' + service.images[0] : null}
                                    onItemSelected={() => {
                                        if (!selectedServices.includes(service.id))
                                            setSelectedServices([...selectedServices, service.id])
                                        else {
                                            let newSelectedServices = [...selectedServices];
                                            let indexToRemove = selectedServices.indexOf(service.id);
                                            if (indexToRemove !== -1) {
                                                newSelectedServices.splice(indexToRemove, 1);
                                            }
                                            setSelectedServices(newSelectedServices)
                                        }
                                    }}
                                    selected={selectedServices.includes(service.id)} />}
                            />
                        </div>
                        <div className='select-resources-grid-container'>
                            <div >
                                Select Products
                            </div>
                            <PaginationComponent
                                id={'resources-explorer'}
                                initialView={{
                                    grid: true,
                                    list: false
                                }}
                                pageSize={8}
                                gridCardSize='extra-larg'
                                height='auto'
                                showFilter={false}
                                sideBorders={false}
                                showView={false}
                                showPages={true}
                                showSearch={false}
                                fetchParams={{ branchId: props.branchId }}
                                fetchData={getProducts}
                                selectedState={state => state.products}
                                itemBuilder={(ID, product) => <SelectableListItemComponent
                                    key={ID} selectionMod={props.selectionMod}
                                    title={product.name}
                                    subtitleFirst={product.price}
                                    subtitleSecond={product.shortDescription}
                                    defaultIcon={faBoxOpen}
                                    image={product.images && product.images.length >= 1 ?
                                        'products/' + product.images[0] : null}
                                    onItemSelected={() => {
                                        if (!selectedProducts.includes(product.id))
                                            setSelectedProducts([...selectedProducts, product.id])
                                        else {
                                            let newSelectedProducts = [...selectedProducts];
                                            let indexToRemove = selectedProducts.indexOf(product.id);
                                            if (indexToRemove !== -1) {
                                                newSelectedProducts.splice(indexToRemove, 1);
                                            }
                                            setSelectedProducts(newSelectedProducts)
                                        }
                                    }}
                                    selected={selectedProducts.includes(product.id)} />}
                            />
                        </div>
                        <div className='select-resources-grid-container'>
                            <div >
                                Select Posts
                            </div>
                            <PaginationComponent
                                id={'resources-explorer'}
                                initialView={{
                                    grid: true,
                                    list: false
                                }}
                                pageSize={8}
                                gridCardSize='extra-larg'
                                height='auto'
                                showFilter={false}
                                sideBorders={false}
                                showView={false}
                                showPages={true}
                                showSearch={false}
                                fetchParams={{ branchId: props.branchId }}
                                fetchData={getPosts}
                                selectedState={state => state.posts}
                                itemBuilder={(ID, post) => <SelectableListItemComponent
                                    key={ID} selectionMod={props.selectionMod}
                                    title={post.name}
                                    subtitleFirst={''}
                                    subtitleSecond={''}
                                    defaultIcon={faBoxOpen}
                                    image={post.posterUrl ?
                                        'post/' + post.posterUrl : null}
                                    onItemSelected={() => {
                                        if (!selectedPosts.includes(post.id))
                                            setSelectedPosts([...selectedPosts, post.id])
                                        else {
                                            let newSelectedPosts = [...selectedPosts];
                                            let indexToRemove = selectedPosts.indexOf(post.id);
                                            if (indexToRemove !== -1) {
                                                newSelectedPosts.splice(indexToRemove, 1);
                                            }
                                            setSelectedPosts(newSelectedPosts)
                                        }
                                    }}
                                    selected={selectedPosts.includes(post.id)} />}
                            />
                        </div>

                    </CarouselComponent>
                </div>
            </div>
        </div>
    );
});

export default CreatePermissionGroupStep3;