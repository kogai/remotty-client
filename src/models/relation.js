import Member from './Member';
import Team from './Team';


export default function() {


	Member.belongsToMany(Team, {
		through: 'team_mates',
		foreignKey: 'member_id'
	});

	Team.hasMany(Member);

};
