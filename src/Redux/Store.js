
import {createStore, applyMiddleware, combineReducers} from 'redux'
import specialityReducer from './Speciality/SpecialityReducer' // Import du reducer pour avoir toutes les spécialités
import inscriptionReducer from './Inscription/InsctriptionReducer' // Import du reducer pour pouvoir s'inscrire
import information_userstudent_Reducer from './Information/information_userstudent_Reducer' // Import du reducer pour pouvoir afficher les informations de profil
import information_specialitylesson_Reducer from './Information/information_specialitylesson_Reducer' // Import du reducer pour pouvoir afficher les informations de profil
import thunk from 'redux-thunk'

const rootReducer = combineReducers({  // On utilisera un seul reducer. Cependant on a mis plusieurs si jamais on veut en rajouter
    specialityReducer,
    inscriptionReducer,
    information_userstudent_Reducer,
    information_specialitylesson_Reducer
})

//thunk permettra de faire des appels asynchrones, donc exécuter la fonction getArticles(dans articleReducer.js) et ensuite envoyer un dispatch. 
const store = createStore(rootReducer, applyMiddleware(thunk)) // applymiddleware(thunk) qu'on va exécuter lorsqu'on voudra passer une fonction à un dispacth pour pouvoir faire un appel asynchrone

export default store; // Pourqu'il soit appelé ailleur