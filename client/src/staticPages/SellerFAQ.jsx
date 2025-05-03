// import { useState } from "react";
// import { motion } from "framer-motion";
// import Sidebar from "./helpers/SellerFAQsidebar";
// import FAQContent from "./helpers/SellerFAQcontent";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// const SellerFAQ = () => {
//   const [selectedTopic, setSelectedTopic] = useState("Getting Started");
//   const topics = [
//     "Getting Started",
//     "My Account Dashboard",
//     "Add / Edit Business Profile",
//     "Inquiry Management",
//     "Add / Update Products",
//   ];

//   return (
//     <motion.div
//       className="min-h-screen  p-4 sm:p-6 md:p-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* Mobile Dropdown for Sidebar */}
//       <motion.div
//         className="sm:hidden mb-4"
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <Select value={selectedTopic} onValueChange={setSelectedTopic}>
//           <SelectTrigger className="w-full bg-white shadow-md p-3 rounded-md hover:shadow-lg transition-all">
//             <SelectValue placeholder="Select a topic" />
//           </SelectTrigger>
//           <SelectContent>
//             {topics.map((topic, index) => (
//               <SelectItem key={index} value={topic} className="hover:bg-gray-200 transition-all">
//                 {topic}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </motion.div>

//       {/* Layout for Desktop & Tablet */}
//       <div className="flex flex-col sm:flex-row gap-6">
//         {/* Sidebar (Visible on Tablet & Desktop) */}
//         <motion.div
//           className="hidden sm:block w-64"
//           initial={{ x: -30, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Sidebar selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
//         </motion.div>

//         {/* FAQ Content (Animated on Change) */}
//         <motion.div
//           key={selectedTopic} // Helps re-render animations when topic changes
//           className="flex-1"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//         >
//           <FAQContent selectedTopic={selectedTopic} />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default SellerFAQ;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "./helpers/SellerFAQsidebar";
import FAQContent from "./helpers/SellerFAQcontent";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetFaqQuestionsForSellerQuery } from "@/redux/api/FAQapi";

const SellerFAQ = () => {
  const { data:response, isLoading, error } = useGetFaqQuestionsForSellerQuery();
  const topics = response?.data ? Object.keys(response?.data) : [];
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    if (topics.length && !selectedTopic) {
      setSelectedTopic(topics[0]);
    }
  }, [topics]);

  return (
    <motion.div className="min-h-screen p-4 sm:p-6 md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Mobile Dropdown */}
      <motion.div className="sm:hidden mb-4" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger className="w-full bg-white shadow-md p-3 rounded-md hover:shadow-lg transition-all">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic, index) => (
              <SelectItem key={index} value={topic}>{topic}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar for desktop */}
        <motion.div className="hidden sm:block w-64" initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Sidebar topics={topics} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />
        </motion.div>

        {/* FAQ Content */}
        <motion.div key={selectedTopic} className="flex-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {isLoading ? (
            <p>Loading FAQs...</p>
          ) : error ? (
            <p>Failed to load FAQ content.</p>
          ) : (
            <FAQContent selectedTopic={selectedTopic} faqs={response?.data[selectedTopic]} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SellerFAQ;
