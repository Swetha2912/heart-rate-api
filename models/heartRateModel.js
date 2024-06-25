const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HeartRate = sequelize.define('heart_rate', {
  from_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  to_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  measurement: {
    type: DataTypes.JSONB,
    allowNull: false,
    validate: {
      isValidMeasurement(value) {
        if (!value.low || !value.high) {
          throw new Error('Measurement must contain low and high values');
        }
        if (isNaN(value.low) || isNaN(value.high)) {
          throw new Error('Low and high values must be numbers');
        }
      }
    }
  }
}, {
  timestamps: false // Disable createdAt and updatedAt fields
});

module.exports = HeartRate;