import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

import { router as postRoutes } from './routes/post-routes';

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );


app.use('/posts', postRoutes)

// start the Express server
app.listen( process.env.PORT, () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true} as ConnectOptions);        
    console.log( `server started at http://localhost:${process.env.PORT}` );
} );