import {useNavigate} from 'react-router-dom'
import { FavPokemonProp } from "../types/PokemonTypes"




const FavPokemonCard = (
    {favorite}:FavPokemonProp
    ) => {

      const route = useNavigate()

  return (
    <>
    <button className=' cursor-pointer' onClick={()=>{
      route(`details/${favorite.id}`)
    }}>

    <div className='flex flex-col flex-shrink-0 flex-wrap w-[220px] h-[380px]'>
      <img src={
        favorite.sprites as unknown as string
      } 
      alt="" className=' object-contain w-[220px] rounded-xl bg-white h-80'   />

    <div>
      {favorite.name.length > 33 ? favorite.name.slice(0,34)+'...' : favorite.name}
    </div>

    </div>
      </button>
    </>
  )
}

export default FavPokemonCard
