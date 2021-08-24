
import React from 'react'
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {getSpeciality} from '../../Redux/Speciality/SpecialityReducer'
import {v4 as uuidv4} from 'uuid' // Permet d'avoir des id aléatoires
import axios from "axios";
import './Form.css'

export default function Form(){


    const dispatch = useDispatch()

    const {specialityreduc} = useSelector(state => ({
        ...state.specialityReducer
    }))

    useEffect(() => {
        if(specialityreduc.length === 0){
            dispatch(getSpeciality())
        }
    },[])

///////////////////////////////////////////////////////////

    const [inscription, setInscription] = useState({
        nom:"",
        password:"",
        age: "",
        matricule:"",
        speciality:""
    })

    const addNewnom = e => {
        const newObjState = {...inscription, nom: e.target.value}
        setInscription(newObjState)
    }

    const addPassword = e => {
        const newObjState = {...inscription, password: e.target.value}
        setInscription(newObjState)
    }

    const addAge = e => {
        const newObjState = {...inscription, age: e.target.value}
        setInscription(newObjState)
    }

    const addMatricule = e => {
        const newObjState = {...inscription, matricule: e.target.value}
        setInscription(newObjState)
    }

    const addSpeciality = e => {
        const newObjState = {...inscription, speciality: e.target.value}
        console.log(newObjState)
        console.log(inscription)
        setInscription(newObjState)
    }


const handleForm = e => { 
    e.preventDefault(); 
            axios
            .post(
                    "http://localhost:3000/api/login",
                    { username: inscription.nom, password: inscription.password },
                    { headers: { "Content-Type": "application/json" } }
                )
                 // .then(token => console.log(token))
        
                  
                //   .then(data => {
                //     dispatch({ 
                //        // Ce dipatch est LoadArticles (situé dans la fonction articleReducer dans articleReducer.js)
                //                 type: 'LOADARTICLES',
                //                 payload: data
                //             }),
                //     tet()
                //     })
                    .then((res) => res.data)
                    .then((data) => data.token)
                    //.then(token => ( 
                    //    creerPokemon(token),affichePokemon(token)))
                    .then(token => createStudentTeacher(token))
                    .then(token => console.log(token))

            const createStudentTeacher = token => {
                if(document.getElementById('framework').value == 'eleve'){
                    //console.log(inscription.speciality)
                    axios
                    .post(
                        "http://localhost:3000/api/student/",
                        {
                            matriculeeleve: inscription.matricule,
                            SpecialityId: inscription.speciality,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => res.data)
                    .then((data) => data.data)
                    .then((data) => (data.id))
                    .then(id => createUser(id))

                    const createUser = id => {
                        axios
                        .post(
                            "http://localhost:3000/api/user/",
                            {
                                username:inscription.nom,
                                password:inscription.password,
                                age: inscription.age,
                                StudentId: id,
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        )
                        .then((res) => res.data)
                        .then((data) => console.log(data))
                        .catch(error => console.log(error))
                        
                    }
                }else if(document.getElementById('framework').value == 'enseignant'){
                    axios
                    .post(
                        "http://localhost:3000/api/teacher/",
                        {
                            matriculeprof: inscription.matricule,
                            //SpecialityId: inscription.speciality,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((res) => res.data)
                    .then((data) => data.data)
                    .then((data) => (data.id))
                    .then(id => createUser(id))

                    const createUser = id => {
                        axios
                        .post(
                            "http://localhost:3000/api/user/",
                            {
                                username:inscription.nom,
                                password:inscription.password,
                                age: inscription.age,
                                TeacherId: id,
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        )
                        .then((res) => res.data)
                        .then((data) => console.log(data))
                        .catch(error => console.log(error))
                        
                    }


                }


            }


    setInscription({ // pour remettre le champs vide juste après
        nom:"",
        password:"",
        age:"",
        matricule:"",
        speciality:""
    })


}

function matricule() {
    //const sb = document.querySelectorAll('#framework')
    const sb1 = document.getElementById('framework')
    //const sb2= document.getElementsByClassName('matriculeeleve')
    //console.log(sb2.value);
    console.log(sb1.value);
    if(sb1.value === 'eleve'){document.getElementById('matriculeeleve').style.display=''}else{document.getElementById('matriculeeleve').style.display='none'}
    if(sb1.value === 'enseignant'){document.getElementById('matriculeenseignant').style.display=''}else{document.getElementById('matriculeenseignant').style.display='none'}
}

    return (
        <>
        <h1>INSCRIVEZ VOUS</h1>
        {console.log('rrrrrrrrrr')}
          <form onSubmit={handleForm} className="formulaire">
            <label>Nom:</label>
            <input value= {inscription.nom} onInput={addNewnom} type="text"/><br></br>
            <label>Password:</label>
            <input value= {inscription.password} onInput={addPassword} type="password"/><br></br>
            <label>âge:</label>
            <input value= {inscription.age} onInput={addAge} type="text"/><br></br>
            <label>Sélectionner votre categorie:</label>
            <select id = "framework" onChange={matricule}>
                <option>select</option> 
                <option value="eleve">Matricule Eleve</option> 
                <option value="enseignant">Matricule Enseignant</option>
            </select><br></br>
            <div id="matriculeeleve" style={{ display: 'none'}}>
                <label value="matriculeeleve">Matricule Eleve</label>
                <input value= {inscription.matricule} onInput={addMatricule} type="text"></input><br></br>
            </div>
            <div id="matriculeenseignant" style={{ display: 'none'}}>
                <label value="matriculeenseignant">Matricule Enseignant</label>
                <input value= {inscription.matricule} onInput={addMatricule} type="text"></input><br></br>
            </div>
            <div>
            <label>Spécialité</label>     
            <select onChange={addSpeciality}>
                <option>select</option>
                {specialityreduc.map(item => {
                return   <option key={item.id} value = {item.id }>{item.designation}</option>
                })}
            </select><br></br>
            </div>
               
            <button>Envoyer les informations</button>
        </form>
        <Link to={{
            pathname:"/"
        }}>Menu accueil 
        </Link>
        
        </>
        
    )
    

    
}