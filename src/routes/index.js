'use strict';

import express from 'express';
import area from './area';
import user from './user';

var router = express.Router();

router.get('/area', area.get);
router.get('/user/:id', user.get);

export default router;
