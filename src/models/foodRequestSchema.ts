import mongoose from "mongoose"

const FoodRequestSchema = new mongoose.Schema({
  cart: [
    {
      id: String,
      name: String,
      price: Number,
      count: Number
    }
  ],
  total: Number,
  comments: String,
  createdAt: {
    type:Date,
    default: new Date
  }
});

export default mongoose.model('foodRequest', FoodRequestSchema)