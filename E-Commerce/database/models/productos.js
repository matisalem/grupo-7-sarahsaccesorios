module.exports = (sequelize, dataTypes) =>{
    let alias = 'Productos';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        nombre  : dataTypes.STRING,
        precio : dataTypes.FLOAT,
        descripcion : dataTypes.STRING,
        categoria_id : dataTypes.INTEGER,
        descuento : dataTypes.FLOAT
    }
    let config = {
        tableName : 'productos',
        timestamps : false
    }

    const Productos = sequelize.define(alias,cols,config);
    Productos.associate = function(models){
        Productos.belongsTo(
            models.categoria,
            {
                as : 'categorias',
                foreignKey: 'categoria_id'
            }
        )
        Productos.hasMany(
            models.Carrito_Producto,
            {
                as : 'productos',
                foreignKey: 'productos_id'
            }
        )
        Productos.hasMany(
            models.Imagen_Producto,
            {
                as : 'productos',
                foreignKey: 'productos_id'
            }
        )
    }



    return Productos;
}