import uuid from 'uuid';
import Member from 'src/models/Member';

const members = ['atom-employee', 'electron-employee', 'github-employee'];

members.forEach((member)=>{
  Member.create({
    name: member,
    own_token: uuid.v1()
  });
});
