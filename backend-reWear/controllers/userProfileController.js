import Product from '../models/Product.js';


export const getUserProductUpload = async (req, res) => {
  try {

    const userId = req.user._id;


    const products = await Product.find({ owner: userId })
      .select('-__v')
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        points: req.user.points
      },
      products: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


export const getPurchasedProducts = async (req, res) => {
  try {
    const userId = req.user._id;

    const purchasedProducts = await Product.find({
      owner: userId,
      status: 'swapped'
    })
    .sort({ createdAt: -1 })
    .select('-__v');

    res.status(200).json({
      success: true,
      count: purchasedProducts.length,
      data: purchasedProducts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching purchases',
      error: error.message
    });
  }
};