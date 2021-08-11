


export function Register(state = {}, action){

    switch(action.type){
        case "REGISTER_PENDING":{
            return action.payload; 
        }
        case "REGISTER_FAILED":{
            return action.payload;
        }
        case "REGISTER_SUCCESS":{
            return action.payload;
        }
    }
    return state; 
}


export function Login(state = {}, action){

    switch(action.type){
        case "LOGIN_PENDING":{
            return action.payload; 
        }
        case "LOGIN_FAILED":{
            return action.payload;
        }
        case "LOGIN_SUCCESS":{
            return action.payload;
        }
    }
    return state; 
}