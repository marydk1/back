const express = require('express');
const Product = require('../models/Product');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Get all products
router.get('/', async (req,res) => {
  const products = await Product.find();
  res.json(products);
});

// 🟢 Get one product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Товар не знайдено' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Admin: create product
router.post('/', auth, adminOnly, async (req,res) => {
  const p = new Product(req.body);
  await p.save();
  res.json(p);
});

// Admin: update
router.put('/:id', auth, adminOnly, async (req,res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(p);
});

// Admin: delete
router.delete('/:id', auth, adminOnly, async (req,res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({message:'Deleted'});
});

module.exports = router;
