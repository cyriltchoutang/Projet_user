// LISTE DES POKEMONS
const { Student } = require('../db/sequelize')  // importe dans le point de terminaison du modele pokemon
//const { Op } = require('sequelize') //Importe les opérateurs de sequelize
const { Op } = require("sequelize") // api fluide permettant de gerer les select, oderby, where,..
const auth = require('../auth/auth') // C'est pour sécuriser ce point de terminaison.

module.exports = (app) => { //exporte une fonction qui prend en parametre toute l'application express. C'est pour pouvoir definir les routes plus simplement
  app.get('/api/student', auth, (req, res) => {  // on passe un middleware en deuxième argument pour securiser nos points de terminaison

    // effectuer une recherche par le nom. ensuite on teste avec http://localhost:3000/api/pokemons?name=nomrecherché. On use query car on utilise pas un slash mais un ?name. exemple { name: 'tas' }.
      const matriculeeleve = req.query.matriculeeleve // permet d'indiquer à express que l'on souhaite extraire le paramètre name de l'url. c'est unpeu comme l'url ou on utilise plutôt param 
     
        Student.findAll({  // retourne les pokemons et les comptent
      where:  { matriculeeleve:{  // name est la propriété // utilisation des opérateurs pour les critères de recherche
                       [Op.like]:`${matriculeeleve}` // name : critère de recherche // oper like cft SQL 
                     }
              },
            }) 
      .then(student => {
          if(student == ''){        
              const message = `Le matricule de l'eleve n'existe pas`
              return res.json({ message, data: student })   // On retourne notre reponse. le pokemons après then est le même qui va vers data
          }
        const message = `Le matricule de l'eleve a bien été recupéré`
        res.json({ message, data: student })   // On retourne notre reponse. le pokemons après then est le même qui va vers data
      })
      .catch(error => {
        const message = ` Le matricule de l'eleve n'a pas pu être recupéré`
        res.status(500).json({message, data:error})
      }) // pas besoin de mettre le statut succes 200 car c'est le comportenment pas defaut de express
  })
}