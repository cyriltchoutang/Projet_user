const {Student} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') 
const { Op } = require("sequelize") // api fluide permettant de gerer les select, oderby, where,..
const bcrypt = require('bcrypt')
const auth = require('../auth/auth') 


module.exports = (app) => {
    app.post('/api/student',auth, (req,res) => {
        Student.create(req.body)
        .then(student =>{
            const message = `Matricule ${student.matriculeeleve} enregistré`
            res.json({message,data:student})
        })
        .catch(error => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data:error})
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data:error})
            }
            const message = `Le matricule ${req.body.matriculeeleve} n'a pas pu être enregistré`
            res.status(500).json({message, data:error})
        })

        // Student.findAll({  // retourne les pokemons et les comptent
        //     where:  { matriculeeleve:{  // name est la propriété // utilisation des opérateurs pour les critères de recherche
        //                      [Op.like]:`${matriculeeleve}` // name : critère de recherche // oper like cft SQL 
        //                    }
        //             },
        //           }) 
        //     .then(student => {
        //         if(student == ''){        
        //             const message = `Le matricule de l'eleve n'existe pas`
        //             return res.json({ message, data: student })   // On retourne notre reponse. le pokemons après then est le même qui va vers data
        //         }
        //       const message = `Le matricule de l'eleve a bien été recupéré`
        //       res.json({ message, data: student })   // On retourne notre reponse. le pokemons après then est le même qui va vers data
        //     })
        //     .catch(error => {
        //       const message = ` Le matricule de l'eleve n'a pas pu être recupéré`
        //       res.status(500).json({message, data:error})
        //     }) // pas besoin de mettre le statut succes 200 car c'est le comportenment pas defaut de express

    })
}