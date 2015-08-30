import uuid from 'uuid';
import UserModel from './src/models/User';
const users = ['atom-employee', 'electron-employee', 'github-employee'];

users.forEach((user) => {
  let newUser = new UserModel({
    name: user,
    mail: user + '@test.io',
    password: user + 'istestaccount',
    verifyToken: uuid.v1(),
    isVerify: false,
    teams: ['github.inc']
  });

  newUser.save((err) => {
    if(err){
      return console.log(err);
    }
    console.log("saved.");
  });
});
