import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { router as commentRoutes } from './routes/comment-routes';
import {
  setupDatabase,
  setupKafka,
} from './serverSetup';

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );


app.use('/comments', commentRoutes)

// start the Express server
app.listen( process.env.PORT, async () => {
	setupDatabase()

	await setupKafka()

console.log( `server started at http://localhost:${process.env.PORT}` );
});