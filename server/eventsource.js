import express from 'express';
import cors from 'cors';
import events from 'events';

const app = express();
const PORT = 4001;
const emitter = new events.EventEmitter();

app.use(cors());
app.use(express.json());


app.get('/connect', (req, res) => {
    try {
        res.writeHead(200, {
            'connection': 'keep-alive',
            'content-type': 'text/event-stream',
            'cache-control': 'no-cache',
        })
        emitter.on('newMessage', (message) => {
            res.write(`data: ${JSON.stringify(message)} \n\n`);
        })
    } catch(e) {
        console.log(e);
    }
})

app.post('/new-message', (req, res) => {
    try {
        const message = req.body;
        console.log('Отправили сообщение');
        emitter.emit('newMessage', message);
        res.status(200);
    } catch(e) {
        console.log(e);
    }
})

app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту`));