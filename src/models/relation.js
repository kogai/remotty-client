import Member from './Member';
import Team from './Team';


export default function() {


	Member.belongsToMany(Team, { through: 'TeamMates' });
	Team.hasMany(Member, { as: 'Members' });

};
