import mongoose from 'mongoose';

const flowerSchema = new mongoose.Schema({
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
    price: {
      type: Number,
      required: [true, 'must include flower price'],
    },
    imageCover: {
      type: String,
      required: [true, 'must include flower image'],
    }
  }, { timestamps: true })
  
  const Flower = mongoose.model('Flower', flowerSchema);

  export default Flower;