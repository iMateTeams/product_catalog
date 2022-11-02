const express = require('express');
const fs = require('fs');
//const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const app = express();

app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();

  app.use(cors());

  app.use(express.static('./public/'));
  
  app.get('/products', (req, res) => {
    const phones = fs.readFileSync('./data/phones.json', 'utf-8');
  
    res.statusCode = 200;
  
    res.send(JSON.parse(phones));
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
