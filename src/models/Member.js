import Sequelize from 'sequelize';
import connection from './connection.js';

var Member = connection.define('member', {
		name: {
			type: Sequelize.STRING,
			field: 'name',
		},
		imgsrc: {
			type: Sequelize.STRING,
			field: 'imgsrc'
		}
	},
	{
		classMethods: {
			sanitizeForClient(rawMember){
				return {
					name: rawMember.name,
					imgsrc: rawMember.imgsrc
				};
			}
		}
	}
);

export default Member;
