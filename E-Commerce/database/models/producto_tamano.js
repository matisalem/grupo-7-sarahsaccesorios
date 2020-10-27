module.exports = (sequelize, dataTypes) =>{
    let alias = 'Producto_Tamano';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        producto_id  : dataTypes.INTEGER,
        tamano_id  : dataTypes.INTEGER
    }
    let config = {
        tableName : 'producto_tamano',
        timestamps : false
    }

    const Producto_Tamano = sequelize.define(alias,cols,config);
    Producto_Tamano.associate = function(models){
        Producto_Tamano.belongsTo(
            models.Tamanos,
            {
                as : 'tamanos',
                foreignKey: 'tamano_id'
            }
        )

    }

    
    return Producto_Tamano;
}