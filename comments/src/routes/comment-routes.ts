import { Router } from 'express';

import {
  create as createComment,
  deleteComment,
  listAll,
  review,
} from '../controllers/comment-controller';

export const router = Router()

router.get('/', async (req, res) => {
  const comments = await listAll()
  return res.status(200).json(comments)
})

router.post('/', async (req, res) => {
  const post = await createComment(req.body)
  return res.status(200).json(post)
})

router.put('/:id/review', async (req, res) => {
  await review(req.params.id, req.body.approved)
  return res.status(201).send()
})

router.delete('/:id', async (req, res) => {
  await deleteComment(req.params.id)
  return res.status(200).send()
})