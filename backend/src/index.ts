const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 4002;

const app = express();

const SortBy = {
  age :'Newest',
  title :'Alphabetically',
  price :'Cheapest',
};

app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();

  app.use(cors());

  app.use(express.json());

  app.use(express.static('./public/'));

  app.patch('/products/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const phones = JSON.parse(fs.readFileSync('./data/phones.json', 'utf-8'));
    const phone = phones.find((phone) => phone.id === id);

    if (phone && Object.prototype.hasOwnProperty.call(data, 'inCart')) {
      phone.inCart = data.inCart;
      fs.writeFileSync('./data/phones.json', JSON.stringify(phones));
      res.status(200).json(phone);
    }

    if (phone && Object.prototype.hasOwnProperty.call(data, 'count')) {
      phone.count = data.count;
      fs.writeFileSync('./data/phones.json', JSON.stringify(phones));
      res.status(200).json(phone);
    }

    if (phone && Object.prototype.hasOwnProperty.call(data, 'liked')) {
      phone.liked = data.liked;
      fs.writeFileSync('./data/phones.json', JSON.stringify(phones));
      res.status(200).json(phone);
    } else {
      res.status(404).json({ message: 'Phone not found' });
    }
  });

  app.get('/products', (req, res) => {
    const numberOfItems = req.query._limit;
    const currentPage = req.query._page;
    const sortBy = req.query._sort;
    let phones = JSON.parse(fs.readFileSync('./data/phones.json', 'utf-8'));
    // console.log([...phones].sort((prod1,prod2) => prod1.year - prod2.year));

    switch (sortBy) {
    case SortBy.age :
      phones = [...phones].sort((prod1,prod2) => prod2.year - prod1.year);
      break;
    case SortBy.title :
      phones = [...phones].sort((prod1,prod2) => (prod1.title - prod2.title));
      break;
    case SortBy.price :
      phones = [...phones].sort((prod1,prod2) => prod1.price- prod2.price);
      break;
    default:
      0;
    }

    const items = [...phones].splice((currentPage - 1) * numberOfItems, numberOfItems * currentPage);
  
    res.statusCode = 200;

    res.send({
      items: items,
      dataLength: phones.length,
      itemsInCart:[...phones].filter(phone => phone.inCart === true),
      itemsFavor:[...phones].filter(phone => phone.liked === true),
    });
    
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
