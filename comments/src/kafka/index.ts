import { Kafka } from 'kafkajs';
import { TOPIC } from 'src/types/topics';

export async function listAllTopics() {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: ['localhost:9092','localhost:9092']
  })

  const admin = kafka.admin()
  await admin.connect()
  
  const allTopics = await admin.listTopics()
  await admin.disconnect()
  return allTopics
}

export async function createTopics(topics: string[]){
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: ['localhost:9092','localhost:9092']
  })

  const admin = kafka.admin()
  await admin.connect()
  await admin.createTopics({
    topics: topics.map(topic => ({
      topic
    }))
  })
  admin.disconnect()
}

export async function produceMessage(topic: string, message: any){
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: ['localhost:9092','localhost:9092']
  })

  const producer = kafka.producer()

  await producer.connect()
  const result = await producer.send({
    topic,
    messages: [
      { value: JSON.stringify(message)}
    ]
  })
  console.log({ 
    message,
    result
  })
}

export async function startConsumer(topics: TOPIC[]) {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: ['localhost:9092','localhost:9092']
  })
  const consumer = kafka.consumer({ groupId: 'comments-api' })
  await consumer.connect()
  await consumer.subscribe({ topics, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      
    },
  })
}