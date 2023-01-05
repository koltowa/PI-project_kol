import { Router } from 'express';
import * as areaService from '../services/areaService';

const router = Router();

router
  .get('/', (req, res, next) => areaService.getByRegionId(req.query.id)
    .then(data => res.send(data))
    .catch(next))
  .post('/', (req, res, next) => areaService.create(req.body)
    .then(data => res.send(data))
    .catch(next));

export default router;
