import { lazy, Suspense, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { Navbar, Search } from '../components'
import InfinityLoading from '../components/InfinityLoading';
import { getActiveAesthetic } from '../features/ui/uiSlice';
const LazyPostDetail = lazy(() => import('../components/PostDetail'));
const LazyCreatePost = lazy(() => import('../components/CreatePost'));

const Feed: React.FC = () => {
  const aesthetic = useAppSelector(getActiveAesthetic);
  const [searchTerm, setSearchTerm] = useState(aesthetic ? aesthetic.name : '')

  return (

    <div className="px-4 md:px-5 ">
      <nav className="rounded-2xl" aria-label='feed-nav'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} type={true} />
      </nav>
      <div className="h-full">
        <Routes>
          <Route path="/post-details/:postId" element={
            <Suspense fallback={<InfinityLoading />}>
              <LazyPostDetail setSearchTerm={setSearchTerm} />
            </Suspense>
          } />
          <Route path="/create-post" element={
            <Suspense fallback={<InfinityLoading />}>
              <LazyCreatePost />
            </Suspense>
          } />
          <Route path="/" element={<Search searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>

  )
}

export default Feed