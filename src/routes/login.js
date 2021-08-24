const {Teacher} = require('../db/sequelize')
const {User} = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')


module.exports = (app) =>  {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: {username: req.body.username} }).then(user => {
            if(!user){
                const message = `L'utilisateur demandé n'existe pas`
                return res.status(404).json({message})
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => { // elle compare le mdp saisi par le user avec le mdp encrypté dans la bdd. Il décrypte le mdp pour le comparer en clair    
                if(!isPasswordValid) { // s'il n'est pas valide
                  const message = 'Le mot de passe est incorrect';
                  return res.status(401).json({message}) // pas autorisé
                }
                //JWT
                const token = jwt.sign( // on genere le jeton avec la methode sign du module jwt.. elle a besoin des 3 infos ci dessous pour creer le jeton
                    { userId: user.id }, // userId vient de auth.js; infos user
                    privateKey, // clé secrete
                    { expiresIn: '24h' }    // durée
                )
                  const message = `L'utilisateur a été connecté avec succès`;
                  return res.json({ message, data: user, token }) //on retourne le token au client car tout est correct
            })
        })
        .catch(error => {  // PB RESEAU
            const message = ("L'utilisateur n'a pas pu être connecté")
            return res.json({message, data:error})
        })
        // Student.findOne({ where: {name: req.body.name} }).then(student => {
        //     if(!student){
        //         const message = `L'utilisateur demandé n'existe pas`
        //         return res.status(404).json({message})
        //     }
        //     bcrypt.compare(req.body.password, teacher.password).then(isPasswordValid => { // elle compare le mdp saisi par le user avec le mdp encrypté dans la bdd. Il décrypte le mdp pour le comparer en clair    
        //         if(!isPasswordValid) { // s'il n'est pas valide
        //           const message = 'Le mot de passe est incorrect';
        //           return res.status(401).json({message}) // pas autorisé
        //         }
        //         //JWT
        //         const token = jwt.sign( // on genere le jeton avec la methode sign du module jwt.. elle a besoin des 3 infos ci dessous pour creer le jeton
        //             { userId: student.id }, // userId vient de auth.js; infos user
        //             privateKey, // clé secrete
        //             { expiresIn: '24h' }    // durée
        //         )
        //           const message = `L'utilisateur a été connecté avec succès`;
        //           return res.json({ message, data: student, token }) //on retourne le token au client car tout est correct
        //     })
        // })
        // .catch(error => {  // PB RESEAU
        //     const message = ("L'utilisateur n'a pas pu être connecté")
        //     return res.json({message, data:error})
        // })

    })
}