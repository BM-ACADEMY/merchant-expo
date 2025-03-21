import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqData = {
  "Getting Started": [
    { question: "Who can sell on ExportersIndia?", answer: "Anyone who meets our criteria." },
    { question: "What details are required for registration?", answer: "Basic company details." },
    { question: "What are the benefits of registering?", answer: "Increased visibility and leads." },
    { question: "How does ExportersIndia help in business growth?", answer: "By providing a marketplace." },
    { question: "How much is the registration fee?", answer: "Basic registration is free." },
  ],
  "My Account Dashboard": [
    { question: "How do I update my profile?", answer: "Go to settings and edit your profile." },
    { question: "How do I change my password?", answer: "Use the 'Change Password' option." },
    { question: "Where can I see my orders?", answer: "In the 'Orders' section." },
    { question: "How do I update my email?", answer: "Update it under 'Account Settings'." },
    { question: "How can I delete my account?", answer: "Contact customer support." },
  ],
  "Add / Edit Business Profile": [
    { question: "How do I add a business profile?", answer: "Go to 'Profile' and click 'Add'." },
    { question: "Can I edit my business details?", answer: "Yes, under 'Profile Settings'." },
    { question: "How do I upload my logo?", answer: "Use the 'Upload Logo' option." },
    { question: "Where can I update my business category?", answer: "Under 'Business Settings'." },
    { question: "Can I add multiple businesses?", answer: "Yes, in the 'Manage Businesses' tab." },
  ],
  "Inquiry Management": [
    { question: "How do I manage inquiries?", answer: "Use the 'Inquiries' tab." },
    { question: "Can I filter inquiries?", answer: "Yes, by date and category." },
    { question: "How do I respond to an inquiry?", answer: "Click 'Reply' on the inquiry." },
    { question: "Where can I see pending inquiries?", answer: "Under 'Pending' section." },
    { question: "Can I export inquiries?", answer: "Yes, download them as CSV." },
  ],
  "Add / Update Products": [
    { question: "How do I add a product?", answer: "Click 'Add Product' in the dashboard." },
    { question: "Can I edit product details?", answer: "Yes, go to 'My Products'." },
    { question: "How do I set product pricing?", answer: "Use the 'Pricing' section." },
    { question: "Where do I upload product images?", answer: "Under 'Product Gallery'." },
    { question: "Can I delete a product?", answer: "Yes, using the 'Delete' button." },
  ],
};

const FAQContent = ({ selectedTopic }) => {
  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-[#1C1B1F] bg-gradient-to-r from-blue-600 to-purple-600  bg-clip-text">
        {selectedTopic}
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqData[selectedTopic]?.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <AccordionTrigger className="p-4 text-lg font-medium cursor-pointer flex justify-between items-center hover:text-blue-600 transition-all duration-300">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="p-4 text-gray-600 bg-gray-50 rounded-b-lg">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQContent;
