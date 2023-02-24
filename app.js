import express from 'express';
import indexRoutes from './routes/siteRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 3000

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false, limit: '30mb'})) // to parse form data application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '30mb'})) // to parse application/json head data

app.use(indexRoutes);

app.listen(PORT, ()=> console.log(`Running on PORT: ${PORT}`));
