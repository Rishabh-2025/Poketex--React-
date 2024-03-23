import axios from "axios";
import { useEffect, useState } from "react";


function usePokemonDetails(id, pokemonName){
  

    const [pokemon, setPokemon] = useState({});
    


    async function downloadPokemon() {

        let response;
        if(pokemonName){
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        }else{
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        }

        
        const pokemonOfSampeType = axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ?response.data.types[0].type.name: ''}`)
    

        setPokemon(state =>({
            ...state,
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            
        }));

        pokemonOfSampeType.then((response)=>{
            setPokemon(state =>({
                ...state,
                similarPokemons:response.data.pokemon.slice(0,5)
            }));
        })

       setPokemonListState({...pokemonListState,type:response.data.types ?response.data.types[0].type.name: ''})
  
    }

   const {pokemonListState,setPokemonListState} = useState({})

    useEffect(() => {
        try {
            downloadPokemon();
            
        } catch (error) {
            console.log("SomeThing went wrong ");
        }
        
    }, [])

    return {pokemon,}

}

export default usePokemonDetails;