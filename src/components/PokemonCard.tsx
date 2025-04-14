import { useNavigate } from "react-router-dom"
import { PokemonCardProp } from "../types/PokemonTypes"



const PokemonCard = ({pokemon}:PokemonCardProp) => {

  const route = useNavigate()

  return (
    <>
    <button onClick={()=>{
      route(`/details/${pokemon.id}`)
    }}>

    <div className='w-[240px]  overflow-hidden cursor-pointer'>
    <main className='bg-white h-80 rounded-lg flex justify-center items-center overflow-hidden object-contain'>
      <img src={pokemon.sprites.other.home.front_default} alt="" />
    </main>

    <div className=" font-medium">
      {pokemon.name.length > 33 ? pokemon.name.slice(0,34)+'...' : pokemon.name}
    </div>

    </div>
    </button>
    </>
  )
}

export default PokemonCard
