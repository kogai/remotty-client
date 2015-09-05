import Sequelize from 'sequelize';
import connection from './connection.js';

var Team = connection.define('team', {
		name: {
			type: Sequelize.STRING,
			field: 'name',
		},
		member_id: {
			type: Sequelize.INTEGER,
			field: 'member_id'
		}
	}
);

export default Team;
