import { combineReducers } from 'redux';

import PokeListReducer from './PokeListReducer';
import PokeDetailReducer from './PokeDetailReducer';
import PokeCacheReducer from './PokeCacheReducer';
import PokeStorageReducer from './PokeStorageReducer';

export default combineReducers({
    pokes: PokeListReducer,
    pokeCache: PokeCacheReducer,
    detail: PokeDetailReducer,
    storage: PokeStorageReducer
});