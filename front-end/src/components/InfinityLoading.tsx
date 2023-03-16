import { InfinitySpin } from 'react-loader-spinner'

interface message {
    message?: string
}

const InfinityLoading: React.FC<message>  = ( { message }: message) => {

    return (
        <div className='flex flex-col justify-center items-center h-full w-full dark:text-white' >
            <InfinitySpin
                width='200'
                color="rgb(37 99 235)"
            />
           {message}
        </div>
    )
}

export default InfinityLoading