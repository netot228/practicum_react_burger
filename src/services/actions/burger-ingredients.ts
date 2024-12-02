import { AppDispatch } from '../../utils/store';

export const GET_INGREDIENTS_REQUEST   = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS   = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED    = 'GET_INGREDIENTS_FAILED';

export const DATA_END_POINT_URL = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngredients() {
    return function(dispatch:any) {
      dispatch({
        type: GET_INGREDIENTS_REQUEST
      });

      fetch(DATA_END_POINT_URL)
        .then(response=>{
            if(response.ok){
                return response.json();
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        })
        .then(json=>{

            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                items: json.data
            });

            // setState({data: json.data, dataLoaded: true});
        })
        .catch(error=>{
            console.log('Что-то пошло не так')
            console.error(error);
            dispatch({
                type: GET_INGREDIENTS_FAILED
            });
        })
    };
  }