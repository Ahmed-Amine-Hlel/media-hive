import express, {Application} from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import {connectDatabase} from "./config/mongo.config";
import userRoutes from './routes/user/user.route';
import movieRoutes from './routes/movie/movie.route';
import actorRoutes from './routes/actor/actor.route';
import watchedListRoutes from './routes/watchedList/watchedList.route';

dotenv.config();


const app: Application = express();
const PORT = process.env.PORT || 3701;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


app.use('/api', userRoutes);
app.use('/api/movie', movieRoutes)
app.use('/api/actor', actorRoutes);
app.use('/api/watched-list', watchedListRoutes)

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Error starting server:', error);
    process.exit(1);
});