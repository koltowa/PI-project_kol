import { Router } from 'express';
import * as regionService from '../services/regionService';

const router = Router();

router
  .get('/', (req, res, next) => regionService.getAll()
    .then(data => res.send(data))
    .catch(next))
  .post('/', (req, res, next) => regionService.create(req.body)
    .then(data => res.send(data))
    .catch(next));

export default router;
