import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

//Specifying  the request body type 
app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(3333, () => function(){
    console.log("HTTP server running");
})