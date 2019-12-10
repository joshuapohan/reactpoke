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

    let cachedPages = getState().pokeCache.cachedPages;
    let normalizedPage = page % (cMaxPage + 1);

    // Check first if page is already cached, if so then don't make another request
    if(cachedPages[normalizedPage]){
        let displayedList = cachedPages[parseInt(normalizedPage)];
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
    let cachedPages = getState().pokeCache.cachedPages;
    let currentPokemon = null;
    let page = Math.floor(id / (cItemsPerPage));

    // Check first if pokemon page already fetched
    if(!cachedPages[page]){
        try{
            let offset = page === 0 ? 0 :(page * cItemsPerPage) - 1;
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
    cachedPages = getState().pokeCache.cachedPages;
    try{
        for(let i = 0; i < cachedPages[page].length; i++){
            let pokemon = cachedPages[page][i];
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
