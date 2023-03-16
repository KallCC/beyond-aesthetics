import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/loginvideo.webm'
import icon from '../assets/iconLogin.webp'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { alreadyLoggedIn, getUserStatus, loginUser, selectUser } from '../features/user/userSlice';
import { getUser } from '../utils/utils';

export const Login: React.FC = () => {

  const nav = useNavigate()
  const dispatch = useAppDispatch()

  const userStatus = useAppSelector(getUserStatus);
  const user = useAppSelector(selectUser);

  const is2xlScreen = window.innerWidth > 1536;

  const tryAlreadyLogged = useCallback(async () => {
    try {
      let userInfo = getUser();
      if (userInfo) {
        await dispatch(alreadyLoggedIn(userInfo)).unwrap()
        nav('/', { replace: true })
      }
    } catch (err) {
      console.error('Failed to sign-in: ', err)
    } finally {

    }
  }, [dispatch, nav])

  useEffect(() => {
    if (!user) {
      tryAlreadyLogged()
    }
  }, [tryAlreadyLogged, user])


  const resGoogle = async (response: CredentialResponse) => {
    if (response.credential) {
      try {
        await dispatch(loginUser(response.credential)).unwrap()
        nav('/', { replace: true })
      } catch (err) {
        console.error('Failed to sign-in: ', err)
      }
    }
  }

  return (
    <section aria-label='Login' className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          className='object-cover w-full h-full'
          src={shareVideo}
          data-type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <img src={icon} width="512" height="512" alt="logo" className=' xl:w-64 w-56 4k:w-508' />
          <div className='p-5'>
            <h1 className='text-white xl:text-4xl text-2xl font-sans 4k:text-7xl'>BeyondAesthetics</h1>
          </div>
          <div className=' shadow-2xl  mt-5 '>
            <GoogleLogin
              onSuccess={resGoogle}
              size='large'
              width={is2xlScreen ? '350px' : '250px'}
              shape='circle'
            />
          </div>
          <div className='items-center mt-4'>
            {userStatus === 'failed' && (
              <p className="text-red-500  text-xl  ">Sign-in Failed</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login