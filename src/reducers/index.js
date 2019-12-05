import { combineReducers } from 'redux';

import PokeListReducer from './PokeListReducer';
import CacheIndexReducer from './CacheIndexReducer';

export default combineReducers({
    pokes: PokeListReducer,
    cacheIndex: CacheIndexReducer
});