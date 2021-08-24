const INITIAL_STATE = {
    information_specialitylesson_reduc: []
}

function information_specialitylesson_Reducer(state = INITIAL_STATE, action){

    switch(action.type){
        case "LOADINFORMATION_SPECIALITYLESSON":{
            console.log(action.payload)
            return {
                ...state,
                information_specialitylesson_reduc: action.payload
            }
        }
    }
    return state;
}
export default information_specialitylesson_Reducer;