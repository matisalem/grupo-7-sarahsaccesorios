module.exports = (sequelize, dataTypes) =>{
    let alias = 'Producto_Color';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        producto_id  : dataTypes.INTEGER,
        color_id  : dataTypes.INTEGER
    }
    let config = {
        tableName : 'producto_color',
        timestamps : false
    }

    const Producto_Color = sequelize.define(alias,cols,config);
    Producto_Color.associate = function(models){
        Producto_Color.belongsTo(
            models.Colores,
            {
                as : 'colores',
                foreignKey: 'color_id'
            }
        )

    }

    
    return Producto_Color;
}