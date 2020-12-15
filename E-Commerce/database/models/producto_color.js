module.exports = (sequelize, dataTypes) =>{
    let alias = 'Producto_Color';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        producto_id  : dataTypes.INTEGER,
        color  : dataTypes.STRING(50)
    }
    let config = {
        tableName : 'producto_color',
        timestamps : false
    }

    const Producto_Color = sequelize.define(alias,cols,config);
    Producto_Color.associate = function(models){
        Producto_Color.hasMany(
            models.Carrito_Producto,
            {
                as : 'producto_color1',
                foreignKey: 'producto_id'
            }
        )
        Producto_Color.hasMany(
            models.Carrito_Producto,
            {
                as : 'Carrito',
                foreignKey: 'color_id'
            }
        )

    }

    
    return Producto_Color;
}