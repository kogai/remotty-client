'use strict';

import express from 'express';
import area from './area';
import member from './member';

var router = express.Router();

router.get('/area', area.get);
router.get('/member/:member_id', member.get);

export default router;
