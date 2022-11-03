const express = require('express');
const fs = require('fs');
//const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 4001;

const app = express();

app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();

  app.use(cors());

  app.use(express.static('./public/'));

  // update and add inCart property to product in phones.json

  app.use('/phones/:id', (req, res) => {
    const id = req.params.id;
    const phones = JSON.parse(fs.readFileSync('./data/phones.json', 'utf8'));
    const phone = phones.find((p) => p.id === id);
    const index = phones.indexOf(phone);

    if (phone) {
      if (phones[index]) {
        phones[index].inCart = !phones[index].inCart;
      } else {
        phones[index].inCart = true;
      }

      fs.writeFileSync('./data/phones.json', JSON.stringify(phones));
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  });


  app.get('/products', (req, res) => {
    const numberOfItems = req.query._limit;
    const currentPage = req.query._page;
    const phones = fs.readFileSync('./data/phones.json', 'utf-8');
  
    res.statusCode = 200;

    res.send({
      items: JSON.parse(phones).splice((currentPage - 1) * numberOfItems, numberOfItems),
      dataLength: JSON.parse(phones).length
    });
    
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
