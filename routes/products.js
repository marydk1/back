const express = require('express');
const Product = require('../models/Product');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get one product by ID
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
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const { title, description, price, image, promotion, discountPercent } = req.body;

    //  Серверна валідація
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Поле "Заголовок" є обовʼязковим' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Поле "Опис" є обовʼязковим' });
    }
    if (!price || price <= 0) {
      return res.status(400).json({ message: 'Поле "Ціна" має бути більше 0' });
    }
    if (!image || !image.trim()) {
      return res.status(400).json({ message: 'Поле "URL картинки" є обовʼязковим' });
    }

    const p = new Product({ title, description, price, image, promotion, discountPercent });
    await p.save();
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера при створенні товару' });
  }
});

// Admin: update
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const { title, description, price, image, promotion, discountPercent } = req.body;

    // 🔹 Серверна валідація при оновленні
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Поле "Заголовок" є обовʼязковим' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Поле "Опис" є обовʼязковим' });
    }
    if (!price || price <= 0) {
      return res.status(400).json({ message: 'Поле "Ціна" має бути більше 0' });
    }
    if (!image || !image.trim()) {
      return res.status(400).json({ message: 'Поле "URL картинки" є обовʼязковим' });
    }

    const p = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, price, image, promotion, discountPercent },
      { new: true }
    );

    if (!p) return res.status(404).json({ message: 'Товар не знайдено' });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера при оновленні товару' });
  }
});

// Admin: delete
router.delete('/:id', auth, adminOnly, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;