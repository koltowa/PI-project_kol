import { Router } from 'express';
import * as notaryService from '../services/notaryService';
import * as contactsService from '../services/contactsService';
import * as phoneNumberService from '../services/phoneNumberService';
import * as employmentService from '../services/employmentService';

const router = Router();

router
  .get('/', (req, res, next) => notaryService.getAllNotaries()
    .then(data => res.send(data))
    .catch(next))
  .get('/:id', (req, res, next) => notaryService.getNotaryById(req.params.id)
    .then(data => res.send(data))
    .catch(next))
  .post('/', (req, res, next) => contactsService.create(req.body)
    .then(data => phoneNumberService.createAll(req.body.phoneNumbers, data))
    .then(data => notaryService.create({ ...req.body, contactId: data.id }))
    .then(data => notaryService.getNotaryById(data.id))
    .then(data => res.send(data))
    .catch(next))
  .put('/:id', (req, res, next) => notaryService.getNotaryById(req.params.id)
    .then(data => Promise.all([
      employmentService.updateEmployment(data.employment, req.body.employment),
      contactsService.updateContacts(data.contact, req.body)
    ]))
    .then(([employment]) => notaryService.updateNotaryById(req.params.id, { ...req.body, employmentId: employment.id }))
    .then(() => notaryService.getNotaryById(req.params.id))
    .then(data => res.send(data))
    .catch(next))
  .delete('/:id', (req, res, next) => notaryService.deleteNotaryById(req.params.id)
    .then(data => res.send({ deletedCount: data }))
    .catch(next));

export default router;
