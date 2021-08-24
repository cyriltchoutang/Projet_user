const {Speciality} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') 
const bcrypt = require('bcrypt')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/speciality',auth,(req,res) => {
        Speciality.create(req.body)
        .then(speciality => {
            const message = `La spécialité ${speciality.designation} a bien été créee`
            res.json({ message, data:speciality})
        })
        .catch(error => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data:error})
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data:error})
            }
            const message = `La spécialité ${req.body.designation} n'a pas pu être créee`
            res.status(500).json({message, data:error})
        })
    })
}