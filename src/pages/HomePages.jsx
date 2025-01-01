import { useState, useEffect } from 'react';
import RoundedLineChart from "../particles/charts/RoundedLineChart";
import GaugeChart from "../particles/charts/GaugeChart";
import axiosClient from "../api/axiosClient";
import { SentimentSearchModal } from "../particles/Modals";
import SentimentDetailPages from "./SentimentDetailPages";
import loadingBasic from '../particles/loading/loadingBasic';

const HomePages = () => {
  const [detailLoading, setDetailLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [detailSentiment, setDetailSentiment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSentimentDetail = async (sentimentId) => {
    setDetailLoading(true);
    try {
      const response = await axiosClient.get(`/sentiment/${sentimentId}/all`);
      setDetailSentiment(response.data.data);
    } catch (error) {
      console.error("Failed to fetch sentiment details:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleBackToSentiments = () => {
    setDetailSentiment(null);
  };

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get("/dashboard");

      const sentimentResponseGetDate = response.data.data.sentiments.map((item) => item.sentiment_created_at.slice(0, 10));

      const sentimentResponseGetDateGroupping = sentimentResponseGetDate.reduce((acc, date) => {
        const existingDate = acc.find((d) => d.date === date);
        existingDate ? existingDate.totalSentiment++ : acc.push({ date: date, totalSentiment: 1 });
        return acc;
      }, []);

      setDashboardData({
        user_information: response.data.data.user,
        sentiment_count: response.data.data.sentimentCount,
        total_comments: response.data.data.totalCommentsLimit,
        total_reactions: response.data.data.totalSentimentStatistics,
        sentiment_data: response.data.data.sentiments,
        all_sentiment_date: sentimentResponseGetDateGroupping
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      {detailSentiment ?
        <div className='py-5'><SentimentDetailPages handleBackToSentiments={handleBackToSentiments} detailSentiment={detailSentiment} /></div> :
        <GlobalHomePage dashboardData={dashboardData} fetchSentimentDetail={fetchSentimentDetail} detailLoading={detailLoading} isLoading={isLoading} loadingBasic={loadingBasic} />}
    </div>
  );
};

const GlobalHomePage = (props) => {
  const dummyData = [
    { date: "2024-12-01", totalSentiment: 0 },
    { date: "2024-12-02", totalSentiment: 0 },
    { date: "2024-12-03", totalSentiment: 0 },
    { date: "2024-12-04", totalSentiment: 0 },
    { date: "2024-12-05", totalSentiment: 0 },
    { date: "2024-12-06", totalSentiment: 0 },
    { date: "2024-12-07", totalSentiment: 0 },
  ];

  return (
    <div className="flex flex-col w-full gap-5 p-5">
      <SentimentSearchModal dashboardData={props.dashboardData} fetchSentimentDetail={props.fetchSentimentDetail} detailLoading={props.detailLoading} loadingBasic={loadingBasic} />
      <div className="flex flex-row flex-1 w-full col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7">
        <div id="GreetingMessage" className="w-full flex flex-col">
          <h2 className="text-3xl font-semibold">👋 Hi, Hello {props.dashboardData?.user_information?.username || 'Guest'}</h2>
          <span>Welcome to Sentify</span>
        </div>
        <div id="searchButton" className="w-full flex flex-row justify-end">
          <button className="btn flex font-normal flex-row border border-slate-200" onClick={() => props.dashboardData.sentiment_data.length > 0 && document.getElementById("my_modal_3").showModal()}>
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
              {props.dashboardData.sentiment_count && props.dashboardData.sentiment_count || 0}
            </h3>
            <span>Total Sentiments</span>
          </div>
        </div>
        <div className="flex flex-row flex-1 col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7 w-96">
          <i className="flex items-center justify-center text-2xl align-middle rounded-full w-14 h-14 ri-message-3-line bg-sky-100 aspect-square"></i>
          <div className="opacity-80">
            <h3 className="text-3xl font-extrabold">
              {props.dashboardData.total_comments && props.dashboardData.total_comments || 0}
            </h3>
            <span>Total Comments</span>
          </div>
        </div>
        <div className="flex flex-row flex-1 col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7 w-96">
          <i className="flex items-center justify-center text-2xl align-middle rounded-full w-14 h-14 ri-user-smile-line bg-sky-100 aspect-square"></i>
          <div className="opacity-80">
            <h3 className="text-3xl font-extrabold">
              {props.dashboardData.total_reactions && Object.values(props.dashboardData.total_reactions).reduce((acc, curr) => acc + curr, 0) || 0}
            </h3>
            <span>Total Reaction</span>
          </div>
        </div>
      </div>
      {props.dashboardData.all_sentiment_date?.length > 0 ? (
        <div className="flex flex-row flex-1 w-full col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7">
          <RoundedLineChart data={props.dashboardData.all_sentiment_date || dummyData} className="flex-1" />
          <GaugeChart data={props.dashboardData.total_reactions || {
            positive: 1,
            negative: 1,
            neutral: 1
          }} className="flex-1" />
        </div>
      ) : (
        <div className="flex flex-row flex-1 w-full col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-16 text-center items-center justify-center">
          {props.isLoading ? (<props.loadingBasic />) : (
            <span>your statistic graph shown here</span>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePages;
