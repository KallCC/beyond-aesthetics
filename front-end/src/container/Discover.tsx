import  { useEffect } from 'react'
import { useState } from 'react';
import { Navbar } from '../components'
import { aesthetics } from '../utils/aesthetics';
import Card from '../components/Card';
import { useDebounceValue } from '../utils/utils';
import { Aesthetic } from '../ts/interfaces';

const Discover: React.FC  =() => {
  const [searchTerm, setSearchTerm] = useState('')
  const [ filteredArray, setFilteredArray] = useState<Aesthetic[]>([])

  let debounceValue = useDebounceValue(searchTerm)

  useEffect(() =>{
    setFilteredArray(aesthetics.filter(item => item.name.toLowerCase().includes(debounceValue.toLowerCase())))
  },[debounceValue])

  return (
    <div className="px-4 md:px-5 ">
      <nav className="rounded-2xl" aria-label='discover nagination'>
        <Navbar type={false} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </nav>
      <section className="h-full" aria-label='Aesthetics list'>
        <div className='grid xl:grid-cols-4 md:grid-cols-3 gap-3 sm:grid-cols-2 2xl:grid-cols-6'>
          {filteredArray.length > 0 && filteredArray.map((item: Aesthetic) => (
            <article key={item.id}  aria-label='card'>
              <Card {...item} />
            </article>
          ))}
        </div>
        {filteredArray.length === 0 && <p className=' mt-10 flex justify-center items-center h-full w-full dark:text-white'>No Aesthetics found with the name {searchTerm}</p>}
      </section>
    </div>
  )
}

export default Discover