import { useEffect } from 'react'
import { MsSun, MsMoon, ArrowLeft, ArrowRight, IonInfiniteOutline, MsStarSearch } from './Icons';
import { Link, NavLink } from 'react-router-dom'
import icon from '../assets/icon.webp'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUser } from '../features/user/userSlice';
import { setTheme, flipTheme, setSidebar, flipSidebar, getSidebar, getTheme } from '../features/ui/uiSlice';

let isOnStyle = ' hover:text-blue-600  capitalize flex items-center px-5 gap-3 border-r-2 border-black dark:border-white transaction-all duration-300 ease-in-out   '
let isOffStyle = ' hover:text-blue-600 transaction-all ease-in '

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser);
  const toggleSidebar = useAppSelector(getSidebar);
  const toggleTheme = useAppSelector(getTheme);

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? dispatch(setTheme('dark'))
      : dispatch(setTheme('light'))
  }, [dispatch])

  useEffect(() => {
    toggleTheme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark")
  }, [toggleTheme]);

  const handleThemeSwitch = () => {
    dispatch(flipTheme());
  };

  const setToggleSidebar = (onOrOff: boolean) => {
    dispatch(setSidebar(onOrOff));
  };

  return (
    <>
      <button
        className={` banner absolute  object-top top-48 z-20 rounded-full p-2  bg-black cursor-pointer text-lg text-center text-white transition-all ${toggleSidebar ? "2xl:ml-300 ml-54 duration-400 z-20 " : "ml-12 "}`}
        onClick={() => dispatch(flipSidebar())}
        aria-label='toggle side bar'
      >
        {toggleSidebar ? <ArrowLeft /> : <ArrowRight />}

      </button>
      <div className={`flex flex-col dark:text-white ${toggleSidebar ? " gap-5 capitalize " : " duration-300  mt-0 justify-items-center items-center gap-6 "}`}>

        <div className='w-full h-60 max-sm:h-auto grid justify-items-center items-center z-0  duration-200'>
          <Link to={'/'}
           onClick={() => setToggleSidebar(false)}
           >
            <img src={icon} alt='icon' className={toggleSidebar ? 'w-32' : 'w-20'} />
          </Link>
          {toggleSidebar && <h3 className='text-black  dark:text-white text-xl  2xl:text-2xl font-sans'>BeyondAesthetics</h3>}

        </div>
        {toggleSidebar && <div className='mt-6 ml-4 mb-3 text-gray-600'>
          Management
        </div>}
        <NavLink
          to={'/discover'}
          className={({ isActive }) => {
            let match = isActive ? ' text-blue-600' : 'dark:text-white dark:hover:text-blue-600'
            let style = toggleSidebar ? isOnStyle : isOffStyle
            return style + match
          }
          }
          onClick={() => setToggleSidebar(false)}
          aria-label='Discover aesthetics'

        >
          <IonInfiniteOutline className='' size={toggleSidebar ? 20 : 30} />
          {toggleSidebar ? 'Discover' : null}
        </NavLink>
        <NavLink
          to={'/'}
          className={({ isActive }) => {
            let match = isActive ? ' text-blue-600' : 'dark:text-white  dark:hover:text-blue-600'
            let style = toggleSidebar ? isOnStyle : isOffStyle
            return style + match
          }
          }
          aria-label='Feed'
          onClick={() => setToggleSidebar(false)}
        >
          <MsStarSearch size={toggleSidebar ? 20 : 30} />
          {toggleSidebar ? 'Feed' : null}
        </NavLink>

        <hr className='mt-3 mb-3  h-1 rounded-sm mx-8 ' />

        {toggleSidebar && <div className=' mb-3 ml-4 text-gray-600'>
          Support
        </div>}


        <button
          className={
            toggleSidebar ? isOnStyle : isOffStyle
          }
          onClick={handleThemeSwitch}
          aria-label='toggle color mode'
        >
          {toggleTheme === "dark" ? <MsSun className='dark:text-white' size={toggleSidebar ? 20 : 30} /> : <MsMoon size={toggleSidebar ? 20 : 30} />}
          {toggleSidebar ? ` ${toggleTheme === "dark" ? "Light Mode" : "Dark Mode"}` : null}
        </button>
        { /*
        <NavLink
          to={'/about'}
          className={({ isActive }) => {
            let match = isActive ? ' text-blue-600' : null
            let style = toggleSidebar ? isOnStyle : isOffStyle
            return style + match
          }
          }
          aria-label='About'
          onClick={() => setToggleSidebar(false)}
        >
          <TfiHelpAlt size={toggleSidebar ? 20 : 30} />
          {toggleSidebar ? 'Get Help' : null}
        </NavLink>

        */
        }
      </div>
      {user && (
        <Link
          onClick={() => setToggleSidebar(false)}
          to={`user-profile/${user._id}`}
          className='flex  mb-3 gap-2 p-2 items-center bg-white dark:bg-secondaryDarkColor dark:text-white rounded-lg shadow-lg  '
        >
          <img src={user.image} referrerPolicy="no-referrer" className='w-11 h-11 rounded-full' alt='user-img' />
          {toggleSidebar ? <p>{user.userName}</p> : null}

        </Link>
      )}
    </>
  )
}

export default Sidebar