const {Speciality} = require('../db/sequelize')
const {Lesson} = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize') 
const { Op } = require("sequelize")
const bcrypt = require('bcrypt')
const auth = require('../auth/auth')
const user = require('../models/user')
const speciality = require('../models/speciality')

module.exports = app => {
    app.get('/api/specialitylesson', auth, (req,res) => {

    if(req.query.SpecialityId){  
            const SpecialityId = req.query.SpecialityId
            Speciality.findAll({
            include: {  // si on met un where dans l'include, il s'appliquera juste sur le tableau inclu. ex: name = nom de la tableet non de personne
                model: Lesson,
                as: 'Lesson',
                required: true, // Pour le inner join
                where:  { 
                    SpecialityId:{  // name est la propriété // utilisation des opérateurs pour les critères de recherche
                            [Op.eq]: SpecialityId // name : critère de recherche // oper like cft SQL 
                         }
                }            
                }
        })      
        .then(speciality => {
            speciality == '' ? 
            Speciality.findAll({
                where: {
                    id:{
                        [Op.like]: SpecialityId
                    }
                }
            })
            .then(speciality => {
            res.json({data:speciality})
            })
            .catch(error =>  res.status(500).json({data:error})) 
            
            : res.json({data:speciality})
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
        Speciality.findAll()
        .then(speciality => {
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