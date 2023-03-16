
import { ThreeDots } from 'react-loader-spinner'

const ThreeDotsLoading: React.FC  = ()=> {
    return (
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <ThreeDots
                height="20"
                width="20"
                radius="5"
                color="#ffffff"
                ariaLabel="three-dots-loading"
                visible={true}
            />
        </div>
    )
}

export default ThreeDotsLoading