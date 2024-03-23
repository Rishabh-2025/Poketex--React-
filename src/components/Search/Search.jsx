
import useDebounce from '../../hooks/useDebounce';
import './Search.css';

function Search({updateSearchTerm}){
    const debounce = useDebounce((e)=>updateSearchTerm(e.target.value))
return (
    <div className="search-wrapper">

        <input type="text" placeholder="Pokedex" id="pokemon-name-search" 
        onChange={debounce}
        />
    
    </div>

)
};

export default Search;