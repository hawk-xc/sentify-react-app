import { useState } from "react";

const ExpandableText = ({ text, maxWords = 10 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => setIsExpanded(!isExpanded);

  // Split teks menjadi array kata
  const words = text.split(" ");

  // Jika jumlah kata kurang dari atau sama dengan maxWords, tampilkan teks apa adanya
  if (words.length <= maxWords) {
    return <p className="text-gray-800">{text}</p>;
  }

  // Jika lebih dari maxWords, tampilkan teks yang dipotong atau teks penuh
  const truncatedText = words.slice(0, maxWords).join(" ") + " ...";

  return (
    <div>
      <p className="text-gray-800">
        {isExpanded ? text : truncatedText}
      </p>
      <button
        className="mt-2 text-blue-500 hover:underline"
        onClick={toggleText}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default ExpandableText;
