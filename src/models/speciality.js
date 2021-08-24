module.exports = (Sequelize,DataTypes) => {
    const Speciality = Sequelize.define('Speciality',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        designation:{
            type:DataTypes.STRING,
        },
    },{
        timestamps:true,
        createdAt: 'created',
        updateAt: true
    }
    )
    return Speciality
}