import Member from '../../models/Member';
import { log } from '../../classes/Logger';

export function get(req, res) {
  const own_token = req.params.own_token;

  const notFond = {
    message: 'account not found'
  };

  if(own_token === undefined){
    return res.status(404).send(notFond);
  }

  Member.findOne({
    where: {
      own_token: own_token
    }
  })
  .then((member)=>{
    if(member){
      return res.status(200).send(member);
    }
    res.status(404).send(notFond);
  })
  .catch((error)=>{

    log.info(error);

    res.status(500).send(error);
  })
};

export function post(req, res) {
  const own_token = req.params.own_token;

  Member.create({
    own_token: own_token
  })
  .then((created)=>{
    res.status(200).send(created);
  })
  .catch((error)=>{
    res.status(500).send(error);
  });
}
