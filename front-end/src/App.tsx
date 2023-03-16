import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import ProtectedRoutes from './container/ProtectedRoutes';
import InfinityLoading from './components/InfinityLoading';
import { lazy, Suspense } from 'react';
const LazyHome = lazy(() => import('./container/Home'));

function App() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='/*' element={
          <Suspense fallback={<InfinityLoading />}>
            <LazyHome />
          </Suspense>
        } />
      </Route>
    </Routes>
  )
}

export default App;
