import {
    FETCH_CACHED_POKEMONS,
    FETCH_UNCACHED_POKEMONS,
    FETCH_POKEMON_DETAIL,
    CATCH_POKEMON,
    RELEASE_POKEMON
} from './types';

import {
    cItemsPerPage,
    cMaxPage,
    cPokeAPIMainURL,
    cSpriteURL,
    cPokeAPIDetailURL
} from '../config';

export const fetchPokemonList = (page) => async (dispatch, getState) => {

    let cachedIndex = getState().pokeCache.cachedIndex;
    let normalizedPage = page % (cMaxPage + 1);

    // Check first if page is already cached, if so then don't make another request
    if(cachedIndex.includes(page)){
        let startIndex = normalizedPage; // starting index of pokemon to fetch based on page
        if( startIndex > 0 ){
            startIndex = normalizedPage * cItemsPerPage;
        }
        let displayedList = getState().pokeCache.cachedList.slice(startIndex, startIndex + cItemsPerPage);
        dispatch({
            type:FETCH_CACHED_POKEMONS,
            payload: displayedList,
            curIndex: normalizedPage});
    } else {
        try{
            let offset = normalizedPage * cItemsPerPage;
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
                curIndex: normalizedPage
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
            if(pokemon["id"] === id){
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

export const capturePokemon = (id, nickname, detail) => {
    return {
        type: CATCH_POKEMON,
        id,
        nickname,
        detail    
    };
}

export const releasePokemon = index => {
    return {
        type: RELEASE_POKEMON,
        index
    };
}
