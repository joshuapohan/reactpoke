import _ from 'lodash';
import {
    CATCH_POKEMON,
    RELEASE_POKEMON
} from './../actions/types';

export default (state=[], action) => {
    switch(action.type){
        case CATCH_POKEMON:
            return [...state, {id: action.id, nickname: action.nickname, detail: action.detail}];
        case RELEASE_POKEMON:
            return  state.splice(action.index, 1);
        default:
            return state;
    }
};