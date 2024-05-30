import './branch_products_style.scss';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from '../core/carousel_component/carousel_component';
import ProductCardComponent from '../resources/cards/product_card_component';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { modifyProduct, reset } from '../../state_management/middlewares/modify_product_middleware';
import DialogComponent from '../core/dialog_components/dialog_component';
import ProductViewEditComponent from '../resources/dialog_content_component/product_view_edit_component';
import { getProducts } from '../../state_management/middlewares/products_middleware';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import ConfirmActionComponent from '../core/confirm_action_component';
import { Operations } from '../../state_management/actions';


function BranchProductsComponent(props) {
    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const [showDialog, setShowDialog] = useState({
        edit: { product: null, tab: null },
        remove: { show: false, productId: null }
    });


    const createResult = useSelector(state => state.modifyProduct);
    const dispatch = useDispatch();
    const carouselRef = useRef(null);


    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            }) && setShowDialog({ remove: { show: false, productId: null }, edit: { product: null, tab: null } })
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
            if (createResult.success)
                carouselRef.current.refresh()
        }
    }, [dispatch, createResult]);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            carouselRef.current.refresh();
            setShowDialog({ add: false, remove: { show: false, productId: null }, edit: { product: null, tab: null } });
            dispatch(resetAuthStatus());
        }
    });

    return (
        <div className='branch-products-component-root'
            id='/branch-products'>
            {createResult.loading && <div className='unfocus' />}
            <CarouselComponent itemsToShow={windowWidth < 700 ? 1 : 2}
                ref={carouselRef}
                label={'Products'}
                onViewAllClicked={() => navigator('/branches/branch-products/' + props.id)}
                params={{ branchId: props.id, offset: 0, limit: 6 }}
                fetchData={getProducts}
                selectedState={state => state.products}
                itemBuilder={(ID, product) => <ProductCardComponent
                    product={product}
                    key={ID}
                    onViewClicked={() => {
                        setShowDialog({ ...showDialog, edit: { product: product, tab: 1 } });
                    }}
                    onEditClicked={() => {
                        setShowDialog({ ...showDialog, edit: { product: product, tab: 2 } });
                    }}
                    onRemoveClicked={() => {
                        setShowDialog({ ...showDialog, remove: { show: true, productId: product.id } });
                    }} />}
            />
            {showDialog.edit.product ?
                <DialogComponent
                    show={showDialog.edit.product ? true : false}
                    closeIconColor={'white'}
                    mod='extra-fill'
                    onClose={() => setShowDialog({ ...showDialog, edit: { product: null, tab: null } })}>
                    <ProductViewEditComponent product={showDialog.edit.product}
                        tab={showDialog.edit.tab}
                        onSubmit={(productModel) => dispatch(modifyProduct({ product: productModel, operation: Operations.EDIT }))} />
                </DialogComponent> : <></>}
            <DialogComponent
                higherZIndex={showDialog.remove.higherZIndex}
                show={showDialog.remove.show}
                height='50'
                onClose={() => setShowDialog({ ...showDialog, remove: { show: false, productId: null } })}>
                <ConfirmActionComponent
                    text={'Are you sure you want to remove this product?'}
                    positiveAction={'Confirm'}
                    negativeAction={'Cancel'}
                    onNegativeAction={() => setShowDialog({ ...showDialog, remove: { show: false, productId: null } })}
                    onPositiveAction={() => {
                        dispatch(modifyProduct({
                            productId: showDialog.remove.productId,
                            operation: Operations.REMOVE
                        }));
                        setShowDialog({ ...showDialog, remove: { show: false, productId: null } });
                    }} />
            </DialogComponent>
        </div>
    );
}

export default BranchProductsComponent