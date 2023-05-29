const Flower = require('../models/flowerModel')
const mongoose = require('mongoose')

// get all flowers
const getFlowers = async (req, res) => {
    const flowers = await Flower.find({}).sort({createdAt: -1})

  res.status(200).json(flowers)
}

// get a single flower
const getFlower = async (req, res) => {
    // const { genus } = req.params
    // try {
    //     const flower = await Flower.find({genus:[genus]})
    //     if (!flower) {
    //     return res.status(404).json({error: 'No such flower'})
    //     }

    //     res.status(200).json(flower) 
    //     } catch (err) {
    //     next(err);
    // }

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such flower'})
    }

    const flower = await Flower.findById(id)

    if (!flower) {
      return res.status(404).json({error: 'No such flower'})
    }

    res.status(200).json(flower)
}

// create a new flower
const createFlower = async (req, res) => {
  const {genus, family, description, price, imageCover } = req.body

  // add to the database
  try {
    const flower = await Flower.create({ genus, family, description, price, imageCover })
    res.status(200).json(flower)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a flower
const deleteFlower = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such flower'})
  }

  const flower = await Flower.findOneAndDelete({_id: id})

  if(!flower) {
    return res.status(400).json({error: 'No such flower'})
  }

  const resflower = await Flower.findById(id)

  res.status(200).json(resflower)
}

// update a flower
const updateFlower = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such flower'})
  }

  const flower = await Flower.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!flower) {
    return res.status(400).json({error: 'No such flower'})
  }

  const resflower = await Flower.findById(id)
  res.status(200).json(resflower)
}

module.exports = {
  getFlowers,
  getFlower,
  createFlower,
  deleteFlower,
  updateFlower
}