module.exports = (Sequelize,DataTypes) => {
    const Student = Sequelize.define('Student',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        matriculeeleve: {
            type: DataTypes.STRING
        },
    },{
        timestamps:true,
        createdAt: 'created',
        updateAt: true
    }
    )
    Student.associate = function(models){
        Student.belongsTo(models.Speciality, {foreignKey: 'id_speciality', as:'Speciality'})
    }
    return Student
}