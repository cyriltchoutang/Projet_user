module.exports = (Sequelize,DataTypes) => {
    const Lesson = Sequelize.define('Lesson',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        designation:{
            type:DataTypes.STRING,
        }
    },{
        timestamps:true,
        createdAt: 'created',
        updateAt: true
    }
    )
    Lesson.associate = function(models){
        Lesson.belongsTo(models.Speciality, {foreignKey: 'id_speciality', as:'Speciality'})
    }
    Lesson.associate = function(models){
        Lesson.belongsTo(models.Teacher, {foreignKey: 'id_teacher', as:'Teacher'})
    }

    return Lesson
}