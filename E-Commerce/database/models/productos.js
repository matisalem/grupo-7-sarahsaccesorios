module.exports = (sequelize, dataTypes) =>{
    let alias = 'Productos';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        nombre  : dataTypes.STRING,
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
            models.Categorias,
            {
                as : 'Categorias2',
                foreignKey: 'categoria_id'
            }
        )
             Productos.hasMany(
            models.Carrito_Producto,
            {
                as : 'CarritoProducto',
                foreignKey: 'productos_id'
            }
        ) 
        Productos.hasMany(
            models.Imagen_Producto,
            {
                as : 'ImagenProducto',
                foreignKey: 'productos_id'
            }
        )
        Productos.hasMany(
            models.Producto_Color,
            {
                as : 'ColorProducto',
                foreignKey: 'productos_id'
            }
        )
        Productos.hasMany(
            models.Producto_Tamano,
            {
                as : 'TamanoProducto',
                foreignKey: 'productos_id'
            }
        )
    }



    return Productos;
}