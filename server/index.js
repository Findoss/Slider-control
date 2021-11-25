const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(helmet());
app.disable('x-powered-by');

const store = [
  {
    key: 0,
    docId: '0',
    clients: [],
    data: {},
    state: {}
  }
];

app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/', (req, res) => {
  res.json('asd');
});

app.post('/key', (req, res) => {
  console.log(req.body);
  res.json({ key: (Math.random() * 1000000).toFixed(0) });
});

app.listen(5010);
