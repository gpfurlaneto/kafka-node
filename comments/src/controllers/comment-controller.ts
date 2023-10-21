import * as mongoose from 'mongoose';

import { produceMessage } from '../kafka';
import { CommentSchema } from '../models/comment';
import { TOPIC } from '../types/topics';

const Comment = mongoose.model('Comment', CommentSchema);

export async function listAll() {
  return await Comment.find({});
}

export async function create(comment: typeof Comment){
  const newComment = new Comment(comment);
  const result = await newComment.save();
  await produceMessage(TOPIC.COMMENT_CREATED, result)
  return result
}

export async function review(id: string, approved: boolean) {
  await Comment.findOneAndUpdate({ _id: id }, { publishedAt: new Date(), approved })
}

export async function deleteComment(id: string) {
  await Comment.deleteOne({ _id: id })
}