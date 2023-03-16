import { useEffect, useState } from 'react';
import { MaterialSymbolsLogout } from './Icons';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import MasonryLayout from './MasonryLayout';
import InfinityLoading from './InfinityLoading';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetUserState, selectUser } from '../features/user/userSlice';
import { fetchCreatedPosts, fetchSavedPosts, resetPostsState, selectCreated, selectSaved } from '../features/posts/postsSlice';
import { MdiHamburgerMenu } from './Icons';
import { flipSidebar } from '../features/ui/uiSlice';

const activeBtnStyles = 'bg-black text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'dark:text-white bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile: React.FC = () => {

  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { userId } = useParams();

  const user = useAppSelector(selectUser);
  const created = useAppSelector(selectCreated);
  const saved = useAppSelector(selectSaved);
  const randomProfileImage = 'https://source.unsplash.com/1600x900/?travel,nature'

  useEffect(() => {
    if (userId) {
      dispatch(fetchCreatedPosts(userId))
      if (user.save) {
        let savedIds: Array<string> = []
        user.save.forEach((save) => {
          savedIds.push(save.postId)
        })
        dispatch(fetchSavedPosts(savedIds))
      }
    }
  }, [dispatch, user.save, userId]);

  const logout = () => {
    googleLogout()
    dispatch(resetPostsState())
    dispatch(resetUserState())  
    navigate('/login');
  };

  if (!user) return <InfinityLoading message="Loading profile" />;

  return (
    <div className="px-4 md:px-5 ">
      <section aria-label='user-profile' className="relative pb-2 h-full justify-center items-center">
        <div className="absolute top-1 z-1 right-0 p-2">
          {userId === user._id && (
            <button
              type="button"
              className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => logout()}
              aria-label='Logout'
            >
              <MaterialSymbolsLogout color="red" fontSize={21} />
            </button>
          )}
        </div>
        <div className="absolute top-1 z-1 left-0 p-2 max-sm:flex hidden">
          <button type="button" className='bg-white rounded-full p-2' aria-label='toggleSidebar'
            onClick={() => dispatch(flipSidebar())}
          >
            <MdiHamburgerMenu aria-label='open side bar' />
          </button>
        </div>
        <div className="flex flex-col pb-5">
          <div className=" flex flex-col mb-7">
            <div className="flex flex-col justify-center items-center">
              <img
                className=" w-full h-370 2xl:h-420 shadow-lg object-cover rounded-md"
                src={randomProfileImage}
                alt="banner-pic"
              />
              <img
                className="rounded-full w-20 h-20 -mt-10 shadow-xl"
                referrerPolicy="no-referrer"
                src={user.image}
                alt="user-pic"
              />
            </div>
            <h1 className="font-bold text-3xl text-center mt-3 dark:text-white">
              {user.userName}
            </h1>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                const target = e.target as HTMLInputElement
                if (target.textContent) {
                  setText(target.textContent);
                  setActiveBtn('created');
                }
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                const target = e.target as HTMLInputElement
                if (target.textContent) {
                  setText(target.textContent);
                  setActiveBtn('saved');
                }
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>

          <section aria-label='created/saved posts'>
            <div className="px-2">
              <MasonryLayout posts={text === 'Created' ? created : saved} />
            </div>

            {((text === 'Created' && created?.length === 0) || (text === 'Saved' && saved?.length === 0)) && (
              <div className="flex justify-center font-bold items-center w-full text-1xl mt-2 dark:text-white">
                No posts yet!
              </div>
            )}
          </section>
        </div>

      </section>
    </div>
  );
};

export default UserProfile;