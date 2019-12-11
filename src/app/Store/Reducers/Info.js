
export function infoViewReducer(state= [], action){
    switch(action.type){
        case "VIEW_INFO":{
          return action.payload;
        }
      }
      return state;

}