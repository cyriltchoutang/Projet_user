const INITIAL_STATE = {
    information_userstudent_reduc: []
}

function information_userstudent_Reducer(state = INITIAL_STATE, action){

    switch(action.type){
        case "LOADINFORMATION_USERSTUDENT":{
            return {
                ...state,
                information_userstudent_reduc: action.payload
            }
        }
    }
    return state;
}
export default information_userstudent_Reducer;