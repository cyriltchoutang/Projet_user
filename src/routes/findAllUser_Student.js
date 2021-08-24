const {User} = require('../db/sequelize')
const {Student} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') 
const { Op } = require("sequelize")
const bcrypt = require('bcrypt')
const auth = require('../auth/auth')
const user = require('../models/user')

module.exports = app => {
    app.get('/api/userstudent', auth, (req,res) => {
    if(req.query.username){  
            const username = req.query.username
        Student.findAll({
            include: {  // si on met un where dans l'include, il s'appliquera juste sur le tableau inclu. ex: name = nom de la tableet non de personne
                model: User,
                as: 'User',
                required: true, // Pour le inner join
                where:  { 
                    username:{  // name est la propriété // utilisation des opérateurs pour les critères de recherche
                              [Op.like]:`${username}` // name : critère de recherche // oper like cft SQL 
                         }
                }
                }
        })      
        .then(student => {
            student == '' ? res.json({data:'utilisateur inexistant'}) : res.json({data:student})
        })
        .catch(error => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data:error})
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data:error})
            }
            const message = `erreur`
            res.status(500).json({message, data:error})
        })

    }else{
        Student.findAll()
        .then(student => {
            res.json({data:'valeur absente dans lurl'})
        })
        .catch(error => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data:error})
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data:error})
            }
            const message = `problème url`
            res.status(500).json({message, data:error})
        })
    }
  
    })
}