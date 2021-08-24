const {Lesson} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') 
const bcrypt = require('bcrypt')
const auth = require('../auth/auth')

module.exports = app => {
    app.get('/api/lesson', auth, (req,res) => {
        Lesson.findOne({order: ['designation'] })
        .then(lesson => {
            lesson.designation = 'on teste'
            console.log( lesson.designation)
            res.json({data:lesson})
        })
        .catch(error => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data:error})
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data:error})
            }
            const message = `Les lessons n'ont pas pu être affichées`
            res.status(500).json({message, data:error})
        })
    })
}