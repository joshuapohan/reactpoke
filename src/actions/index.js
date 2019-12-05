import {
    FETCH_POKEMONS,
    FETCH_CACHED_POKEMONS,
    FETCH_UNCACHED_POKEMONS,
    ADD_STORAGE,
    REMOVE_STORAGE
} from './types';

export const fetchPokemonList = (page) => async (dispatch, getState) => {
    let cachedIndex = getState().cacheIndex.cachedIndex;
    if(cachedIndex.includes(page)){
        let startIndex = page;
        if( startIndex > 0 ){
            startIndex = page * 20;
        }
        let displayedList = getState().cacheIndex.cachedList.slice(startIndex, startIndex+19);
        dispatch({type:FETCH_CACHED_POKEMONS, payload: displayedList, curIndex: page});
    } else {
        try{
            let offset = page * 20;
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=" + offset.toString(10));
            let pokeList = await response.json();
            pokeList.results.forEach((pokemon)=>{
                let idPattern = /api\/v2\/pokemon\/(\d+)\//g
                let match = idPattern.exec(pokemon["url"]);
                pokemon["id"] = match[1];
                pokemon["sprite"] = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + match[1] + ".png";
            })
            dispatch({
                type:FETCH_UNCACHED_POKEMONS,
                payload: pokeList.results,
                curIndex: page
            });
        }
        catch(e){
            console.log(e);
        }    
    }
}