import _ from 'lodash';
import {
    FETCH_POKEMONS,
    FETCH_CACHED_POKEMONS,
    FETCH_UNCACHED_POKEMONS,
    FETCH_POKEMON,
    ADD_STORAGE,
    REMOVE_STORAGE
} from './../actions/types';

export default (state={}, action) => {
    switch(action.type){
        case FETCH_UNCACHED_POKEMONS:
        case FETCH_CACHED_POKEMONS:
            return {..._.mapKeys(action.payload, "id")};
        default:
            return state;
    }
}