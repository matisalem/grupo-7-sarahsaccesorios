module.exports = (sequelize, dataTypes) =>{
    let alias = 'Carrito';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        total  : dataTypes.FLOAT,
        usuario_id : dataTypes.INTEGER,
        fecha_compra : dataTypes.DATE,
        fecha_creacion : dataTypes.DATE,
        estado : dataTypes.INTEGER
    }
    let config = {
        tableName : 'carrito',
        timestamps : false
    }

    const Carrito = sequelize.define(alias,cols,config);
    Carrito.associate = function(models){
        Carrito.belongsTo(
            models.Usuarios,
            {
                as : 'usuarios',
                foreignKey: 'usuario_id'
            }
        )
        Carrito.belongsTo(
            models.Carrito_Producto,
            {
                as : 'carrito',
                foreignKey: 'carrito_id'
            }
        )

    }



    return Carrito;
}