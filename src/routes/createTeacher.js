const {Teacher} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') 
const bcrypt = require('bcrypt')
const auth = require('../auth/auth') 


module.exports = (app) => {
    app.post('/api/teacher',auth, (req,res) => {
        Teacher.create(req.body)
        .then(teacher =>{
            const message = `Matricule ${teacher.matriculeprof} enregistré`
            res.json({message,data:teacher})
        })
        .catch(error => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data:error})
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data:error})
            }
            const message = `Le matricule ${req.body.matriculeprof} n'a pas pu être enregistré`
            res.status(500).json({message, data:error})
        })
    })
}