import {
    FETCH_POKEMONS,
    FETCH_CACHED_POKEMONS,
    FETCH_UNCACHED_POKEMONS,
    ADD_STORAGE,
    REMOVE_STORAGE
} from './types';

import {
    cItemsPerPage,
    cPokeAPIMainURL,
    cSpriteURL
} from '../config';

export const fetchPokemonList = (page) => async (dispatch, getState) => {

    let cachedIndex = getState().cacheIndex.cachedIndex;
    
    // Check first if page is already cached, if so then don't make another request
    if(cachedIndex.includes(page)){
        let startIndex = page; // starting index of pokemon to fetch based on page
        if( startIndex > 0 ){
            startIndex = page * cItemsPerPage;
        }
        let displayedList = getState().cacheIndex.cachedList.slice(startIndex, startIndex + (cItemsPerPage - 1));
        dispatch({type:FETCH_CACHED_POKEMONS, payload: displayedList, curIndex: page});
    } else {
        try{
            let offset = page * cItemsPerPage;
            const response = await fetch( cPokeAPIMainURL + offset.toString(10));
            let pokeList = await response.json();
            pokeList.results.forEach((pokemon)=>{
                let idPattern = /api\/v2\/pokemon\/(\d+)\//g
                let match = idPattern.exec(pokemon["url"]);
                pokemon["id"] = match[1];
                pokemon["sprite"] = cSpriteURL + match[1] + ".png";
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