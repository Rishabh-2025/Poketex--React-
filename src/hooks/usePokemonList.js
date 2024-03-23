import { useEffect, useState } from "react"
import axios from "axios";
function usePokemonList(type) {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: '',
        type:'',
    })
    async function downloadPokemons() {


            setPokemonListState({ ...pokemonListState, isLoading: true })
            const response = await axios.get(pokemonListState.pokedexUrl);//list of 20 pokemon download
            const pokemonResults = response.data.results; // we get the arry of pokemon from result
    
            
            console.log('respone is',response.data.pokemon)
            console.log(pokemonListState);
    
            setPokemonListState((state) => ({ ...state, 
                nextUrl: response.data.next,
                prevUrl: response.data.previous }))
    

            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
            //passing that promise array to axios.all

            const pokemonData = await axios.all(pokemonResultPromise)//array of 20 pokemon detailed data

            console.log(pokemonData)

            //now iterate that data of each pokemon and extract id,name,image,types
            const pokeListResult = pokemonData.map((pokemonData) => {
                const pokemon = pokemonData.data;

                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.font_shiny,
                    types: pokemon.types
                }
            })

            console.log(pokeListResult)
            setPokemonListState((state) => ({ ...state, pokemonList: pokeListResult, isLoading: false }))
        
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl])

    return { pokemonListState, setPokemonListState }
}
export default usePokemonList;