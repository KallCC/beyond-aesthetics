import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowUpRightCircle, MdiDownloadCircle } from './Icons'
import { urlFor } from '../client';
import { Post as PostInterface } from '../ts/interfaces';
import { DeletePostButton, SaveUnSavePostButton } from './PostButtons';

const Post: React.FC<PostInterface> = (post: PostInterface) => {
    const navigate = useNavigate();
    const [postHover, setPostHover] = useState(false);

    const { postedBy, image, externalLink } = post;

    return (
        <div className='m-2'>
            <div
                onMouseEnter={() => setPostHover(true)}
                onMouseLeave={() => setPostHover(false)}
                onClick={() => navigate(`/post-details/${post._id}`)}
                className=' relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg transition-all duration-500 ease-in-out'
            >

                {image && (
                    <img className="rounded-lg w-full" src={(urlFor(image).url())} alt="user-post" />
                )}
                {postHover && (
                    <div
                        className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"

                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    aria-label='Download'
                                    className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                ><MdiDownloadCircle />
                                </a>
                            </div>
                            <SaveUnSavePostButton {...post} />
                        </div>
                        <div className=" flex justify-between items-center gap-2 w-full">
                            {externalLink && externalLink?.slice(8).length > 0 ? (
                                <a
                                    href={externalLink}
                                    target="_blank"
                                    className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                                    rel="noreferrer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}>
                                    <BiArrowUpRightCircle />
                                    {externalLink.length > 15 ? `${externalLink.slice(8, 17)}...` : externalLink}
                                </a>
                            ) : undefined}
                            <DeletePostButton {...post} />
                        </div>
                    </div>
                )}
            </div>
            <Link to={`/user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
                <img
                    className="w-8 h-8 rounded-full "
                    src={postedBy?.image}
                    alt="user-profile"
                    referrerPolicy="no-referrer"
                />
                <p className=" capitalize dark:text-white">{postedBy?.userName}</p>
            </Link>
        </div>
    )
}

export default Post