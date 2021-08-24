module.exports = (Sequelize,DataTypes) => {
    const Teacher = Sequelize.define('Teacher',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        matriculeprof:{
            type:DataTypes.STRING,
        }
    },{
        timestamps:true,
        createdAt: 'created',
        updateAt: true
    }
    )
    return Teacher
}