import { Dispatch, SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoAdd, IoMdSearch, IoMdCloseCircle,MdiHamburgerMenu } from './Icons';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { statusChange } from '../features/posts/postsSlice';
import { deleteAesthetic, flipSidebar } from '../features/ui/uiSlice';
import { selectUser } from '../features/user/userSlice';
import { useDebounceValue } from '../utils/utils';

interface navProps {
  searchTerm: string;
  setSearchTerm?: Dispatch<SetStateAction<string>>;
  type: boolean;
}

const Navbar: React.FC<navProps> = ({ searchTerm, setSearchTerm, type }: navProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser);

  let debounceValue = useDebounceValue(searchTerm)
  
  useEffect(() => {
    dispatch(statusChange('idle'))
  }, [dispatch, debounceValue])

  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7  ">
        <button className='max-sm:flex items-center hidden cursor-pointer' aria-label='toggleSidebar'
          onClick={() => dispatch(flipSidebar())}
        >
          <MdiHamburgerMenu size={30} className='dark:text-white ' aria-label='open side bar' />
        </button>
        <div className="flex  items-center w-full dark:text-white px-1 rounded-md bg-white dark:bg-mainDarkColor border-none outline-none shadow-sm mx-2">
          <IoMdSearch fontSize={21} className="ml-1" aria-label='search icon' />
          {type ?
            <>
              {setSearchTerm &&
                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  value={searchTerm}
                  onFocus={() => navigate('/')}
                  className="p-4 w-full outline-none dark:bg-mainDarkColor"
                  aria-label='Search for new posts'
                />
              }

            </>
            :
            <div className=' w-full '>
              {setSearchTerm &&
                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  value={searchTerm}
                  className="p-4 w-full outline-none dark:bg-mainDarkColor"
                  aria-label='search for aesthetics'
                />
              }
            </div>
          }
          {searchTerm !== '' && <button onClick={() => {
            setSearchTerm && setSearchTerm('')
            dispatch(deleteAesthetic())
          }}><IoMdCloseCircle
              fontSize={21}
              className="mr-2 cursor-pointer"
            /></button>}
        </div>
        <div className="flex gap-3  items-center">
          <Link to={`/user-profile/${user?._id}`} className="block w-12 h-12  " aria-label='user profile'>
            <img src={user.image} referrerPolicy="no-referrer" alt="user-pic" className="rounded-full" />
          </Link>
          {type && (
            <Link aria-label='create new post' to="/create-post" className="bg-black text-white w-12 h-12 rounded-full  flex justify-center items-center">
              <IoAdd />
            </Link>
          )}
        </div>
      </div>
    </>
  )

}

export default Navbar