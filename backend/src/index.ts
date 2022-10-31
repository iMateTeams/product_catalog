const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  res.send('product catalog');
});

app.listen(4000);
