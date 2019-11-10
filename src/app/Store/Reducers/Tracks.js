
export function tracksReducer(state = [], action ){
    console.log(action);
    switch(action.type){
        case "GET_TRACKS":{
            return action.payload
        }
    }

    return state;
}