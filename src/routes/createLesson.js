const {Lesson} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') 
const bcrypt = require('bcrypt')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/lesson',auth,(req,res) => {
        Lesson.create(req.body)
        .then(lesson => {
            const message = `La lesson ${lesson.designation} a bien été créee`
            res.json({ message, data:lesson})
        })
        .catch(error => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data:error})
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message, data:error})
            }
            const message = `La lesson ${req.body.designation} n'a pas pu être créee`
            res.status(500).json({message, data:error})
        })
    })
}