const {Sequelize, Datatypes, DataTypes} = require('sequelize')
const LessonModel = require('../models/lesson')
const SpecialityModel = require('../models/speciality')
const StudentModel = require('../models/student')
const TeacherModel = require('../models/teacher')
const UserModel = require('../models/user')
const Student_lessonModel = require('../models/student_lesson')
const bcrypt = require('bcrypt')


let sequelize 
if(process.env.NODE_ENV === 'production'){
    sequelize = new Sequelize('kk8u5y871hfoaw9y', 't09tvm6qofrtvc7h', 'ryujse9ftf40wpqn', {
        host: 'klbcedmmqp7w17ik.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        dialect: 'mariadb',
        dialectOptions: {
          timezone: 'Etc/GMT-2',
        },
        logging: true
      })
} else {
      sequelize = new Sequelize('scolarite', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        // dialectOptions: {
        //   timezone: 'Etc/GMT-2',
        // },
        logging: true
      })
}

const Lesson = LessonModel(sequelize, DataTypes)
const Speciality = SpecialityModel(sequelize,DataTypes)
const Student_lesson = Student_lessonModel(sequelize,DataTypes)
const Student = StudentModel(sequelize,DataTypes)
const Teacher = TeacherModel(sequelize,DataTypes)
const User = UserModel(sequelize,DataTypes)

//Student.hasOne(User, {as:'User'})
//Teacher.hasOne(User, {as:'User'})

Speciality.hasMany(Student, {as:'Student'})
Speciality.hasMany(Lesson, {as:'Lesson'})
Teacher.hasMany(Lesson, {as:'Lesson'})
Student.hasMany(User, {as:'User'})
Teacher.hasMany(User, {as:'User'})

Student.belongsToMany(Lesson, {through: 'Student_lesson', constraints: false })
Lesson.belongsToMany(Student, {through: 'Student_lesson', constraints: false }) 


sequelize.authenticate()
.then(_ => console.log('La connexion à la base de données a bien été établie'))
.catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

const initDb = () => {
  return sequelize.sync()
  .then(_=>{
    console.log('La base de données a été synchronisée')

    Lesson.bulkCreate([
      {designation: 'maths'},
      {designation: 'histoire'}
    ])
    .then((newLesson) => {
      console.log(newLesson)
    })
    .catch((err) => {
      console.log('Error',err)
    })

    Speciality.bulkCreate([
      {designation: 'master'},
      {designation: 'licence'}
    ])
    .then((newSpeciality) =>{
      console.log(newSpeciality)
    })
    .catch((err) => {
      console.log('Error',err)
    })

    bcrypt.hash('pikachu',10) //pikachu est le mdp
    .then(hash => { 
      User.bulkCreate([
        {username: 'karlo', password: hash, age: 14},
        {username: 'maximep', password: hash, age: 45}
      ])
      .then((newUser) =>{
        console.log(newUser)
      })
      .catch((err) => {
        console.log('Error',err)
      })
    })

    
    // Student_lesson.bulkCreate([
    //   {note: 17, remarque: 'Très bien', PokemonId:2, PersonneId:1},
    //   {note: 15, remarque: 'Bien', PokemonId:4, PersonneId:1}
    // ])
    // .then((newStudent_lesson) => {
    //   console.log(newStudent_lesson)
    // })
    // .catch((err) => {
    //   console.log("Error while users creation : ", err)
    // })

  })
}

module.exports = {
  initDb, Lesson, Speciality, Student_lesson, Student, Teacher, User
}