import { combineReducers } from 'redux';

import PokeListReducer from './PokeListReducer';
import PokeDetailReducer from './PokeDetailReducer';
import CacheIndexReducer from './CacheIndexReducer';

export default combineReducers({
    pokes: PokeListReducer,
    cacheIndex: CacheIndexReducer,
    detail: PokeDetailReducer
});