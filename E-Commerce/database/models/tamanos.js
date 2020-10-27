module.exports = (sequelize, dataTypes) =>{
    let alias = 'Tamanos';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        cantidad  : dataTypes.FLOAT,
        unidad  : dataTypes.STRING
    }
    let config = {
        tableName : 'tamanos',
        timestamps : false
    }

    const Tamanos = sequelize.define(alias,cols,config);
    Tamanos.associate = function(models){
        Tamanos.hasMany(
            models.Tamano_producto,
            {
                as : 'tamanos',
                foreignKey: 'tamano_id'
            }
        )
        Tamanos.hasMany(
            models.Carrito_Producto,
            {
                as : 'tamanos',
                foreignKey: 'tamano_id'
            }
        )

    }

    
    return Tamanos;
}