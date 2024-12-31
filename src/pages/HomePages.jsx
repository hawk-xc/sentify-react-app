import { useState, useEffect } from 'react';
import RoundedLineChart from "../particles/charts/RoundedLineChart";
import GaugeChart from "../particles/charts/GaugeChart";
import axiosClient from "../api/axiosClient";
import { SentimentSearchModal } from "../particles/Modals";

const HomePages = () => {
  const [dashboardData, setDashboardData] = useState([]);

  // list of sentiment in search 
  const [sentimentData, setSentimentData] = useState();

  const handleSearchSentiment = (e) => {
    const sentimentData = dashboardData.sentiment_data;
    const searchTerm = e.target.value;

    const filteredSentiments = sentimentData.filter((s) => s.sentiment_title && s.sentiment_title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filteredSentiments.length > 0) {
      setSentimentData(filteredSentiments);
      console.log(filteredSentiments);
    }
  }

  const dummyData = [
    { date: "2024-12-01", totalSentiment: 0 },
    { date: "2024-12-02", totalSentiment: 0 },
    { date: "2024-12-03", totalSentiment: 0 },
    { date: "2024-12-04", totalSentiment: 0 },
    { date: "2024-12-05", totalSentiment: 0 },
    { date: "2024-12-06", totalSentiment: 0 },
    { date: "2024-12-07", totalSentiment: 0 },
  ];

  const fetchDashboardData = async () => {
    try {
      const response = await axiosClient.get("/dashboard");

      const sentimentResponseGetDate = response.data.data.sentiments.map((item) => item.sentiment_created_at.slice(0, 10));

      const sentimentResponseGetDateGroupping = sentimentResponseGetDate.reduce((acc, date) => {
        const existingDate = acc.find((d) => d.date === date);
        existingDate ? existingDate.totalSentiment++ : acc.push({ date: date, totalSentiment: 1 });
        return acc;
      }, []);

      setDashboardData({
        sentiment_count: response.data.data.sentimentCount,
        total_comments: response.data.data.totalCommentsLimit,
        total_reactions: response.data.data.totalSentimentStatistics,
        sentiment_data: response.data.data.sentiments,
        all_sentiment_date: sentimentResponseGetDateGroupping
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col w-full gap-5 p-5">
      <SentimentSearchModal dashboardData={dashboardData} />
      <div className="flex flex-row flex-1 w-full col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7">
        <div id="GreetingMessage" className="w-full flex flex-col">
          <h2 className="text-3xl font-semibold">👋 Hi wahyu</h2>
          <span>Welcome to Sentify</span>
        </div>
        <div id="searchButton" className="w-full flex flex-row justify-end">
          <button className="btn flex font-normal flex-row border border-slate-200" onClick={() => dashboardData.sentiment_data.length > 0 && document.getElementById("my_modal_3").showModal()}>
            <span className="opacity-80 mr-3">
              Search All Sentiment Here...
            </span>
            <kbd className="kbd kbd-sm bg-slate-100">⌘</kbd>
            <kbd className="kbd kbd-sm bg-slate-100">K</kbd>
          </button>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full gap-5">
        <div className="flex flex-row flex-1 col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7 w-96">
          <i className="flex items-center justify-center text-2xl align-middle rounded-full w-14 h-14 ri-chat-smile-3-line bg-sky-100 aspect-square"></i>
          <div className="opacity-80">
            <h3 className="text-3xl font-extrabold">
              {dashboardData.sentiment_count && dashboardData.sentiment_count || 0}
            </h3>
            <span>Total Sentiments</span>
          </div>
        </div>
        <div className="flex flex-row flex-1 col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7 w-96">
          <i className="flex items-center justify-center text-2xl align-middle rounded-full w-14 h-14 ri-message-3-line bg-sky-100 aspect-square"></i>
          <div className="opacity-80">
            <h3 className="text-3xl font-extrabold">
              {dashboardData.total_comments && dashboardData.total_comments || 0}
            </h3>
            <span>Total Comments</span>
          </div>
        </div>
        <div className="flex flex-row flex-1 col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7 w-96">
          <i className="flex items-center justify-center text-2xl align-middle rounded-full w-14 h-14 ri-user-smile-line bg-sky-100 aspect-square"></i>
          <div className="opacity-80">
            <h3 className="text-3xl font-extrabold">
              {dashboardData.total_reactions && Object.values(dashboardData.total_reactions).reduce((acc, curr) => acc + curr, 0) || 0}
            </h3>
            <span>Total Reaction</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-1 w-full col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7">
        <RoundedLineChart data={dashboardData.all_sentiment_date || dummyData} className="flex-1" />
        <GaugeChart data={dashboardData.total_reactions || {
          positive: 1,
          negative: 1,
          neutral: 1
        }} className="flex-1" />
      </div>
    </div>
  );
};

export default HomePages;
