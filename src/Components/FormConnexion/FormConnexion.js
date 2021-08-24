import React from 'react'
import './FormConnexion.css'
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import axios from "axios";
import {useHistory, useParams} from 'react-router-dom'; 
<meta name="viewport" content="width=device-width, initial-scale=1"></meta>

export default function FormConnexion(){

  const dispatch = useDispatch()

  const history = useHistory(); // Pour avoir accès à notre historique

  const [inscription, setInscription] = useState({
    nom:"",
    password:"",

})

const addNewnom = e => {
    const newObjState = {...inscription, nom: e.target.value}
    setInscription(newObjState)
}

const addPassword = e => {
    const newObjState = {...inscription, password: e.target.value}
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
            .then((data) => (
              dispatch({ //Ce dipatch est LoadArticles (situé dans la fonction articleReducer dans articleReducer.js)
                  type: 'LOADINSCRIPTION',
                  payload: data
              }),
              console.log(data)
          ))
            .then(data => console.log(data))
            .catch(error => console.log(error))

                  
            history.push('/')  // redirection vers l'accueil

            
  }


//   return <Link to={{
//     pathname:"/"
// }}> 
// </Link>


    var modal = document.getElementById('id01');

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const valeur = () => {
      document.getElementById('id01').style.display='block'
    }
    const valeur1 = () => {
      document.getElementById('id01').style.display='none'
    }

    const valeur2 = () => {
      document.getElementById('id01').style.display='none'
    }
    return (
<>

<h2>Modal Login Form</h2>

<button style= {{width:'auto'}} onClick={valeur} >Login</button>
<Link to={{
            pathname:"/"
        }}><br></br>Menu accueil 
</Link>

<div id="id01" className ="modal" style={{display:'block'}}>
  
  <form onSubmit={handleForm} className ="modal-content animate">
    
    <div className="imgcontainer">
      <span onClick={valeur1} className="close" title="Close Modal">&times;</span>
      <img src="img_avatar2.png" alt="Avatar" className="avatar"></img>
    </div>

    <div className="container">
      <label htmlFor="uname" ><b>Username</b></label>
      <input type="text" onInput={addNewnom} placeholder="Enter Username" name="uname" ></input>

      <label htmlFor="psw"><b>Password</b></label>
      <input type="password" onInput={addPassword} placeholder="Enter Password" name="psw" ></input>
        
      <button type="submit">Login</button>
      <label> Remember me </label>
      <input type="checkbox" defaultChecked="checked" name="remember"></input> 
    </div>

    <button type="button" style={{background:'red'}}>
    <Link 
            to={{
                pathname: "/inscription"
            }}><li>Allez s'inscrire</li>
    </Link>
    </button>

    <div className="container" style= {{background:'#f1f1f1'}}>
      <button type="button" onClick={valeur2} className="cancelbtn">Cancel</button>
      <span className="psw">Forgot <a href="#">password?</a></span>
    </div>
  </form>

</div>

 {/* required pour rendre obligatoire // htmlfor envoie des infos à travers l'url */}

{/* <h1>BONJOUR CHEF CONNECTE TOI</h1>

            <Link 
            to={{
                pathname: "/inscription"
            }}>Allez s'inscrire
            </Link> */}

</>


            
       
    )
}