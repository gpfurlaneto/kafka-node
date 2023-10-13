import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { router as postRoutes } from './routes/post-routes';
import {
  setupDatabase,
  setupKafkaTopics,
} from './serverSetup';

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );


app.use('/posts', postRoutes)

// start the Express server
app.listen( process.env.PORT, async () => {
	setupDatabase()

	await setupKafkaTopics()

console.log( `server started at http://localhost:${process.env.PORT}` );
});