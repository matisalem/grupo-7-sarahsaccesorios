module.exports = (sequelize, dataTypes) =>{
    let alias = 'Producto_Tamano';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        producto_id  : dataTypes.INTEGER,
        tamano  : dataTypes.STRING,
        precio  : dataTypes.FLOAT
    }
    let config = {
        tableName : 'tamanos',
        timestamps : false
    }

    const Producto_Tamano = sequelize.define(alias,cols,config);
    Producto_Tamano.associate = function(models){
        Producto_Tamano.belongsTo(
            models.Productos,
            {
                as : 'tamanos_producto',
                foreignKey: 'producto_id'
            }
        )
        Producto_Tamano.hasMany(
            models.Carrito,
            {
                as : 'tamanos_carrito',
                foreignKey: 'tamano_id'
            }
        )

    }

    
    return Producto_Tamano;
}