import { useEffect, useState } from 'react'
import { getFavPokemon, updatesearchcount } from '../appwrite'
import { useDebounce } from 'react-use'
import { FavPokemon, Pokemon } from '../types/PokemonTypes'
import { ApiResponse } from '../types/ApiResponse'
import PokemonCard from '../components/PokemonCard'
import FavPokemonCard from '../components/FavPokemon'

const Home = () => {


    const [pokemondata, setpokemondata] = useState<Pokemon[]>([])
    const [pokeurl, setpokeurl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20')
    const [previousurl, setpreviousurl] = useState<string | null>(null)
    const [nexturl, setnexturl] = useState<string | null>(null)
    const [FavPokemon, setFavPokemon] = useState<FavPokemon[]>([])
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false)
    const [text, settext] = useState('')
    const [debouncedtext, setdebouncedtext] = useState('')

    useDebounce(() => setdebouncedtext(text), 5000, [text])


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };


    const fetchdata = async () => {

        setloading(true)
        try {

            const response = await fetch(pokeurl, options)
            const urldata: ApiResponse = await response.json()

            let pokearr: Pokemon[] | undefined = []

            const promise = urldata.results.map(async (e) => {
                const pokeresponse = await fetch(e.url)
                const data = await pokeresponse.json()


                return { ...data, prev: urldata.previous, next: urldata.next }

            })

            pokearr = await Promise.all(promise)
            setpokemondata(pokearr)
            setnexturl(urldata.next)
            setpreviousurl(urldata.previous)
            setloading(false)


        } catch (error) {

            seterror(`${error}`)

        }
        finally {
            setloading(false)
        }

    }

    const searchdata = async () => {

        setloading(true)
        const url = `https://pokeapi.co/api/v2/pokemon/${encodeURI(debouncedtext.toLowerCase())}`;

        try {

            let arr:Pokemon[] = []

            const response = await fetch(url, options)
            const data : Pokemon = await response.json()

            arr.push(data)

            if (response.ok && text !== '') {

                setpokemondata(arr)

            }
            if (text === "") {
                fetchdata()
            }


            if (debouncedtext && data) {
                //data.results.length > 0   Means there is a match for the searched movies
                await updatesearchcount(debouncedtext, data as Pokemon)
            }

            setloading(false)

        } catch (error) {

            seterror(`${error}`)
            setpokemondata([])
            setloading(false)

        }

    }

    useEffect(() => {
        fetchdata()
    }, [pokeurl])

    useEffect(() => {
        searchdata()
    }, [debouncedtext])

    const loadTrendingdata = async () => {

        setloading(true)
        try {

            const pokemon = await getFavPokemon() as unknown as FavPokemon[]
            setFavPokemon(pokemon)

        } catch (error) {
            seterror(`${error}`)
            setFavPokemon([])
        }
        finally {
            setloading(false)
        }
    }


    useEffect(() => {
        loadTrendingdata()
    }, [])

    return (
        <>
            <div className='bg-neutral-200 flex items-center flex-col overflow-hidden  space-y-10 min-h-[100vh] box-border p-12'>

                <main className='flex items-center gap-3'>
                    <img src="https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png" alt="" width={60} className=' rounded-[20px] ' />
                    <h1 className=' font-bold text-xl'>Pokedex</h1>
                </main>
                <div className='text-[25px] text-center font-md'>Find your favorite pokemon <div className='text-center'>without any hassle</div></div>
                <form className='flex justify-center p-2 items-center bg-neutral-300  outline-none border-none rounded-lg max-[572px]:w-[400px] max-[410px]:w-[300px]'>
                    <svg fill='black' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                    </svg>
                    <input type="text" name="" id="" className='focus:outline-none focus:border-none h-12 rounded-lg p-3 w-[520px]' placeholder='Search for pokemon' value={text} onChange={(e) => {
                        settext(e.target.value)
                    }} />
                </form>

                <div>You typed : {text}</div>
                <h1 className='font-bold text-2xl'>Top searched pokemon</h1>

                {loading ? <div role="status" className='flex justify-center items-center py-9'>
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>

                    :

                    <section className=' overflow-hidden w-[90%] max-[325px]:w-[300px]'>

                        <div className='flex overflow-x-auto scroll-smooth no-scrollbar gap-10 items-start'>
                            {
                                FavPokemon?.map((pokemon, i) => (
                                    <FavPokemonCard key={i} favorite={pokemon} />
                                    
                                ))
                            }
                        </div>
                    </section>
                }

                <h1 className='font-bold text-2xl'>All Pokemon</h1>

                {loading ?
                    <div role="status" className='flex justify-center items-center py-9'>
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>

                    </div> :

                    <section className='flex justify-center items-center flex-wrap gap-10'>
                        {
                            pokemondata?.map((pokemon, i) => (
                                <PokemonCard key={i} pokemon={pokemon} />
                            ))
                        }
                    </section>
                }
                <div>{error && 'Pokemon not found'}</div>
                <div className='flex justify-center gap-10 flex-wrap items-center'>
                    {previousurl && <button onClick={()=>{setpokeurl(previousurl)}} className='bg-green-600 w-[200px] flex items-center justify-center p-2 rounded-md text-white cursor-pointer'>Previous</button>}
                    {nexturl && <button onClick={()=>{setpokeurl(nexturl)}} className=' bg-green-600 w-[200px] flex items-center justify-center p-2 rounded-md text-white cursor-pointer'>Next</button>}
                </div>
            </div>

        </>
    ) 
}

export default Home