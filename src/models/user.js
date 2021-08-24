module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: { // Rend le unsername unique
            msg: 'Le nom est déjà pris'
        }
      },
      password: {
        type: DataTypes.STRING
      },
    age:{
        type:DataTypes.INTEGER
    },

    })

    User.associate = function(models) {
        User.belongsTo(models.Student, {foreignKey: 'id_student', as: 'Student'})
      };
    User.associate = function(models) {
        User.belongsTo(models.Teacher, {foreignKey: 'id_teacher', as: 'Teacher'})
    };

    return User
  }