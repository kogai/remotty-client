"use strict";

import Member from 'src/models/Member';
import Team from 'src/models/Team';

Member.sync({ force: true }).then(()=>{
  Team.sync({ force: true });
});
