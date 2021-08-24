const {User} = require('../db/sequelize')
//const auth = require('../auth/auth')
const { ValidationError, UniqueConstraintError } = require('sequelize') 
const bcrypt = require('bcrypt')

module.exports = (app) =>{
    app.post('/api/user', (req,res) =>{
        bcrypt.hash(req.body.password,10) //pikachu est le mdp
        .then(hash => { 
            req.body.password = hash
            User.create(req.body)
            .then(user => {
                const message = `Le user ${user.username} a bien été crée avec l'id ${user.id}`
                res.json({ message, data:user})
            })
            .catch(error => {
                if(error instanceof ValidationError){
                    return res.status(400).json({message: error.message, data:error})
                }
                if(error instanceof UniqueConstraintError){
                    return res.status(400).json({message: error.message, data:error})
                }
                const message = `Le user ${req.body.username} n'a pas u être crée`
                res.status(500).json({message, data:error})
            })
        })
    })
}
