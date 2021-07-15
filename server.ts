import express from 'express';
import { getHandler } from './handlers/get';
import { postHandler } from './handlers/post';
import { getImage } from './handlers/getImage';
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: true }));
app.get('/list/dog/images', getHandler);
app.get('/images/:filename', getImage);
app.post('/upload/dog/image', postHandler);
app.listen(PORT, () => console.log(`Server started at ${PORT}!`));