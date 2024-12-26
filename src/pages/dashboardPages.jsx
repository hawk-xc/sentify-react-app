import NavbarSectionPart from "../particles/NavbarSectionPart";
import SentimentPages from "./SentimentPages";
import HomePages from "./HomePages";
import { useState, useEffect } from "react";

const DashboardPages = () => {
  const pages = ["dashboard", "profile", "sentiment", "tags"];

  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return pages.includes(storedPage) ? storedPage : "dashboard"; // Fallback
  });

  useEffect(() => {
    console.log("Saving to localStorage:", page);
    localStorage.setItem("currentPage", page);
  }, [page]);

  const renderContent = () => {
    switch (page) {
      case "profile":
        return <div>Your Profile Details</div>;
      case "sentiment":
        return <SentimentPages />;
      case "tags":
        return <div>Your Tags</div>;
      case "dashboard":
        return <HomePages />;
      default:
        return <div>Page Not Found</div>; // Fallback page
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 font-figtree">
      <NavbarSectionPart pages={pages} setPage={setPage} page={page} />
      <div className="max-sm:p-5 md:px-56">{renderContent()}</div>
    </div>
  );
};

export default DashboardPages;
