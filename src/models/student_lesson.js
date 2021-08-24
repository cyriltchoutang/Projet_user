module.exports = (Sequelize,DataTypes) => {
    const Student_lesson = Sequelize.define('Student_lesson',{
       note: DataTypes.INTEGER,
       remarque: DataTypes.STRING
    },{
        timestamps:true,
        createdAt: 'created',
        updateAt: false
    }
    )
    return Student_lesson
}