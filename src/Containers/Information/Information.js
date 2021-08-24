import React from 'react'
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {getSpeciality} from '../../Redux/Speciality/SpecialityReducer'
import {v4 as uuidv4} from 'uuid' // Permet d'avoir des id aléatoires
import axios from "axios";
import './Information.css'
import {useHistory, useParams} from 'react-router-dom';

export default function Information(props){

    const dispatch = useDispatch()

    
    const {inscriptionreduc} = useSelector(state => ({
        ...state.inscriptionReducer
    }))

    const {information_userstudent_reduc} = useSelector(state => ({
        ...state.information_userstudent_Reducer
    }))

    const {information_specialitylesson_reduc} = useSelector(state => ({
        ...state.information_specialitylesson_Reducer
    }))


    var test1 = information_userstudent_reduc

    var test2 = information_specialitylesson_reduc
    
    //console.log(information_specialitylesson_reduc[0].designation)
     //console.log(information_userstudent_reduc[0].User[0].username)
     //console.log(information_specialitylesson_reduc[0].Lesson[0].designation)


    useEffect(() => {

    axios
    .get(`http://localhost:3000/api/userstudent?username=${inscriptionreduc.data.username}`, {
         headers: { Authorization: `Bearer ${inscriptionreduc.token}` }}
        )
        .then((res) => res.data)
        .then(data => data.data)       
        .then(data => (  // Attention c'est une parenthese après le then et non l'accolade comme d'habitude
            dispatch({ //Ce dipatch est LoadArticles (situé dans la fonction articleReducer dans articleReducer.js)
                type: 'LOADINFORMATION_USERSTUDENT',
                payload: data
            })
           // console.log(data)
        ))
        
        
        .then(data => data.payload[0].SpecialityId)      
        .then(speciality => Affichelesson(speciality))
        .catch('errorrrrrrrrrrrrrrrrrrrr')

    
    const Affichelesson = (speciality) => {

    axios
    .get(`http://localhost:3000/api/specialitylesson?SpecialityId=${speciality}`, {
         headers: { Authorization: `Bearer ${inscriptionreduc.token}` }}
        )
        .then((res) => res.data)
        .then(data => data.data)       
        .then(data => (  // Attention c'est une parenthese après le then et non l'accolade comme d'habitude
            dispatch({ //Ce dipatch est LoadArticles (situé dans la fonction articleReducer dans articleReducer.js)
                type: 'LOADINFORMATION_SPECIALITYLESSON',
                payload: data
            })
        ))
       
    }


    }, [])


    return (
        <>
        <div>
        
        {information_userstudent_reduc.map(item => {
            return  (
            <div>
                <p>Matricule: {item.matriculeeleve}</p>
                <p>Nom: {item.User[0].username}</p>   
                <p>âge: {item.User[0].age}</p>   
            </div>  
            ) 
        })}
        <h1></h1>
        </div>
        <div>

        {/* {information_specialitylesson_reduc[0].designation ?  */}
       { information_specialitylesson_reduc.map(item => {
            return  (
            <div>
                <p key={item.id}>spécialité: {item.designation}</p>
                <p>Cours:</p>
                {item.Lesson ?
                item.Lesson.map(item1 => {
                   return  <p key={item1.id}>{item1.designation}</p>
                }) 
                : <h3>Cette spécialité ne possède pas de cours</h3>
                }
            </div>  
            ) 
        })
        // : <h1>La filière {information_specialitylesson_reduc.designation} ne possède pas encore de lessons</h1>
         }
        
        <h1></h1>
        </div>
        </>
    )
}