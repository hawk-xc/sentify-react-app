import NavbarSectionPart from "../particles/NavbarSectionPart";
import SentimentPages from "./SentimentPages";
import { useState, useEffect } from "react";

const DashboardPages = () => {
  const pages = ["dashboard", "profile", "sentiment", "tags"];

  // Ambil halaman terakhir dari localStorage atau fallback ke "dashboard"
  const [page, setPage] = useState(
    () => localStorage.getItem("currentPage") || "dashboard"
  );

  // Simpan state `page` ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  const renderContent = () => {
    switch (page) {
      case pages[1]:
        return <div>Your Profile Details</div>;
      case pages[2]:
        return <SentimentPages />;
      case pages[3]:
        return <div>Your Tags</div>;
      default:
        return <div>Welcome to Home</div>;
    }
  };

  return (
    <div className="w-full h-full bg-slate-100">
      <NavbarSectionPart pages={pages} setPage={setPage} page={page} />
      <div className="max-sm:p-5 md:px-56">{renderContent()}</div>
    </div>
  );
};

export default DashboardPages;
