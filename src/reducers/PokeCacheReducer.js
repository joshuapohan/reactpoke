import {
    FETCH_CACHED_POKEMONS,
    FETCH_UNCACHED_POKEMONS,
} from '../actions/types';

let defaultState = {
    curIndex: 0,
    maxIndex: 9999,
    cachedPages: {}
}

export default (state=defaultState, action) => {
    switch(action.type){
        case FETCH_UNCACHED_POKEMONS:
            let index = action.curIndex;
            let curPageList = action.payload;
            let newCachedPages = {...state.cachedPages};
            newCachedPages[index] = curPageList;
            return {...state, curIndex: action.curIndex, cachedPages:newCachedPages}
        case FETCH_CACHED_POKEMONS:
            return {...state, curIndex: action.curIndex}
        default:
            return state;
    }
}