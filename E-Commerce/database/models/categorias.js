module.exports = (sequelize, dataTypes) =>{
    let alias = 'Categorias';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        nombre  : dataTypes.STRING
    }
    let config = {
        tableName : 'categorias',
        timestamps : false
    }

    const Categorias = sequelize.define(alias,cols,config);
    Categorias.associate = function(models){
        Categorias.hasMany(
            models.Productos,
            {
                as : 'categorias',
                foreignKey: 'categoria_id'
            }
        )

    }

    
    return Productos;
}