import axios from "axios";

const INITIAL_STATE = {
    specialityreduc: []
}

function specialityReducer(state = INITIAL_STATE, action){

    switch(action.type){
        case "GETSPECIALITY":{
            return {
                ...state,
                specialityreduc: action.payload
            }
        }
    }
    return state;
}
export default specialityReducer;

export const getSpeciality = () => dispatch => {

        axios
        .post("http://localhost:3000/api/login",
        {username: "maximep", password:"pikachu"},
        {headers: {"content-Type":"application/json"}}
        )
        .then(res => res.data)
        .then(data => data.token)
        .then(token => getSpeciality(token))

    const getSpeciality = token => {
        axios
        .get("http://localhost:3000/api/speciality", 
        { headers:{Authorization: `Bearer ${token}`}}
        )
        .then(res => res.data)
        .then(data => data.data)
        .then(data => (
            dispatch({
                type: 'GETSPECIALITY',
                payload: data
            })
        ))
    }
}
