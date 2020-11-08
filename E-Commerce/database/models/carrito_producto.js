module.exports = (sequelize, dataTypes) =>{
    let alias = 'Carrito_Producto';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        carrito_id  : dataTypes.INTEGER,
        producto_id : dataTypes.INTEGER,
        color_id : dataTypes.INTEGER,
        tamano_id : dataTypes.INTEGER,
        cantidad : dataTypes.FLOAT,
        precio_congelado : dataTypes.FLOAT,
        descuento_congelado : dataTypes.FLOAT

    }
    let config = {
        tableName : 'carrito_producto',
        timestamps : false
    }

    const Carrito_Producto = sequelize.define(alias,cols,config);
    Carrito_Producto.associate = function(models){
        Carrito_Producto.belongsTo(
            models.Carrito,
            {
                as : 'carrito',
                foreignKey: 'carrito_id'
            }
        )
        Carrito_Producto.belongsTo(
            models.Productos,
            {
                as : 'productos',
                foreignKey: 'producto_id'
            }
        )
        Carrito_Producto.belongsTo(
            models.Colores,
            {
                as : 'colores',
                foreignKey: 'color_id'
            }
        )
        Carrito_Producto.belongsTo(
            models.Tamanos,
            {
                as : 'tamanos',
                foreignKey: 'tamano_id'
            }
        )
    }



    return Carrito_Producto;
}