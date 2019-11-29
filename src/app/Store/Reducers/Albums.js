

export function albumsReducer(state={}, action){

    switch(action.type){
        case "GET_ALBUMS":{
            return action.payload
        }
    }
    return state;
}