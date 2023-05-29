const express = require('express')
const {
  getFlowers,
  getFlower,
  createFlower,
  deleteFlower,
  updateFlower
} = require('../controllers/flowerController')

const router = express.Router()

// GET all Flowers
router.get('/', getFlowers)

// GET a single Flower
router.get('/:id', getFlower)

// POST a new Flower
router.post('/', createFlower)

// // DELETE a Flower
router.delete('/:id', deleteFlower)

// UPDATE a Flower
router.patch('/:id', updateFlower)

module.exports = router