const mongoose = require('mongoose')

const Schema = mongoose.Schema

const flowerSchema = new Schema({
    genus: {
      type: String,
      required: [true, 'must include flower genus'],
    },
    family: {
      type: String,
      required: [true, 'must include flower family'],
    },
    description: {
      type: String,
      required: [true, 'must include flower description'],
    },
    imageCover: {
      type: String,
      required: [true, 'must include flower image'],
    }
  }, { timestamps: true })
  
  module.exports = mongoose.model('flower', flowerSchema)