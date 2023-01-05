import { Router } from 'express';
import * as localityService from '../services/localityService';

const router = Router();

router
  .get('/', (req, res, next) => localityService.getByAreaId(req.query.id)
    .then(data => res.send(data))
    .catch(next))
  .post('/', (req, res, next) => localityService.create(req.body)
    .then(data => res.send(data))
    .catch(next));

export default router;
