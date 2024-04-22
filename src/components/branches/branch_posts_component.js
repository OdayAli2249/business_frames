import React, { useEffect, useRef, useState } from 'react';
import './branch_posts_style.scss';
import { useNavigate } from 'react-router-dom';
import CarouselComponent from '../core/carousel_component/carousel_component';
import PostCardComponent from '../resources/cards/post_card_component';
import { Operations } from '../../state_management/actions';
import CreatePostFromComponent from '../resources/form_components/create_post_form_component';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../state_management/middlewares/posts_middleware';
import { modifyPost, reset } from '../../state_management/middlewares/modify_post_middleware';
import DialogComponent from '../core/dialog_components/dialog_component';
import ConfirmActionComponent from '../core/confirm_action_component';
import { resetAuthStatus } from '../../state_management/middlewares/user_middleware';


function BranchPostsComponent(props) {

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
        edit: { post: null },
        remove: false
    });

    const createResult = useSelector(state => state.modifyPost);
    const dispatch = useDispatch();
    const carouselRef = useRef(null);


    useEffect(() => {
        if (createResult.failure != null || createResult.success != null) {
            createResult.success && toast('Action Completed Successfuly', {
                position: 'top-center',
                autoClose: 5000,
                type: 'success'   // success - warning - error - info
            }) && setShowDialog({
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
                carouselRef.current.refresh()
        }
    }, [dispatch, createResult]);

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type == 0) {
            carouselRef.current.refresh();
            setShowDialog({
                edit: { post: null },
                remove: { postId: null, show: false }
            });
            dispatch(resetAuthStatus());
        }
    });

    return (
        <div className='branch-posts-component-root'
            id='/branch-posts'>
            {createResult.loading && <div className='unfocus' />}
            <CarouselComponent itemsToShow={windowWidth < 700 ? 1 : 2}
                label={'Posts'}
                ref={carouselRef}
                onViewAllClicked={() => navigator('/branches/branch-posts/' + props.id)}
                params={{ branchId: props.id, limit: 6, offset: 0 }}
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
            {showDialog.edit.post ?
                <DialogComponent
                    show={showDialog.edit.post ? true : false}
                    closeIconColor={'white'}
                    height='50'
                    onClose={() => setShowDialog({ ...showDialog, edit: { post: null } })}>
                    <CreatePostFromComponent post={showDialog.edit.post}
                        onSubmit={(postModel) => dispatch(modifyPost({ post: postModel, operation: Operations.EDIT }))} />
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

export default BranchPostsComponent