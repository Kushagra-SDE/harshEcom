const express = require('express');
const News = require('../models/News');
const router = express.Router();

// Create news article
router.post('/', async (req, res) => {
  const { title, description, image } = req.body;
  try {
    const news = new News({
      title,
      description,
      image
    });
    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all news articles
router.get('/', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single news article by ID
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News article not found' });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a news article by ID
router.put('/:id', async (req, res) => {
  const { title, description, image } = req.body;
  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );
    if (!updatedNews) return res.status(404).json({ message: 'News article not found' });
    res.json(updatedNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a news article by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ message: 'News article not found' });
    res.json({ message: 'News article deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
