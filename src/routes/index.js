import { Router } from 'express';

import area from './area';
import * as member from './member';

var router = Router();

router.get('/area', area.get);
router.get('/member/:own_token', member.get);
router.post('/member/:own_token', member.post);

export default router;
