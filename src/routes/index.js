'use strict';

import express from 'express';
import area from './area';

var router = express.Router();

router.get('/area', area.get);

export default router;
