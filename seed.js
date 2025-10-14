const mongoose = require('mongoose');
const Product = require('./models/Product'); // переконайся, що шлях правильний
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const products = [
  {
    title: 'Макаронси',
    description: 'Ніжні французькі тістечка з повітряною начинкою.',
    category: 'French dessert',
    price: 230,
    promotion: false,
    discountPercent: 0,
    image: 'macaron.jpeg'
  },
  {
    title: 'Тирамісу',
    description: 'Класичний італійський десерт із ніжним кремом та ароматом кави.',
    category: 'Italian dessert',
    price: 230,
    promotion: false,
    discountPercent: 0,
    image: 'tiramisu.jpeg'
  },
  {
    title: 'Снікерс',
    description: 'Насичений шоколадний торт із карамеллю та горіхами.',
    category: 'cake',
    price: 230,
    promotion: false,
    discountPercent: 0,
    image: 'snikers.jpeg'
  },
  {
    title: 'Чизкейк',
    description: 'Кремовий десерт із вершкового сиру.',
    category: 'Chees cake',
    price: 230,
    promotion: false,
    discountPercent: 0,
    image: 'cheescake.jpeg'
  },
  {
    title: 'Шоколадний кекс',
    description: 'М’які, ароматні та насичені смаком шоколаду.',
    category: 'Mafin',
    price: 230,
    promotion: false,
    discountPercent: 0,
    image: 'mafin.jpeg'
  },
  {
    title: 'Тарталетка',
    description: 'Повітряний десерт із ніжними шарами та делікатним смаком.',
    category: 'Mini Pastries',
    price: 230,
    promotion: false,
    discountPercent: 0,
    image: 'tartaletka.jpeg'
  }
];

Product.insertMany(products)
  .then(() => {
    console.log('6 Products added successfully!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));