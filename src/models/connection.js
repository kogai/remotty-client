import Sequelize from 'sequelize';
import { postgresql } from '../credential.js';

const connection = new Sequelize(postgresql.database, postgresql.username, postgresql.password, postgresql.options);

export default connection;

// var sequelize = new Sequelize('database', 'username', 'password', {
