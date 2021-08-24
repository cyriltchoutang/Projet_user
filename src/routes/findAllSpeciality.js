const {Speciality} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') 
const bcrypt = require('bcrypt')
const auth = require('../auth/auth')

module.exports = app => {
    app.get('/api/speciality', auth, (req,res) => {
        Speciality.findAll({order: ['designation'] })
        .then(speciality => {
            res.json({data:speciality})
        })
        .catch(error => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data:error})
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data:error})
            }
            const message = `Les spécialités n'ont pas pu être affichées`
            res.status(500).json({message, data:error})
        })
    })
}