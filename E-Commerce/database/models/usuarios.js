module.exports = (sequelize, dataTypes) =>{
    let alias = 'Usuarios';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        nombre  : dataTypes.STRING,
        apellido : dataTypes.STRING,
        email : dataTypes.STRING,
        contrasena : dataTypes.STRING,
        telefono : dataTypes.STRING,
        avatar : dataTypes.STRING,
        user_name : dataTypes.STRING
    }
    let config = {
        tableName : 'usuarios',
        timestamps : false
    }

    const Usuarios = sequelize.define(alias,cols,config);
    Usuarios.associate = function(models){
        Usuarios.hasMany(
            models.Carrito,
            {
                as : 'usuarios',
                foreignKey: 'usuario_id'
            }
        )
    }



    return Usuarios;
}