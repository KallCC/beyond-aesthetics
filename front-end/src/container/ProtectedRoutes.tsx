import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { isLoggedIn } from '../features/user/userSlice';


const ProtectedRoutes: React.FC  = () => {

    const islogIn = useAppSelector(isLoggedIn);

    return islogIn ? <Outlet /> : <Navigate to='/login' />

}

export default ProtectedRoutes