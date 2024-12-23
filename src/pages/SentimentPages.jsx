import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import tiktokImg from "../assets/images/tiktok.png";
import instagramImg from "../assets/images/instagram.jpeg";
import youtubeImg from "../assets/images/youtube.png";
import googlemapsImg from "../assets/images/googlemaps.png";
import SentimentDetailPages from "./SentimentDetailPages";
import DashboardReactionChart from '../particles/charts/DashboardReactionChart';
import { CreateSentimentModal, DeleteTagModal } from "../particles/models";
import { CreateTagModal } from "../particles/models";
import { DeleteSentimentModal } from "../particles/models";
import EmptyDataPart from '../particles/EmptyDataPart';

const SentimentPages = () => {
  const [tags, setTags] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tagId, setTagId] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [detailSentiment, setDetailSentiment] = useState(null);

  const fetchTags = async () => {
    try {
      const response = await axiosClient.get("/tags");
      setTags(response.data.data);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const fetchSentiment = async (tagId = null) => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get(
        tagId ? `/tags/${tagId}` : "/sentiment"
      );
      setSentiment(response.data.data);
    } catch (error) {
      console.error("Failed to fetch sentiment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await axiosClient.get("/dashboard");
      setDashboardData({
        sentiment_count: response.data.data.sentimentCount,
        total_comments: response.data.data.totalCommentsLimit,
        total_reactions: response.data.data.totalSentimentStatistics,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const fetchSentimentDetail = async (sentimentId) => {
    try {
      const response = await axiosClient.get(`/sentiment/${sentimentId}/all`);
      setDetailSentiment(response.data.data);
    } catch (error) {
      console.error("Failed to fetch sentiment details:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchSentiment();
    fetchDashboardData();
  }, []);

  const handleSentimentClick = (sentimentId) => {
    setDetailLoading(true);
    fetchSentimentDetail(sentimentId);
  };

  const handleBackToSentiments = () => {
    setDetailSentiment(null);
  };

  const handleTagClick = (uniqueId) => {
    setActiveTag(uniqueId);
    fetchSentiment(uniqueId);
  };

  const getImage = (platform) => {
    switch (platform) {
      case "instagram":
        return instagramImg;
      case "tiktok":
        return tiktokImg;
      case "youtube":
        return youtubeImg;
      case "googlemaps":
        return googlemapsImg;
      default:
        return null;
    }
  };

  return (
    <div className="py-5">
      {detailSentiment ? (
        <SentimentDetailPages
          handleBackToSentiments={handleBackToSentiments}
          detailSentiment={detailSentiment}
        />
      ) : (
        <SentimentList
          tags={tags}
          sentiment={sentiment}
          dashboardData={dashboardData}
          handleSentimentClick={handleSentimentClick}
          handleTagClick={handleTagClick}
          activeTag={activeTag}
          isLoading={isLoading}
          detailLoading={detailLoading}
          fetchTags={fetchTags}
          tagId={tagId}
          setTagId={setTagId}
          getImage={getImage}
          EmptyDataPart={EmptyDataPart}
        />
      )}
    </div>
  );
};

const SentimentList = ({
  tags,
  sentiment,
  dashboardData,
  handleSentimentClick,
  handleTagClick,
  activeTag,
  isLoading,
  detailLoading,
  fetchTags,
  tagId,
  setTagId,
  getImage,
  EmptyDataPart
}) => {
  return (
    <div>
      <CreateSentimentModal tags={tags} />
      <CreateTagModal />
      <DeleteTagModal fetchTags={fetchTags} tagId={tagId} />
      <div className="grid grid-cols-12 gap-5">
        <div className="flex flex-col col-span-3 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="mb-3 text-3xl font-extrabold">🏷️ My Tags</h2>
          <button
            className="mb-3 shadow-md btn bg-sky-100 hover:bg-sky-200"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Add Tags ➕
          </button>
          {tags.length > 0 ? (
            <div className="flex flex-row flex-wrap">
              <button
                onClick={() => handleTagClick(null)}
                className={`flex flex-row gap-1 m-1 p-2 rounded-box ${activeTag === null ? "bg-blue-500 text-white" : "bg-base-200"
                  }`}
              >
                🏷️ All
              </button>
              {tags.map((tag, index) => (
                <div
                  key={index}
                  onClick={() =>
                    detailLoading ? null : handleTagClick(tag.unique_id)
                  }
                  className={`flex flex-row gap-1 m-1 px-3 py-2 rounded-box ${activeTag === tag.unique_id
                    ? "bg-blue-500 text-white"
                    : "bg-base-200"
                    }`}
                >
                  🏷️ {tag.tag_name}
                  <button className={`rounded-full flex justify-center align-middle items-center opacity-55 hover:opacity-100 z-50 active:scale-105 duration-150 ${activeTag === tag.unique_id ? "" : "hidden"} ml-2`} onClick={() => {
                    setTagId(tag.unique_id)
                    document.getElementById("my_modal_3").showModal()
                  }}>
                    <i className="ri-delete-bin-5-line"></i>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full align-middle">
              <span className="loading loading-ring loading-lg"></span>
              Loading...
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-6 p-5 bg-white rounded-lg shadow-lg">
          <div className="flex flex-row items-center justify-between">
            <h2 className="mb-3 text-3xl font-extrabold">😃 My Sentiment</h2>
            <button
              className="mb-3 shadow-md btn bg-sky-100 hover:bg-sky-200"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Add Sentiment ➕
            </button>
          </div>
          {detailLoading ? (
            <div className="flex flex-col items-center justify-center w-full h-full align-middle transition-all duration-150">
              <span className="loading loading-ring loading-lg"></span>
              Loading details...
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center w-full h-full align-middle">
              <span className="loading loading-ring loading-lg"></span>
              Loading sentiments...
            </div>
          ) : sentiment.length > 0 ? (
            sentiment.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-5"
                onClick={() =>
                  handleSentimentClick(
                    item.unique_id || item.sentiment_unique_id
                  )
                }
              >
                <div className="flex items-center my-1 duration-150 menu bg-base-200 active:bg-base-300 active:scale-95 lg:menu-horizontal rounded-box">
                  <li className="justify-between w-full active:bg-base-300">
                    <span
                      rel="noopener noreferrer"
                      className="flex justify-between"
                    >
                      <span className="flex flex-row items-center w-full gap-2">
                        <img
                          src={getImage(item.platform)}
                          className="w-10"
                          alt=""
                        />
                        <span className="text-lg font-normal">
                          {item.title ||
                            item.unique_id ||
                            item.sentiment_unique_id ||
                            item.sentiment_title}
                        </span>
                      </span>
                      <span className="flex flex-row items-center justify-center gap-2 align-middle">
                        Success
                        <span className="badge badge-xs badge-success"></span>
                      </span>
                    </span>
                  </li>
                </div>
              </div>
            ))
          ) : (
            <EmptyDataPart />
          )}
        </div>

        <div className="col-span-3 p-5 bg-white rounded-lg shadow-lg flex flex-col gap-3">
          <h2 className="mb-3 text-3xl font-extrabold">🔎 Statistic</h2>
          <div className="p-4 bg-orange-50 rounded-lg">
            <span className="text-sm">All Sentiment</span>
            <h3 className="font-bold text-4xl opacity-80">{dashboardData.sentiment_count || 0}</h3>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <span className="text-sm">All Comments</span>
            <h3 className="font-bold text-4xl opacity-80">{dashboardData.total_comments || 0}</h3>
          </div>
          <div className="w-full flex justify-center flex-col align-middle items-center bg-orange-50 rounded-lg p-3">
            <div className="w-full flex items-start mb-3">
              <span className="text-sm">All Reactions</span>
            </div>
            <DashboardReactionChart data={dashboardData.total_reactions || { positive: 0, negative: 0, neutral: 0 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentPages;
