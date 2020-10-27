module.exports = (sequelize, dataTypes) =>{
    let alias = 'Imagen_Producto';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        ruta  : dataTypes.STRING,
        producto_id : dataTypes.INTEGER
        
    }
    let config = {
        tableName : 'imagen_producto',
        timestamps : false
    }

    const Imagen_Producto = sequelize.define(alias,cols,config);
    Imagen_Producto.associate = function(models){
        Imagen_Producto.belongsTo(
            models.Productos,
            {
                as : 'productos',
                foreignKey: 'producto_id'
            }
        )
        
    }



    return Imagen_Producto;
}