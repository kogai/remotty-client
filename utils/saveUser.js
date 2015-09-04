import uuid from 'uuid';
import User from './src/models/User';
import Team from './src/models/Team';

const users = ['atom-employee', 'electron-employee', 'github-employee'];

User.sync({ force: true });
Team.sync({ force: true });

users.forEach((user) => {
});
