import Sequelize from 'sequelize';
import connection from './connection.js';

var Team = connection.define('team', {
		name: {
			type: Sequelize.STRING,
			field: 'name',
		},
		own_token: {
			type: Sequelize.STRING(255),
			field: 'own_token',
		},
		uuid: {
			type: Sequelize.UUID,
			field: 'uuid'
		}
	}
);

export default Team;
