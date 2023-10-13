import * as mongoose from 'mongoose';

import { produceMessage } from '../kafka';
import { PostSchema } from '../models/post';
import { TOPIC } from '../types/topics';

const Post = mongoose.model('Post', PostSchema);

export async function listAll() {
  return await Post.find({});
}

export async function create(post: typeof Post){
  const newPost = new Post(post);
  const result = await newPost.save();
  await produceMessage(TOPIC.POST_CREATED, result)
  return result
}

export async function publish(id: string) {
  await Post.findOneAndUpdate({ _id: id }, { publishedAt: new Date() })
  await produceMessage(TOPIC.POST_PUBLISHED, { _id: id })
}

export async function deletePost(id: string) {
  await Post.deleteOne({ _id: id })
  produceMessage(TOPIC.POST_DELETED, { _id: id })
}