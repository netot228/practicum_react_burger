import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order-details';
import { selectedIngredientReducer } from './ingredient-details'
import { authReducer } from './auth';

export const rootReducer = combineReducers({

    ingredients: ingredientsReducer,
    burger: constructorReducer,
    order: orderReducer,
    detail: selectedIngredientReducer,
    auth: authReducer

});