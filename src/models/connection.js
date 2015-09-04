import Sequelize from 'sequelize';
import { postgresql } from '../credential.js';

const connection = new Sequelize(postgresql, {
  ssl: true
});

export default connection;
