import { combineReducers } from 'redux';
// import { cartReducer } from './cart';
// import { deliveryReducer } from './delivery';
// import { checkoutReducer } from './checkout';
// import { NEXT_STEP, PREVIOUS_STEP } from '../actions';

import { ingredientsReducer } from './burger-ingredients';
import { constructorReducer } from './burger-constructor';

// const stepReducer = (state = 'cart', action) => {
//   switch (action.type) {
//     case 'next': {
//       return state === 'cart'
//         ? 'delivery'
//         : state === 'delivery'
//         ? 'checkout'
//         : state === 'checkout'
//         ? 'checkout'
//         : 'checkout';
//     }
//     case 'prev': {
//       return state === 'cart'
//         ? 'cart'
//         : state === 'delivery'
//         ? 'cart'
//         : state === 'checkout'
//         ? 'delivery'
//         : 'cart';
//     }
//     default: {
//       return state;
//     }
//   }
// };



export const rootReducer = combineReducers({

    ingredients: ingredientsReducer,
    constructor: constructorReducer

});