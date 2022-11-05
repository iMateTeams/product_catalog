const express = require('express');
const fs = require('fs');
//const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 4002;

const app = express();

app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();

  app.use(cors());

  app.use(express.json());

  app.use(express.static('./public/'));

  app.patch('/phones/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const phones = JSON.parse(fs.readFileSync('./data/phones.json', 'utf-8'));
    const phone = phones.find((phone) => phone.id === id);

    console.log(data);

    if (phone && Object.prototype.hasOwnProperty.call(data, 'inCart')) {
      console.log(data);
      phone.inCart = data.inCart;
      fs.writeFileSync('./data/phones.json', JSON.stringify(phones));
      res.status(200).json(phone);
    }

    if (phone && Object.prototype.hasOwnProperty.call(data, 'liked')) {
      console.log(data);
      phone.liked = data;
      fs.writeFileSync('./data/phones.json', JSON.stringify(phones));
      res.status(200).json(phone);
    } else {
      res.status(404).json({ message: 'Phone not found' });
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
