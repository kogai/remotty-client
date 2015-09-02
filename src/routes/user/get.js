import TeamModel from '../../models/Team';
import UserModel from '../../models/User';

export default (req, res) => {
  const user_id = req.params.user_id;
  const team_id = req.query.team_id;

  console.log(req.query);
  console.log(user_id);

  if(user_id === 'all'){
    UserModel.find({
      
    }, function(error, users){
      if(error){
        res.status(500).send(error);
      }
      res.status(200).send(users);
    });
  }
};
