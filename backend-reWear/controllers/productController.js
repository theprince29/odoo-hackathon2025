import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import multer from 'multer';

// Configure Multer - allows multiple files with field name 'images'
export const upload = multer({ storage: multer.memoryStorage() }).array('images', 10); // Max 10 images

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'reWear/products',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Helper function to delete from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags, pointsValue } = req.body;
    const userId = req.user._id;

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one image is required' });
    }

    // Upload images to Cloudinary
    const imageUploadPromises = req.files.map(file => 
      uploadToCloudinary(file.buffer)
    );

    const uploadedImages = await Promise.all(imageUploadPromises);

    // Create new product
    const newProduct = new Product({
      title,
      description,
      category,
      type,
      size,
      condition,
      tags: tags.split(',').map(tag => tag.trim()),
      pointsValue,
      images: uploadedImages.map(img => ({
        url: img.secure_url,
        public_id: img.public_id
      })),
      owner: userId
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (owner or admin)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, type, size, condition, tags, pointsValue } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.owner.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
    }

    // Update product fields
    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.type = type || product.type;
    product.size = size || product.size;
    product.condition = condition || product.condition;
    product.tags = tags ? tags.split(',').map(tag => tag.trim()) : product.tags;
    product.pointsValue = pointsValue || product.pointsValue;

    // Handle image updates if new files are uploaded
    if (req.files && req.files.length > 0) {
      // Upload new images
      const imageUploadPromises = req.files.map(file => 
        uploadToCloudinary(file.buffer)
      );
      const uploadedImages = await Promise.all(imageUploadPromises);
      
      // Delete old images from Cloudinary
      const deletePromises = product.images.map(img => 
        deleteFromCloudinary(img.public_id)
      );
      await Promise.all(deletePromises);
      
      // Update with new images
      product.images = uploadedImages.map(img => ({
        url: img.secure_url,
        public_id: img.public_id
      }));
    }

    await product.save();

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if the user is the owner or admin
    if (product.owner.toString() !== userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this product' });
    }

    // Delete images from Cloudinary
    const deletePromises = product.images.map(img => 
      deleteFromCloudinary(img.public_id)
    );
    await Promise.all(deletePromises);

    // Delete product from database
    await product.remove();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};



export const getAllProducts = async (req, res) => {
  try {
   

    const products = await Product.find().populate('owner', 'name email');

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


export const updateApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

   

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid approval status' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.approvalStatus = status;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${status}`,
      data: product
    });
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating approval status',
      error: error.message
    });
  }
};




export const updateProductApprovalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 



    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.approvalStatus = status;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${status} successfully`,
      data: product
    });
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
