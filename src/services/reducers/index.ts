import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';

export const rootReducer = combineReducers({

    ingredients: ingredientsReducer,
    burger: constructorReducer

});