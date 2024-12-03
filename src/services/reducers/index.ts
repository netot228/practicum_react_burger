import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order-details';

export const rootReducer = combineReducers({

    ingredients: ingredientsReducer,
    burger: constructorReducer,
    order: orderReducer

});