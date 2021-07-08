import express from 'express';
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ strict: true }));
app.get('/list/dog/images', (req, res) => res.send('Hello from Express + Typescript!'));
app.post('/upload/dog/image', (req, res) => console.log(req.body));
app.listen(PORT, () => console.log(`Server started at ${PORT}!`));