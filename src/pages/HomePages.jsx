import { useState, useEffect } from 'react'; 
import RoundedLineChart from "../particles/charts/RoundedLineChart";
import GaugeChart from "../particles/charts/GaugeChart";
import axiosClient from "../api/axiosClient";

const HomePages = () => {
  const [dashboardData, setDashboardData] = useState([]);

  const dummyData = [
    { date: "2024-12-01", totalSentiment: 300 },
    { date: "2024-12-02", totalSentiment: 350 },
    { date: "2024-12-03", totalSentiment: 400 },
    { date: "2024-12-04", totalSentiment: 450 },
    { date: "2024-12-05", totalSentiment: 420 },
    { date: "2024-12-06", totalSentiment: 480 },
    { date: "2024-12-07", totalSentiment: 500 },
  ];

  const fetchDashboardData = async () => {
    try {
      const response = await axiosClient.get("/dashboard");

      const sentimentResponseGetDate = response.data.data.sentiments.map((item) => item.sentiment_created_at.slice(0, 9));

      const sentimentResponseGetDateGroupping = sentimentResponseGetDate.reduce((acc, date) => {
        const existingDate = acc.find((d) => d.date === date);
        existingDate ? existingDate.totalSentiment++ : acc.push({ date, totalSentiment: 1 });
        return acc;
      }, []);

      setDashboardData({
        sentiment_count: response.data.data.sentimentCount,
        total_comments: response.data.data.totalCommentsLimit,
        total_reactions: response.data.data.totalSentimentStatistics,
        all_sentiment_date: sentimentResponseGetDateGroupping
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  console.log(dashboardData.all_sentiment_date);
  console.log(dummyData);

  return (
    <div className="flex flex-col w-full gap-5 p-5">
      <div className="flex flex-row flex-1 w-full col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7">
        <label className="flex items-center w-full gap-2 input input-bordered border-sky-300">
          <input
            type="text"
            className="border-gray-300 grow focus:ring-0 active:ring-0 active:outline-none focus:outline-none focus:border-sky-300"
            placeholder="Search sentiment..."
          />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
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
        <GaugeChart data={dashboardData.total_reactions  || {
          positive: 0,
          negative: 0,
          neutral: 0,
        }} className="flex-1" />
      </div>
    </div>
  );
};

export default HomePages;
