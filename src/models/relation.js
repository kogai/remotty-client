import User from './User';
import Team from './Team';

export default function() {
	User.belongsToMany(Team, {
		through: 'team_mates',
		foreignKey: 'user_id'
	});
	Team.hasMany(User);
};
