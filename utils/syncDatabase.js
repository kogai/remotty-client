"use strict";

import Member from 'src/models/Member';

Member.sync({ force: true }).then((result)=>{
  console.log('sync done.');
  console.log(result);
});
