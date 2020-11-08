module.exports = (sequelize, dataTypes) =>{
    let alias = 'Colores';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        color  : dataTypes.STRING
    }
    let config = {
        tableName : 'colores',
        timestamps : false
    }

    const Colores = sequelize.define(alias,cols,config);
    Colores.associate = function(models){
      //  Colores.hasMany(
          //  models.Producto_Color,
         //   {
         //       as : 'coloress',
         //       foreignKey: 'color_id'
         //   }
      //  )
        Colores.hasMany(
            models.Carrito_Producto,
            {
                as : 'colores',
                foreignKey: 'color_id'
            }
        )


    }

    
    return Colores;
}