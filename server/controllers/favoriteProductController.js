const FavoriteProduct = require("../models/FavoriteProduct");
const Product = require("../models/Product");

// Add to favorites
exports.addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if already favorited
    const alreadyFavorited = await FavoriteProduct.findOne({
      user: req.user._id,
      product: productId,
    });

    if (alreadyFavorited) {
      return res.status(400).json({ message: "Product already in favorites" });
    }

    // Add to favorites
    const favorite = new FavoriteProduct({
      user: req.user._id,
      product: productId,
    });

    await favorite.save();
    res.status(201).json({ message: "Product added to favorites", favorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get favorites of logged-in user
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await FavoriteProduct.find({ user: req.user._id }).populate("product");
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const favorite = await FavoriteProduct.findById(req.params.id);

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    // Ensure user owns the favorite
    if (favorite.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await favorite.deleteOne();
    res.status(200).json({ message: "Product removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
