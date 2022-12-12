
import express, { Express, Request, Response } from 'express';
import { Phone } from './types';
import cors from 'cors';
import path from 'path';
import phones from '../data/phones.json';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 4002;

const SortBy = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
};

const app: Express = express();

app.use(cors());

app.use('/', (req, res, next) => {

  next();


  app.use(express.json());

  app.use(express.static('./public/'));

  app.use('/static', express.static(path.join(__dirname, '../public')));

  app.get('/phones', (req: Request, res: Response) => {
    const { _limit, _page, _sort } = req.query;
    const limit = Number(_limit);
    const page = Number(_page);
    const sort = _sort as keyof typeof SortBy;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const resultPhones = phones.slice(startIndex, endIndex);
    res.statusCode = 200;
    res.send({
      items: resultPhones,
      dataLength: phones.length,
      itemsInCart: phones.filter((phone) => phone.inCart),
      itemsLiked: phones.filter((phone) => phone.liked),
    });
  });

  app.get('/phones/new', (req: Request, res: Response) => {
    const newPhones = [...phones]
      .sort((a: { year: number }, b: { year: number }) => b.year - a.year)
      .slice(0, 10);

    res.statusCode = 200;
    res.send(newPhones);
  });

  app.get('/phones/discount', (req: Request, res: Response) => {
    const discountPhones = [...phones]
      .sort(
        (
          a: { fullPrice: number; price: number },
          b: { fullPrice: number; price: number }
        ) => b.fullPrice - b.price - (a.fullPrice - a.price)
      )
      .slice(0, 10);

    res.statusCode = 200;
    res.send(discountPhones);
  });

  app.put('/phones/update/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { liked, inCart } = req.body;
    const phone = phones.find((phone) => +phone.id === +id);

    if (phone) {
      phone.liked = liked;
      phone.inCart = inCart;
      res.statusCode = 200;
      res.send(phone);
    } else {
      res.statusCode = 404;
      res.send('Not found');
    }
  });
});

app.listen(PORT, () => {
  // open(`http://localhost:${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
