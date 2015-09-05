import uuid from 'uuid';
import store from 'store';
import request from 'superagent';
import Promise from 'bluebird';

class Account {
  create(done){
    function _createAccount(done){
      const token = uuid.v1();
      request
        .post('/member/' + token)
        .end((err, ret)=>{
          if(err){
            return done(err);
          }
          store.set('own_token', token);
          done(null, ret.body);
        });
    }
    if(done){
      return _createAccount(done);
    }
    return Promise.promisify(_createAccount)();
  }
}


const account = new Account();
export { account };
