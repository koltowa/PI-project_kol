import { Router } from 'express';
import * as organizationService from '../services/organizationService';
import * as contactsService from '../services/contactsService';
import * as phoneNumberService from '../services/phoneNumberService';

const router = Router();

router
  .get('/:id', (req, res, next) => organizationService.getOrganizationById(req.params.id)
    .then(data => res.send(data))
    .catch(next))
  .post('/', (req, res, next) => contactsService.create(req.body)
    .then(data => phoneNumberService.createAll(req.body.phoneNumbers, data))
    .then(data => organizationService.create({ ...req.body, contactId: data.id }))
    .then(data => organizationService.getOrganizationById(data.id))
    .then(data => res.send(data))
    .catch(next))
  .put('/:id', (req, res, next) => organizationService.updateOrganizationById(req.params.id, req.body)
    .then(() => organizationService.getOrganizationById(req.params.id))
    .then(data => contactsService.updateContacts(data.contact, req.body))
    .then(() => organizationService.getOrganizationById(req.params.id))
    .then(data => res.send(data))
    .catch(next))
  .delete('/:id', (req, res, next) => organizationService.deleteOrganizationById(req.params.id)
    .then(data => res.send({ deletedCount: data }))
    .catch(next));

export default router;
