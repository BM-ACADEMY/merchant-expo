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
//       className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10"
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
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { id: 1, color: "bg-green-500" },
  { id: 2, color: "bg-red-500" },
  { id: 3, color: "bg-orange-500" },
  { id: 4, color: "bg-blue-500" },
  { id: 5, color: "bg-purple-500" },
];

export default function SellerFAQ() {
  useEffect(() => {
    gsap.utils.toArray(".card").forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: "100%" },
        {
          opacity: 1,
          y: "0%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top center",
            end: "top center",
            scrub: true,
            pin: true,
            pinSpacing: false,
          },
        }
      );
    });
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {cards.map(({ id, color }) => (
        <div
          key={id}
          className={`card ${color} flex justify-center items-center h-screen w-full absolute top-0 left-0`}
        >
          <h1 className="text-white text-4xl font-bold">Section {id}</h1>
        </div>
      ))}
    </section>
  );
}

