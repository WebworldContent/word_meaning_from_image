import express from 'express';
import indexRoutes from './routes/siteRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser'
import path from 'path';
import url from 'url';

const PORT = process.env.PORT || 3000

const app = express();
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false, limit: '5mb'})) // to parse form data application/x-www-form-urlencoded
app.use(bodyParser.json({limit: '5mb'})) // to parse application/json head data
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoutes);

app.listen(PORT, ()=> console.log(`Running on PORT: ${PORT}`));
