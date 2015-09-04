import Sequelize from 'sequelize';
import connection from './connection.js';

var User = connection.define('user', {
		name: {
			type: Sequelize.STRING,
			field: 'name',
		},
		imgsrc: {
			type: Sequelize.STRING,
			field: 'imgsrc'
		},
		uuid: {
      type: Sequelize.UUID,
      primaryKey: true
    }
	},
	{
		underscored: true,
		freezeTableName: true,
		classMethods: {
			sanitizeForClient(rawUser){
				return {
					name: rawUser.name,
					imgsrc: rawUser.imgsrc
				};
			}
		}
	}
);

export default User;
