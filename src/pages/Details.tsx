import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Pokemon } from '../types/PokemonTypes'
import Detailscard from '../components/Detailscard'


const Details = () => {

  const [pokemondetails, setpokemondetails] = useState<Pokemon>()
  const [loading, setloading] = useState(false)

  let m_id = useParams()
  let id = Number(m_id.id)

  const getpokemondetails = async () => {

    setloading(true)
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const data: Pokemon = await response.json()
      console.log(data)
      setpokemondetails(data)
      setloading(false)
    } catch (error) {
      console.log(error)
      setloading(false)
    }

  }

  useEffect(() => {

    window.scroll({top:0})

    getpokemondetails()

  }, [])


  return (
    <div className='bg-neutral-200 min-h-[100vh] pb-4 px-1'>

      <div className=' h-[350px] overflow-hidden p-image max-[331px]:h-[200px]'>
        <img src={'https://wallpapers.com/images/high/all-pokemon-pictures-03imn29v8gsd3lup.webp'} className='w-full  object-cover ' alt="" />
      </div>

      <div className='flex justify-center relative z-40'>
        <img src={pokemondetails?.sprites.other.home.front_default} className=' w-[300px] max-[331px]:w-[200px] object-contain rounded-lg absolute -top-[180px] max-[331px]:-top-[190px] bg-white h-[20rem] max-[466px]:-top-[280px]' alt="" />
        <h3 className='text-wrap text-center font-bold text-2xl absolute max-[329px]:-bottom-50 -bottom-50 max-[466px]:-bottom-30'>{pokemondetails?.name}</h3>
      </div>

      <div className='mt-70 max-[329px]:mt-55'></div>
      {
        loading === false && pokemondetails ?


          <div className=' px-2 flex flex-col gap-2'>
            <h1 className='font-semibold text-lg'>Weight : {pokemondetails.weight} g</h1>
            <h1 className='font-semibold text-lg'>Height : {pokemondetails.height} m</h1>
            <div className='h-2'></div>

            <Detailscard title="Types" value={pokemondetails.types.map((e)=>e.type.name).join(" , ")} />

            <Detailscard title="Abilities" value={pokemondetails?.abilities.map((e) => e.ability.name).join(' , ')} />

            <Detailscard title="Number of moves" value={pokemondetails.moves.length} />

<div className='h-4'></div>
            <div className=''>
              <div className=' font-bold text-2xl text-gray-600'>Stats</div>

              {
                pokemondetails.stats.map((info)=>(
                  <div className='flex flex-wrap my-2 items-center'>
                    <h1 className='w-[140px] text-start'>{info.stat.name}</h1>
                    <div className={`w-[1300px] overflow-hidden`}>
                    <div style={{width:`${info.base_stat/2}%`}} className=' bg-green-500 p-2 rounded-md'>{info.base_stat}</div>
                    </div>
                  </div>
                ))
              }

            </div>



          </div> :

          <div role="status" className='flex justify-center items-center py-9'>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>

      }

    </div>
  )
}

export default Details