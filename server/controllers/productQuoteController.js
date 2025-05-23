const ProductQuote = require('../models/productQuoteModel');
const Product = require('../models/productModel');

// Create a new quote
exports.createQuote = async (req, res) => {
  try {
    const { productId, quantity, unit, phoneNumber, matchQuotes, userId } = req.body;

    // Find the product to get ownerId
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newQuote = new ProductQuote({
      productId,
      quantity,
      unit,
      phoneNumber,
      matchQuotes,
      userId,
      productOwnerId: product.seller_id,
    });

    await newQuote.save();

    res.status(201).json({success:true, message: 'Quote created successfully', quote: newQuote });
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({success:false, message: 'Server error' });
  }
};

// Get all quotes (optionally filter by productOwnerId)
exports.getQuotes = async (req, res) => {
  try {
    // Optional filter: get quotes only for a product owner
    const { ownerId } = req.query;

    let filter = {};
    if (ownerId) {
      filter.productOwnerId = ownerId;
    }

    const quotes = await ProductQuote.find(filter)
      .populate('productId', 'name')  // populate product name if you want
      .populate('userId', 'name email'); // populate user info if needed

    res.status(200).json({
        success:true,
        message:"Fetch All Quotes Successfully",
        quote:quotes
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({success:false, message: 'Server error' });
  }
};

// Get single quote by ID
exports.getQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await ProductQuote.findById(id)
      .populate('productId', 'name')
      .populate('userId', 'name email');

    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    res.status(200).json({
        success:true,
        message:"Fetch Quotes Successfully",
        quote:quote
    });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({success:false, message: 'Server error' });
  }
};

// Update quote by ID
exports.updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const quote = await ProductQuote.findByIdAndUpdate(id, updateData, { new: true });

    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    res.status(200).json({success:true, message: 'Quote updated successfully', quote });
  } catch (error) {
    console.error('Error updating quote:', error);
    res.status(500).json({success:false, message: 'Server error' });
  }
};

// Delete quote by ID
exports.deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await ProductQuote.findByIdAndDelete(id);

    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    res.status(200).json({success:true, message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Error deleting quote:', error);
    res.status(500).json({success:false, message: 'Server error' });
  }
};
