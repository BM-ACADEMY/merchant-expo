import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const topics = [
  "Getting Started",
  "My Account Dashboard",
  "Add / Edit Business Profile",
  "Inquiry Management",
  "Add / Update Products",
];

const Sidebar = ({ selectedTopic, setSelectedTopic }) => {
  return (
    <div className="w-64 bg-white p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4 flex justify-center underline">SELLER'S HELP CENTER</h2>
      <div className="flex flex-col gap-2">
        {topics.map((topic, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "text-left w-full cursor-pointer",
              selectedTopic === topic ? "bg-[#e03733] text-white" : "text-gray-500"
            )}
            onClick={() => setSelectedTopic(topic)}
          >
            {topic}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
