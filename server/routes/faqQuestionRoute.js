// routes/faqQuestionRoutes.js
const express = require('express');
const router = express.Router();
const {
  createFaqQuestion,
  getAllFaqQuestions,
  getFaqQuestionById,
  updateFaqQuestion,
  deleteFaqQuestion,
  getSellerFaqs,
  getBuyerFaqs
} = require('../controllers/faqQuestionController');

// Public or protected depending on auth
router.get('/fetch-all-faq-questions', getAllFaqQuestions);

router.get('/fetch-all-faq-questions-for-seller', getSellerFaqs);
router.get('/fetch-all-faq-questions-for-buyer', getBuyerFaqs);

router.get('/fetch-all-faq-questions-by-id/:id', getFaqQuestionById);
router.post('/create-faq-question', createFaqQuestion);
router.put('/update-faq-questions/:id', updateFaqQuestion);
router.delete('/delete-faq-questions/:id', deleteFaqQuestion);

module.exports = router;
