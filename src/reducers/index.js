import { combineReducers } from 'redux';

import PokeListReducer from './PokeListReducer';
import PokeDetailReducer from './PokeDetailReducer';
import PokeCacheReducer from './PokeCacheReducer';

export default combineReducers({
    pokes: PokeListReducer,
    pokeCache: PokeCacheReducer,
    detail: PokeDetailReducer
});