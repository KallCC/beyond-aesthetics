import { useEffect, useState, useCallback, Dispatch, SetStateAction } from 'react';
import { ArrowLeft, BiArrowUpRightCircle, MdiDownloadCircle } from './Icons'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { relatedAestheticsQuery, postsDetailQuery } from '../utils/data';
import InfinityLoading from './InfinityLoading';
import ThreeDotsLoading from './ThreeDotsLoading';
import { Post } from '../ts/interfaces';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/user/userSlice';
import { SaveUnSavePostButton } from './PostButtons';

interface postDetailsProps {
  setSearchTerm: Dispatch<SetStateAction<string>>;
}


const PostDetail: React.FC<postDetailsProps> = ({ setSearchTerm }: postDetailsProps) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loadingRelPosts, setLoadingRelPosts] = useState(false);
  const [postDetail, setPostDetail] = useState<Post>();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { postId } = useParams();
  const navigate = useNavigate();
  
  const user = useAppSelector(selectUser);

  const getPostDetails = useCallback((postrev?: string) => {
    if (postId) {
      const query = postsDetailQuery(postId, postrev);
      if (query) {
        client.fetch(`${query}`).then((data) => {
          setPostDetail(data[0]);
          if (data[0]) {
            setLoadingRelPosts(true);
            const q2 = relatedAestheticsQuery(data[0]);
            client.fetch(q2).then((res) => {
              setRelatedPosts(res);
              setLoadingRelPosts(false)
            });
          }
        });
      }
    }
  }, [postId])

  useEffect(() => {
    getPostDetails();
  }, [getPostDetails, postId]);

  const addComment = () => {
    if (comment && postId) {
      setAddingComment(true);
      client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{
          _key: uuidv4(),
          comment,
          postedBy: {
            _type: 'postedBy',
            _ref: user._id
          }
        }])
        .commit()
        .then((e) => {
          getPostDetails(e._rev);
          setComment('');
          setAddingComment(false);
        });
    }
  };

  
  const handleSearchAesthetic = () => {
    if (postDetail && postDetail.aesthetic) {
      setSearchTerm(postDetail.aesthetic)
    }
    navigate('/')
  }

  const handleBackClick = () =>{
    navigate(-1)
  }

  return (

    <>
      {!postDetail
        ? <InfinityLoading message="Loading post info" />
        : <>
            <div className=" relative">
              <button type="button" onClick={handleBackClick} className='bg-white rounded-full p-1 ' aria-label='go back po posts'
              >
                <ArrowLeft  />
              </button>
            </div>
          <section aria-label='post-details' className="flex xl:flex-row flex-col m-auto mt-6 ml-2 bg-white  dark:bg-mainDarkColor rounded-3xl  gap-3" >
            <div className="flex justify-center items-center flex-initial grow ">
              <img
                className="rounded-3xl h-420 px-2 py-2 "
                loading='lazy'
                src={(postDetail?.image && urlFor(postDetail?.image).url())}
                alt='post'
              />
            </div>
            <div className="flex flex-col p-5 xl:min-w-620 ">
              <div className="flex flex-wrap items-center justify-between gap-4 ">
                <div className='flex flex-row gap-2 max-sm:items-start'>
                  {postDetail?.image?.asset &&
                    <a
                      href={`${postDetail.image.asset.url}?dl=`}
                      download
                      aria-label='Download image'
                      className="bg-secondaryColor p-2 w-9 h-9 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100 shadow-md"
                    >
                      < MdiDownloadCircle />
                    </a>
                  }
                  <SaveUnSavePostButton {...postDetail} />
                </div>
                <div className='flex font-bold '>
                  {postDetail.externalLink && postDetail.externalLink?.length > 0 ? (
                    <a
                      href={postDetail.externalLink}
                      target="_blank"
                      className="bg-secondaryColor  shadow-md  rounded-full p-2 flex gap-2 text-black opacity-75 hover:opacity-100 "
                      rel="noreferrer"
                    >
                      <BiArrowUpRightCircle width={"20px"}
                        height={"20px"} />
                      {postDetail.externalLink.length > 15 ? `${postDetail.externalLink.slice(8, 30)}...` : postDetail.externalLink}
                    </a>
                  ) : undefined}
                </div>
              </div>
              <div className='dark:text-white'>
                <h1 className="text-4xl mt-5 font-bold break-words ">
                  {postDetail.title}
                </h1>
                <p className="mt-3">{postDetail.about}</p>
                <button
                  aria-label='search aeshthetics'
                  onClick={() => handleSearchAesthetic()}
                  className={`cursor-pointer dark:bg-white dark:text-black font-bold bg-black text-white mt-3 capitalize p-2 pl-4 pr-4 rounded-full inline-block shadow-md `}>
                  {postDetail.aesthetic}
                </button>
              </div>
              <div className='dark:text-white'>
                <Link to={`/user-profile/${postDetail?.postedBy?._id}`} className="flex gap-2 mt-5 items-center  rounded-lg ">
                  <img src={postDetail?.postedBy?.image} className="w-10 h-10 rounded-full" alt="user-profile" />
                  <p className="font-bold">{postDetail?.postedBy?.userName}</p>
                </Link>
                <h2 className="mt-5 text-2xl">Comments</h2>
                <section className="max-h-370 overflow-y-auto" aria-label='comment'>
                  {postDetail?.comments?.map((item) => (
                    <article key={item._key} className="flex gap-2 mt-5 items-center rounded-lg" >
                      <img
                        src={item.postedBy?.image}
                        className="w-10 h-10 rounded-full cursor-pointer"
                        alt="user-profile"
                      />
                      <div className="flex flex-col" >
                        <h3 className="font-bold">{item.postedBy?.userName}</h3>
                        <p>{item.comment}</p>
                      </div>
                    </article>
                  ))}
                </section>
              </div>
              <div className="flex flex-wrap mt-6 gap-3">
                <Link to={`/user-profile/${user._id}`}>
                  <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
                </Link>
                <input
                  className=" flex-1 dark:bg-secondaryDarkColor dark:text-white dark:focus:border-gray-500 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="button"
                  className="bg-black  text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                  onClick={addComment}
                >
                  {addingComment ? <ThreeDotsLoading /> : 'Done'}
                </button>
              </div>
            </div>
          </section>
          <div>
            {loadingRelPosts
              ? <InfinityLoading message="Loading more pins" />
              :
              relatedPosts?.length > 0 && (
                <>
                  <h2 className="text-center font-bold text-2xl mt-8 mb-4 dark:text-white">
                    Related Posts
                  </h2>
                  <MasonryLayout posts={relatedPosts} />
                </>
              )
            }
          </div>
        </>
      }
    </>
  )
}

export default PostDetail