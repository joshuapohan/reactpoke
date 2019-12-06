import {
    FETCH_POKEMONS,
    FETCH_CACHED_POKEMONS,
    FETCH_UNCACHED_POKEMONS,
    ADD_STORAGE,
    REMOVE_STORAGE,
    FETCH_POKEMON_DETAIL
} from './types';

import {
    cItemsPerPage,
    cPokeAPIMainURL,
    cSpriteURL,
    cPokeAPIDetailURL
} from '../config';

export const fetchPokemonList = (page) => async (dispatch, getState) => {

    let cachedIndex = getState().pokeCache.cachedIndex;
    
    // Check first if page is already cached, if so then don't make another request
    if(cachedIndex.includes(page)){
        let startIndex = page; // starting index of pokemon to fetch based on page
        if( startIndex > 0 ){
            startIndex = page * cItemsPerPage;
        }
        let displayedList = getState().pokeCache.cachedList.slice(startIndex, startIndex + (cItemsPerPage - 1));
        dispatch({
            type:FETCH_CACHED_POKEMONS,
            payload: displayedList,
            curIndex: page});
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
                pokemon["isDetailCached"] = false;
            })
            dispatch({
                type: FETCH_UNCACHED_POKEMONS,
                payload: pokeList.results,
                curIndex: page
            });
        }
        catch(e){
            console.log(e);
        }    
    }
}

export const fetchPokemonDetail = (id) => async (dispatch, getState) => {
    let cachedList = getState().pokeCache.cachedList;
    let currentPokemon = null;

    try{
        for(let i = 0; i < cachedList.length; i++){
            let pokemon = cachedList[i];
            if(pokemon["id"] == id){
                currentPokemon = pokemon;
                break;
            }
        }
        if(currentPokemon != null){
            if(currentPokemon["IsDetailCached"]){
                // already cached 
            } else{
                const response = await fetch( cPokeAPIDetailURL + id.toString(10));
                let pokeDetail = await response.json();
                currentPokemon["moves"] = pokeDetail.moves;
                currentPokemon["types"] = pokeDetail.types;
                currentPokemon["IsDetailCached"] = true;
            }    
        }
        dispatch({
            type: FETCH_POKEMON_DETAIL,
            payload: currentPokemon
        });
    }
    catch(e){
        console.log(e)
    }
}