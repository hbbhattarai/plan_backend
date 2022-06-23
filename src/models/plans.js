'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  plans.init({
    plan_name: DataTypes.STRING,
    dzongkhag_id: DataTypes.INTEGER,
    category: DataTypes.STRING,
    type: DataTypes.STRING,
    period_from: DataTypes.INTEGER,
    period_till: DataTypes.INTEGER,
    base_population: DataTypes.INTEGER,
    projected_population: DataTypes.INTEGER,
    preparation_date: DataTypes.STRING,
    approved_date: DataTypes.STRING,
    area: DataTypes.FLOAT,
    data_url: DataTypes.STRING,
    report_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'plans',
  });
  return plans;
};