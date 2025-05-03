// controllers/faqQuestionController.js
const FaqQuestion = require('../models/faqQuestionModel');

// Create a new FAQ question
exports.createFaqQuestion = async (req, res) => {
  try {
    const newQuestion = await FaqQuestion.create({
      ...req.body,
      askedBy: req.user?._id, // Optional: if user is logged in
    });
    res.status(201).json({ success: true,message:"Questions Created Successfully", data: newQuestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all FAQ questions (optional filter by topic, role, published)
exports.getAllFaqQuestions = async (req, res) => {
  try {
    const { topicId, role, isPublished } = req.query;
    const filter = {};
    if (topicId) filter.topicId = topicId;
    if (role) filter.role = role;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';

    const questions = await FaqQuestion.find(filter)
      .populate('topicId', 'title')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, message:"Fetched Questions Successfully", data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single FAQ question by ID
exports.getFaqQuestionById = async (req, res) => {
  try {
    const question = await FaqQuestion.findById(req.params.id).populate('topicId', 'title');
    if (!question) {
      return res.status(404).json({ success: false, message: 'FAQ question not found' });
    }
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a FAQ question (e.g., answer or publish it)
exports.updateFaqQuestion = async (req, res) => {
  try {
    const updated = await FaqQuestion.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        answeredBy: req.body.answer ? req.user?._id : undefined,
        answeredAt: req.body.answer ? new Date() : undefined,
      },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'FAQ question not found' });
    }
    res.status(200).json({ success: true,message:"Questions Updated Successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a FAQ question
exports.deleteFaqQuestion = async (req, res) => {
  try {
    const deleted = await FaqQuestion.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'FAQ question not found' });
    }
    res.status(200).json({ success: true, message: 'FAQ question deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getBuyerFaqs = async (req, res) => {
  try {
    const questions = await FaqQuestion.find({
      role: { $in: ["buyer", "both"] },
      answer: { $ne: "" },
      isPublished: true
    })
      .populate("topicId", "title")
      .sort({ createdAt: -1 });

    const groupedFaqs = groupByTopic(questions);

    res.status(200).json({ success: true, message: "Buyer FAQs fetched", data: groupedFaqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSellerFaqs = async (req, res) => {
  try {
    const questions = await FaqQuestion.find({
      role: { $in: ["seller", "both"] },
      answer: { $ne: "" },
      isPublished: true
    })
      .populate("topicId", "title")
      .sort({ createdAt: -1 });

    const groupedFaqs = groupByTopic(questions);

    res.status(200).json({ success: true, message: "Seller FAQs fetched", data: groupedFaqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper function
function groupByTopic(questions) {
  const faqMap = {};
  questions.forEach(({ topicId, question, answer }) => {
    if (!faqMap[topicId.title]) faqMap[topicId.title] = [];
    faqMap[topicId.title].push({ question, answer });
  });
  return faqMap;
}