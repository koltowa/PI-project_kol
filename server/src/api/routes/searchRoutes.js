import { Router } from 'express';
import * as searchService from '../services/searchService';

const router = Router();

router
  .post('/address', (req, res, next) => Promise.all([
    searchService.searchOrganizationsByAddress(req.body),
    searchService.searchNotariesByAddress(req.body)
  ])
    .then(([organizations, notaries]) => [...organizations, ...notaries])
    .then(data => data.sort((a, b) => (a.id < b.id ? -1 : 1)))
    .then(data => res.send(data))
    .catch(next))
  .post('/name', (req, res, next) => searchService.searchOrganizationsByName(req.body.name)
    .then(data => res.send(data))
    .catch(next))
  .post('/notary', (req, res, next) => searchService.searchNotariesByName(req.body)
    .then(data => res.send(data))
    .catch(next));

export default router;
