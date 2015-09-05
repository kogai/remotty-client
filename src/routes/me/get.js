import Team from '../../models/Team';
import Member from '../../models/User';

export default (req, res) => {
  const own_token = req.params.own_token;

  console.log(own_token);
  // res.status(200).send(member_id);
};
