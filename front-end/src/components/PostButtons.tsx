import { useAppDispatch, useAppSelector } from '../app/hooks';
import { savedPost, selectUser, unsavePost } from '../features/user/userSlice';
import { deletedPost } from '../features/posts/postsSlice';
import { useEffect, useState } from 'react';
import { Post } from '../ts/interfaces';
import ThreeDotsLoading from './ThreeDotsLoading';
import { MdiBookmark, MdiBookmarkOff, MdiDelete } from './Icons';

const DeletePostButton = (post: Post) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser);

    const deletePost = (id: string) => {
        if (id !== '') {
            dispatch(deletedPost(id))
        }
    };

    const { _id } = post
    return (
        <>
            {post.postedBy?._id === user?._id && _id && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        deletePost(_id);
                    }}
                    aria-label='Delete Post'
                    className="bg-white p-2 rounded-full w-9 h-9 flex items-center justify-center text-dark opacity-70 hover:opacity-100 outline-none"
                >
                    <MdiDelete />
                </button>
            )}
        </>
    )
}

const SaveUnSavePostButton = (post: Post) => {
    const [savingPost, setSavingPost] = useState(false);
    const [alreadySaved, setAlreadySaved] = useState(false);

    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser);

    const { _id } = post

    useEffect(() => {
        if (user?.save) {
            let saved = user?.save.find(saved => saved.postId === _id);
            setAlreadySaved(saved ? true : false)
        }
    }, [_id, user?.save])

    const savePost = () => {
        if (user._id && !alreadySaved && _id) {
            setSavingPost(true);
            dispatch(savedPost({ postId: _id, userId: user._id })).unwrap().then(() => {
                setSavingPost(false);
            })
        }
    };

    const deleteSavePost = () => {
        if (user?.save && user._id && alreadySaved && _id) {
            setSavingPost(true);
            dispatch(unsavePost({ postId: _id, userId: user._id })).unwrap().then(() => {
                setSavingPost(false);
            })
        }
    };

    return (
        <>
            {alreadySaved ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteSavePost();
                    }}
                    aria-label='UnSave Post'
                    type="button"
                    className="bg-black flex gap-2 text-white w-9 h-9  font-bold px-2 py-2 text-base rounded-3xl hover:shadow-md outline-none">
                    {savingPost ? <ThreeDotsLoading /> : <MdiBookmark />}
                </button>
            ) : (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        savePost();
                    }}
                    aria-label='Save Post'
                    type="button"
                    className="bg-black  opacity-70 hover:opacity-100 w-9 h-9 text-white font-bold px-2 py-2 text-base rounded-3xl hover:shadow-md outline-none"
                >
                    {savingPost ? <ThreeDotsLoading /> : <MdiBookmarkOff />}
                </button>
            )}
        </>

    )
}

export { SaveUnSavePostButton,DeletePostButton}