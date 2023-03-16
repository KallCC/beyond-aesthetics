import { Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Feed from './Feed';
import { useAppSelector } from '../app/hooks';
import { getSidebar } from '../features/ui/uiSlice';
import { lazy, Suspense } from 'react';
import InfinityLoading from '../components/InfinityLoading';
const LazyDiscover = lazy(() => import('./Discover'));
const LazyUserProfile = lazy(() => import('../components/UserProfile'));

export const Home: React.FC = () => {
  const toggleSidebar = useAppSelector(getSidebar);

  return (
    <div className='flex flex-row '>
      <div >
        <nav className={` flex flex-col justify-between 2xl:text-xl  dark:bg-mainDarkColor bg-white h-full  shadow-md  border-r-2 dark:border-gray-700 ease-in scrollbar-hide ${toggleSidebar ? ' max-sm:absolute z-10  max-sm:flex w-60 2xl:w-80 duration-400  ' : ' max-sm:hidden w-13'}`}
          aria-label='side-bar'
        >
          <Sidebar />
        </nav>
      </div>
      <main className='bg-secondaryColor  dark:bg-secondaryDarkColor pb-2 flex-1  h-screen overflow-y-scroll'>
        <Routes>
          <Route path="/user-profile/:userId" element={
            <Suspense fallback={<InfinityLoading />}>
              <LazyUserProfile />
            </Suspense>
          } />
          <Route path="/discover" element={
            <Suspense fallback={<InfinityLoading />}>
              <LazyDiscover />
            </Suspense>
          } />
          <Route path="/*" element={<Feed />} />
        </Routes>
      </main>
    </div>
  )
}


export default Home