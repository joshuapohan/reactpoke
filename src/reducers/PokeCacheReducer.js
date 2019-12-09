import {
    FETCH_CACHED_POKEMONS,
    FETCH_UNCACHED_POKEMONS,
} from '../actions/types';

let defaultState = {
    curIndex: 0,
    maxIndex: 9999,
    cachedIndex: [],
    cachedList: {}
}

export default (state=defaultState, action) => {
    switch(action.type){
        case FETCH_UNCACHED_POKEMONS:
            let index = action.curIndex;
            let curPageList = action.payload;
            let newCachedList = {...state.cachedList};
            newCachedList[index] = curPageList;
            return {...state, curIndex: action.curIndex, cachedIndex: [...state.cachedIndex, action.curIndex], cachedList:newCachedList}
        case FETCH_CACHED_POKEMONS:
            return {...state, curIndex: action.curIndex}
        default:
            return state;
    }
}