import React, { useEffect, useRef, useState } from 'react';
import './branch_posts_page.css'
import PaginationComponent from '../../components/core/pagination_components/pagination_component';
import PostCardComponent from '../../components/resources/cards/post_card_component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import DialogComponent from '../../components/core/dialog_components/dialog_component';
import { getPosts } from '../../state_management/middlewares/posts_middleware';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Operations } from '../../state_management/actions';
import { modifyPost, reset } from '../../state_management/middlewares/modify_post_middleware';
import CreatePostFromComponent from '../../components/resources/form_components/create_post_form_component';
import { useParams } from 'react-router-dom';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';
import ConfirmActionComponent from '../../components/core/confirm_action_component';


function BranchPostsPage(props) {
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
        edit: { post: null },
        remove: false
    });

    const { id } = useParams();

    const createResult = useSelector(state => state.modifyPost);
    const dispatch = useDispatch();
    const paginationRef = useRef(null);


    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            }) && setShowDialog({
                add: false,
                edit: { post: null },
                remove: false
            })
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
            setShowDialog({
                add: false,
                edit: { post: null },
                remove: { postId: null, show: false }
            });
            dispatch(resetAuthStatus());
        }
    });

    return (
        <div className='branch-posts-root'>
            <ToastContainer position="top-center" autoClose={5000} />
            {createResult.loading && <div className='unfocus' />}
            <FontAwesomeIcon className='branch-posts-floating-add-button'
                icon={faAdd}
                onClick={() => {
                    setShowDialog({ ...showDialog, add: true })
                }} />
            <div className='branch-posts-grid-container'>
                <PaginationComponent
                    // id={'resources-explorer'}
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
                    showPages={true}
                    sideBorders={false}
                    showSearch={true}
                    fetchParams={{ branchId: id }}
                    fetchData={getPosts}
                    selectedState={state => state.posts}
                    itemBuilder={(ID, post) => <PostCardComponent
                        post={post}
                        key={ID}
                        onEditClicked={() => {
                            setShowDialog({ ...showDialog, edit: { post: post } });
                        }}
                        onRemoveClicked={() => {
                            setShowDialog({ ...showDialog, remove: { show: true, postId: post.id } });
                        }} />}
                />
            </div>
            {showDialog.edit.post ?
                <DialogComponent
                    show={showDialog.edit.post ? true : false}
                    closeIconColor={'white'}
                    height='50'
                    onClose={() => setShowDialog({ ...showDialog, edit: { post: null } })}>
                    <CreatePostFromComponent post={showDialog.edit.post}
                        onSubmit={(postModel) => dispatch(modifyPost({ post: postModel, operation: Operations.EDIT }))} />
                </DialogComponent> : <></>}
            {showDialog.add ?
                <DialogComponent
                    show={showDialog.add}
                    closeIconColor={'white'}
                    height='50'
                    onClose={() => setShowDialog({ ...showDialog, add: false })}>
                    <CreatePostFromComponent
                        onSubmit={(postModel) => dispatch(modifyPost({ branchId: id, post: postModel, operation: Operations.CREATE }))} />
                </DialogComponent> : <></>}
            <DialogComponent
                show={showDialog.remove.show}
                height='50'
                onClose={() => setShowDialog({ ...showDialog, remove: { show: false, postId: null } })}>
                <ConfirmActionComponent
                    text={'Are you sure you want to remove this post?'}
                    positiveAction={'Confirm'}
                    negativeAction={'Cancel'}
                    onNegativeAction={() => setShowDialog({ ...showDialog, remove: { show: false, postId: null } })}
                    onPositiveAction={() => {
                        dispatch(modifyPost({
                            postId: showDialog.remove.postId,
                            operation: Operations.REMOVE
                        }));
                        setShowDialog({ ...showDialog, remove: { show: false, postId: null } });
                    }} />
            </DialogComponent>
        </div>
    );
}

export default BranchPostsPage