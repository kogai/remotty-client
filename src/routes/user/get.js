// import TeamModel from '../../models/Team';
// import UserModel from '../../models/User';

export default (req, res) => {
  let id = req.params.id;

  console.log(id);

  /*
  if(id === 'all'){
    UserModel.find({}, function(error, users){
      if(error){
        res.status(500).send(error);
      }
      res.status(200).send(users);
    });
  }
  */
};
