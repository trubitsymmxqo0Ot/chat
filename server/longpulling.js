import express from 'express';
import events from 'events';
import cors from 'cors';


const PORT = 4000;
const app = express();
const emitter = new events.EventEmitter();

app.use(cors());
app.use(express.json());

app.get('/get-messages', (req, res) => {
    console.log('Был запрос');
    emitter.once('newMessage', (message) => {
        res.json(message);
    })
});

app.post('/new-messages', (req, res) => {
    try {
        const message = req.body;
        emitter.emit('newMessage', message);
        res.status(200);
    } catch(e) {
        console.log(e);
    }
});

app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`));