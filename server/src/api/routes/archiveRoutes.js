import { Router } from 'express';
import * as archiveService from '../services/archiveService';

const router = Router();

router
  .get('/', (req, res, next) => archiveService.getAllArchives()
    .then(data => res.send(data))
    .catch(next))
  .post('/', (req, res, next) => archiveService.create(req.body)
    .then(data => res.send(data))
    .catch(next));

export default router;
