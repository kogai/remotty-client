import { Router } from 'express';

import area from './area';
import * as member from './member';

var router = Router();

router.get('/area', area.get);
router.get('/member/all/:own_token', member.all);

router.get('/member/:own_token', member.get);
router.post('/member/:own_token', member.post);
router.put('/member/:own_token', member.put);

export default router;
