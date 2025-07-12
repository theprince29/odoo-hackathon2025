import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['men', 'women', 'kids', 'unisex']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['top', 'bottom', 'dress', 'outerwear', 'footwear', 'accessory']
  },
  size: {
    type: String,
    required: [true, 'Size is required']
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['new', 'like_new', 'good', 'fair', 'poor']
  },
  tags: {
    type: [String],
    default: []
  },
  images: [
    {
      url: String,
      public_id: String
    }
  ],
  pointsValue: {
    type: Number,
    required: true,
    min: [1, 'Points value must be at least 1']
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'swapped'],
    default: 'available'
  },
  approvalStatus: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending'
},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;