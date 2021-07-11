import * as actionTypes from './actions';

let initialState = {
    ingredients : {
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    },
    totalPrice:0,
}

const INGREDIENTS_PRICE={
    salad:30,
    bacon:50,
    cheese:100,
    meat:200
};

const reducer=(state=initialState, action)=>{
   switch (action.type) {
       case actionTypes.ADD_INGREDIENTS:
           return {
               ...state,
               ingredients:{
                   ...state.ingredients,
                   [action.ingredientName]: state.ingredients[action.ingredientName] + 1    // we directly cannot use action.ingredientName here to get the property name that is passed to this function, we have to use [].
               },
               totalPrice : state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
           }

        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1  
                },
                totalPrice : state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
       default:
           return state;

   }
}

export default reducer;