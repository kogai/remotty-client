import Member from '../../models/Member';
import { log } from '../../classes/Logger';

const notFond = {
  message: 'account not found'
};

export function all(req, res){
  const own_token = req.params.own_token;

  Member.findAll({
    where: {
      own_token: {
        $ne: own_token
      }
    }
  })
  .then((members)=>{
    return res.status(200).send(members);
  })
  .catch((error)=>{
    res.status(500).send(error);
  });
}

export function get(req, res) {
  const own_token = req.params.own_token;

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
    log.info(created);
    res.status(200).send(created);
  })
  .catch((error)=>{
    log.info(error);
    res.status(500).send(error);
  });
}

export function put(req, res){
  const own_token = req.params.own_token;
  const update = req.body;

  const conditions = {
    where: {
      own_token: own_token
    }
  };
  Member.update(update, conditions)
  .then(()=>{
    res.status(200).send();
  })
  .catch((error)=>{
    log.info(error);
    res.status(500).send(error);
  });
}
