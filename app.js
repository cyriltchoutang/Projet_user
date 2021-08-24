console.log('Hello eleve1!!')
const express = require('express')
const sequelize = require('./src/db/sequelize')
const bodyParser = require('body-parser')
const cors = require('cors') //importe cors

const app = express()
const port = process.env.port || 3000


app
.use(bodyParser.json())
.use(cors())


sequelize.initDb() // Ne jamais le mettre en commentaire car il peut empêcher de faire des posts dans la bdd etant sur le front

app.get('/',(req,res)=>{
    res.json('Salut chef')
})

// Importer la logique de la page d'accueil
const genererPageAccueil = require('./index-get.js')

// Ecoute la méthode GET et la route '/'
app.get('/bonjour', async(req, res) => {
  // Récupérer le contenu de la page HTML
  const indexHtml = await genererPageAccueil()

  // Envoyer le résultat
  res.send(indexHtml)
})

require('./src/routes/login')(app)// identifier un user
require('./src/routes/createUser')(app) //creer un user
require('./src/routes/createLesson')(app) //creer une lesson
require('./src/routes/createStudent')(app) //creer un matricule élève
require('./src/routes/createTeacher')(app) //creer un matricule prof
require('./src/routes/createSpeciality')(app) //creer une spécialité
require('./src/routes/findAllSpeciality')(app) //afficher les spécialités
require('./src/routes/findAllUser_Student')(app) //afficher les infos du student et user. C'est pour ne pas faire trop requête au niveau du front
require('./src/routes/fileAllSpeciality_lesson')(app) //afficher les specialités et lessons. Pour faciliter le front
require('./src/routes/findAllLesson')(app) //afficher les lessons
require('./src/routes/findAllStudent')(app) //afficher les infos du student

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée !'
    res.status(404).json({message}) // definit un statut à notre reponse.
})

app.listen(port, () => console.log(`notre application Node est démarrée sur http://localhost:${port}`))
