import { Router } from 'express';
import * as userService from '../services/userService';

const router = Router();

router
  .post('/', (req, res, next) => userService.getFilteredUsers(req.body)
    .then(data => res.send(data))
    .catch(next))
  .put('/:id/block', (req, res, next) => userService.blockUserById(req.params.id)
    .then(data => res.send(data))
    .catch(next))
  .put('/:id/unblock', (req, res, next) => userService.unblockUserById(req.params.id)
    .then(data => res.send(data))
    .catch(next))
  .delete('/:id', (req, res, next) => userService.deleteUserById(req.params.id)
    .then(data => res.send({ deletedCount: data }))
    .catch(next));

export default router;
