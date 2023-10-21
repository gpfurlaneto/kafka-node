import { Router } from 'express';

import {
  create as createPost,
  deletePost,
  listAll,
  publish as publishPost,
} from '../controllers/post-controller';

export const router = Router()

router.get('/', async (req, res) => {
  const posts = await listAll()
  return res.status(200).json(posts)
})

router.post('/', async (req, res) => {
  const post = await createPost(req.body)
  return res.status(200).json(post)
})

router.put('/:id/publish', async (req, res) => {
  await publishPost(req.params.id)
  return res.status(201).send()
})

router.delete('/:id', async (req, res) => {
  await deletePost(req.params.id)
  return res.status(200).send()
})