export type Pokemon = {

    id: string
    name: string
    height: string
    weight: string
    types: {type:{name:string}}[]
    moves:any[]
    stats:{stat:{name:string},base_stat:number}[],
    sprites:{other:{home:{front_default:string}}},
    abilities:{ability:{name:string}}[]
  
  }
  
  export type FavPokemonProp = {favorite:Pick<Pokemon,"name" | "id"> &  {sprites:string}} 

  export type FavPokemon = Pick<Pokemon, "name" | "id"> & {sprites:string}

  export type PokemonCardProp = {
    pokemon: Pokemon
  }
  
  