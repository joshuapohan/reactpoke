import _ from 'lodash';
import {
    FETCH_POKEMONS,
    FETCH_CACHED_POKEMONS,
    FETCH_UNCACHED_POKEMONS,
    FETCH_POKEMON,
    ADD_STORAGE,
    REMOVE_STORAGE
} from '../actions/types';

let defaultState = {
    curIndex: 0,
    maxIndex: 9999,
    cachedIndex: [],
    cachedList: []
}

export default (state=defaultState, action) => {
    switch(action.type){
        case FETCH_UNCACHED_POKEMONS:
            return {...state, curIndex: action.curIndex, cachedIndex: [...state.cachedIndex, action.curIndex], cachedList:[...state.cachedList, ...action.payload]}
        case FETCH_CACHED_POKEMONS:
            return {...state, curIndex: action.curIndex}
        default:
            return state;
    }
}