import axios from "axios";

const INITIAL_STATE = {
    inscriptionreduc: []
}

function inscriptionReducer(state = INITIAL_STATE, action){

    switch(action.type){
        case "LOADINSCRIPTION":{
            return {
                ...state,
                inscriptionreduc: action.payload
            }
        }
    }
    return state;
}
export default inscriptionReducer;