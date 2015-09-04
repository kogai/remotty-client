import Sequelize from 'sequelize';
import connection from './connection.js';

var User = connection.define('user', {
		name: {
			type: Sequelize.STRING,
			field: 'name',
		},
		user_id: {
			type: Sequelize.INTEGER,
			field: 'userId'
		}
	},
	{
		underscored: true,
		freezeTableName: true
	}
);

export default User;
