import mongoose, { ConnectOptions } from 'mongoose';

import {
  createTopics,
  listAllTopics,
} from './kafka';
import { TOPIC } from './types/topics';

export function setupDatabase() {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true} as ConnectOptions);        
}

export async function setupKafkaTopics() {
  const topics = Object.values(TOPIC)
  
  const kafkaTopics = await listAllTopics()
  const missingTopics = topics.filter(topic => !kafkaTopics.includes(topic))
  if(missingTopics.length){
    await createTopics(missingTopics)
    console.log('Created Topics', missingTopics)
  }

  console.log('All Topics', [...kafkaTopics, ...missingTopics])
  
}