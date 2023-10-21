import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
  description: {
    type: String,
    required: 'Enter a description'
  },
  createdAt: {
    type: Date,
    default: Date.now            
  },
  publishedAt: {
    typs: Date
  },
  approved: {
    type: Boolean,
    default: false
  }
});
