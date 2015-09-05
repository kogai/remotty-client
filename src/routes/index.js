'use strict';

import express from 'express';
import area from './area';
import member from './member';
import me from './me';

var router = express.Router();

router.get('/area', area.get);
router.get('/member/:member_id', member.get);
router.get('/me/:own_token', me.get);

export default router;
