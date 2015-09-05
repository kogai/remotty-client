import Team from '../../models/Team';
import Member from '../../models/User';

export default (req, res) => {
  const member_id = req.params.member_id;
  const team_id = req.query.team_id;

  console.log(req.query);
  console.log(member_id);
  // res.status(200).send(member_id);

  // /*
  if(member_id === 'all'){
    Member.findAll({
      where: team_id
    }, function(error, users){
      if(error){
        res.status(500).send(error);
      }
      res.status(200).send(users);
    });
  }
  // */
};
