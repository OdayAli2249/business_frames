
import React, { useEffect, useRef, useState } from 'react';
import './branch_products_page.css';
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import ProductCardComponent from '../../components/resources/cards/product_card_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import DialogComponent from '../../components/core/dialog_components/dialog_component';
import CreateProductFormComponent from '../../components/resources/form_components/create_product_form_component';
import { getProducts } from '../../state_management/middlewares/products_middleware';
import ProductViewEditComponent from '../../components/resources/dialog_content_component/product_view_edit_component';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { modifyProduct, reset } from '../../state_management/middlewares/modify_product_middleware';
import { Operations } from '../../state_management/actions';
import { useParams } from 'react-router-dom';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import ConfirmActionComponent from '../../components/core/confirm_action_component';


function BranchProductsPage(props) {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [showDialog, setShowDialog] = useState({
        add: false,
        edit: { product: null, tab: null },
        remove: { show: false, productId: null }
    });

    const { id } = useParams();

    const createResult = useSelector(state => state.modifyProduct);
    const dispatch = useDispatch();
    const paginationRef = useRef(null);


    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            }) && setShowDialog({ add: false, remove: { show: false, productId: null }, edit: { product: null, tab: null } })
            createResult.failure && toast(createResult.failure.message.slice(2), {
                position: 'top-center',
                autoClose: 5000,
                type: 'error'
            })
            dispatch(reset());
            if (createResult.success)
                paginationRef.current.refresh()
        }
    }, [dispatch, createResult]);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            paginationRef.current.refresh();
            setShowDialog({ add: false, remove: { show: false, productId: null }, edit: { product: null, tab: null } });
            dispatch(resetAuthStatus());
        }
    });

    return (
        <div className='branch-products-root'>
            <ToastContainer position="top-center" autoClose={5000} />
            {createResult.loading && <div className='unfocus' />}
            <div className='branch-products-grid-container'>
                <PaginationComponent
                    ref={paginationRef}
                    filters={new Map([
                        ['filter-type-1', ['filter-type-1-option-1', 'filter-type-1-option-2', 'filter-type-1-option-3',]],
                        ['filter-type-2', ['filter-type-2-option-1', 'filter-type-2-option-2', 'filter-type-2-option-3',]],
                        ['filter-type-3', ['filter-type-3-option-1', 'filter-type-3-option-2', 'filter-type-3-option-3',]]
                    ])}
                    initialView={{
                        grid: true,
                        list: false
                    }}
                    onCardClicked={() => {
                    }}
                    pageSize={6}                     // when start fetching data from I/O
                    gridCardSize={(windowWidth >= 1200 && windowWidth < 1500) ?
                        'extra-larg' : (windowWidth >= 800 && windowWidth < 1200) ? 'extra-larg' : 'larg'}
                    height='auto'                       // contatnt or auto
                    showFilter={false}
                    showView={false}
                    sideBorders={false}
                    showPages={true}
                    showSearch={true}
                    fetchParams={{ branchId: id }}
                    fetchData={getProducts}
                    selectedState={state => state.products}
                    // showFloatingAddButton={(data) => data && data.permissions == '100'}
                    onFloatingAddButtonClicked={() => setShowDialog({ ...showDialog, add: true })}
                    showFloatingAddButton={(data) => true}
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
            </div>
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
            {showDialog.add ?
                <DialogComponent
                    show={showDialog.add}
                    onClose={() => setShowDialog({ ...showDialog, add: false })}>
                    <CreateProductFormComponent
                        onSubmit={(productModel) => dispatch(modifyProduct({
                            product: productModel,
                            operation: Operations.CREATE,
                            branchId: id
                        }))}
                        dialogMode={true} />
                </DialogComponent> : <></>}

        </div>
    );
}

export default BranchProductsPage