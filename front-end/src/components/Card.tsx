import { BiArrowUpRightCircle } from './Icons';
import {  useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { setAesthetic } from '../features/ui/uiSlice';
import { Aesthetic } from '../ts/interfaces';


export const Card: React.FC<Aesthetic> = ( aesthetic : Aesthetic) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const handleSearchAesthetic = () =>{
        dispatch(setAesthetic(aesthetic))
        navigate(`/`)
      }
    
    return (
        <div className=' p-3  ' 
        onClick={ () => handleSearchAesthetic()}
        >
            <div className='rounded-xl relative'>
                <div className='absolute w-full h-full bg-black/60 rounded-xl text-white hover:bg-black/0 cursor-pointer'>
                    <h2 className='font-bold text-2xl px-2 pt-4'>{aesthetic.name}</h2>
                    { aesthetic.decade_of_origin !== '' &&  <h3 className='px-2'>{aesthetic.decade_of_origin}</h3>}
                    <a
                        href={aesthetic.wiki}
                        target="_blank"
                        className="flex items-center right-1 gap-2 p-1 pl-2 pr-2  bg-white  text-black font-bold absolute bottom-1 bott rounded-full opacity-70 hover:opacity-100 "
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <BiArrowUpRightCircle />
                        wiki
                    </a>
                </div>
                {aesthetic.hasImg && (
                        <img
                            src={require(`../assets/${aesthetic.photo_filename}.webp`)}
                            alt={aesthetic.photo_filename}
                            className='max-h-[160px] w-full rounded-xl '
                        />
                )}

            </div>
        </div>
    )
}

export default Card