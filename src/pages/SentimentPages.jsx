import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import tiktokImg from "../assets/images/tiktok.png";
import instagramImg from "../assets/images/instagram.jpeg";
import youtubeImg from "../assets/images/youtube.png";
import googlemapsImg from "../assets/images/googlemaps.png";
import SentimentDetailPages from "./SentimentDetailPages";
import { CreateSentimentModel as CreateSentimentModel } from "../particles/models";
import { CreateTagModel as CreateTagModel } from "../particles/models";

const SentimentPages = () => {
  const [tags, setTags] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
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
      if (tagId) {
        const response = await axiosClient.get(`/tags/${tagId}`);
        setSentiment(response.data.data);
      } else {
        const response = await axiosClient.get("/sentiment");
        setSentiment(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch sentiment:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    fetchTags(); // Ambil semua tag
    fetchSentiment(); // Ambil semua sentiment secara default
  }, []);

  const handleSentimentClick = (sentimentId) => {
    setDetailLoading(true);
    fetchSentimentDetail(sentimentId);
  };

  const handleBackToSentiments = () => {
    setDetailSentiment(null);
  };

  const handleTagClick = (uniqueId) => {
    setActiveTag(uniqueId); // Tandai tag aktif
    fetchSentiment(uniqueId); // Fetch data sentiment berdasarkan tag
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
          handleSentimentClick={handleSentimentClick}
          handleTagClick={handleTagClick}
          activeTag={activeTag}
          isLoading={isLoading}
          getImage={getImage}
        />
      )}
    </div>
  );
};

const SentimentList = ({
  tags,
  sentiment,
  handleSentimentClick,
  handleTagClick,
  activeTag,
  isLoading,
  detailLoading,
  getImage,
}) => {
  return (
    <div>
      <CreateSentimentModel tags={tags} />
      <CreateTagModel />
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
                <button
                  key={index}
                  onClick={() => handleTagClick(tag.unique_id)}
                  className={`flex flex-row gap-1 m-1 px-3 py-2 rounded-box ${activeTag === tag.unique_id
                    ? "bg-blue-500 text-white"
                    : "bg-base-200"
                    }`}
                >
                  🏷️ {tag.tag_name}
                </button>
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center align-middle items-center h-full flex-col">
              <span className="loading loading-ring loading-lg"></span>
              Loading...
            </div>
          )}
        </div>

        {/* My Sentiment */}
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
            <div className="w-full flex justify-center align-middle items-center h-full flex-col">
              <span className="loading loading-ring loading-lg"></span>
              Loading Details...
            </div>
          ) : isLoading ? (
            <div className="w-full flex justify-center align-middle items-center h-full flex-col gap-4">
              <div className="flex items-center gap-4 w-full">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4 w-full">
                  <div className="skeleton h-4 w-96"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4 w-full">
                  <div className="skeleton h-4 w-96"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4 w-full">
                  <div className="skeleton h-4 w-96"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4 w-full">
                  <div className="skeleton h-4 w-96"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
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
            <div className="w-full flex justify-center align-middle items-center h-full flex-col">
              <span className="loading loading-ring loading-lg"></span>
              Keep Searching Data...
            </div>
          )}
        </div>

        <div className="col-span-3 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="mb-3 text-3xl font-extrabold">🔎 Statistic</h2>
        </div>
      </div>
    </div>
  );
};

export default SentimentPages;
