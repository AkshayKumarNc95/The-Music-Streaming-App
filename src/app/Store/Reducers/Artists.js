

export function artistsReducer(state={}, action){

    switch(action.type){
        case "GET_ARTISTS":{
            return action.payload
        }
    }
    return state;
}