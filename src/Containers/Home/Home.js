import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getInscription} from '../../Redux/Inscription/InsctriptionReducer'
import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import Information from '../Information/Information';
import {useHistory, useParams} from 'react-router-dom';


export default function Home() {
  


    const dispatch = useDispatch()

    const history = useHistory(); // Pour avoir accès à notre historique

    var {inscriptionreduc} = useSelector(state => ({
        ...state.inscriptionReducer
    }))
    console.log('voici les infos')
    console.log(inscriptionreduc)

    const test = (inscriptionreduc) => {
        inscriptionreduc = ''
        dispatch({
            type: "LOADINSCRIPTION",
            payload: inscriptionreduc
        })
    }

    // localStorage.setItem("jetest", JSON.stringify(inscriptionreduc));

    // var inscriptionreduc = localStorage.getItem("jetest");

    // var inscriptionreduc = JSON.parse(inscriptionreduc)
    // //console.log(inscriptionreduc.data.username)
    return (
        <>
                <h1>RESULTAT</h1>
                {inscriptionreduc.length !== 0 ? 
                <div>
                    <h1>Bienvenue {inscriptionreduc.data.username} </h1>
                    <Link 
                    to={{
                        pathname: "/information",
                        // On peut aussi passer les valeurs par ici, mais je prefere utiliser le useselector dans information.js
                        // username: inscriptionreduc.data.username,
                        // age: inscriptionreduc.data.age,
                        // token: inscriptionreduc.token

                    }}><br></br>Informations du profil de {inscriptionreduc.data.username}
                    </Link>
                 <button type="button" onClick={() => test(inscriptionreduc)} style = {{all: 'none'}}>Déconnectez-vous</button>
                 </div>
                :
                <div>
                <h1><br></br>L'utilisateur n'est pas connecté, veuillez vous connecter</h1>
                
            
                <Link 
                to={{
                    pathname: "/connexion"
                }}>Allez se connecter
                </Link>
                
                </div>
                }
        </>
    )
}

// {inscriptionreduc.length !== 0 ? inscriptionreduc.map(item => {
//     return <h1>Bienvenue {item.username}</h1>
// })