import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import tiktokImg from "../assets/images/tiktok.png";
import instagramImg from "../assets/images/instagram.jpeg";
import youtubeImg from "../assets/images/youtube.png";
import googlemapsImg from "../assets/images/googlemaps.png";
import { createSentimentModel as CreateSentimentModel } from "../particles/models";
import { CreateTagModel as CreateTagModel } from "../particles/models";

const SentimentPages = () => {
  const [tags, setTags] = useState([]); // Semua tag
  const [sentiment, setSentiment] = useState([]); // Semua data sentiment (default semua)
  const [activeTag, setActiveTag] = useState(null); // unique_id tag aktif
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Fetch semua tag saat komponen dimuat
  const fetchTags = async () => {
    try {
      const response = await axiosClient.get("/tags");
      setTags(response.data.data); // Pastikan mengakses array data
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  // Fetch sentiment berdasarkan tag ID atau default semua
  const fetchSentiment = async (tagId = null) => {
    setIsLoading(true); // Mulai loading
    try {
      if (tagId) {
        const response = await axiosClient.get(`/tags/${tagId}`);
        setSentiment(response.data.data); // Update data sentiment berdasarkan tag
      } else {
        const response = await axiosClient.get("/sentiment");
        setSentiment(response.data.data); // Default data sentiment semua
      }
    } catch (error) {
      console.error("Failed to fetch sentiment:", error);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  useEffect(() => {
    fetchTags(); // Ambil semua tag
    fetchSentiment(); // Ambil semua sentiment secara default
  }, []);

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
      <CreateSentimentModel />
      <CreateTagModel />
      <div className="grid grid-cols-12 gap-5">
        <div className="flex flex-col col-span-3 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="mb-3 text-3xl font-extrabold">🏷️My Tags</h2>
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
                className={`flex flex-row gap-1 m-1 p-2 rounded-box ${
                  activeTag === null ? "bg-blue-500 text-white" : "bg-base-200"
                }`}
              >
                🏷️All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.unique_id}
                  onClick={() => handleTagClick(tag.unique_id)}
                  className={`flex flex-row gap-1 m-1 px-3 py-2 rounded-box ${
                    activeTag === tag.unique_id
                      ? "bg-blue-500 text-white"
                      : "bg-base-200"
                  }`}
                >
                  🏷️{tag.tag_name}
                </button>
              ))}
            </div>
          ) : (
            <p>Loading tags...</p>
          )}
        </div>

        {/* My Sentiment */}
        <div className="flex flex-col col-span-6 p-5 bg-white rounded-lg shadow-lg">
          <div className="flex flex-row items-center justify-between">
            <h2 className="mb-3 text-3xl font-extrabold">😃My Sentiment</h2>
            <button
              className="mb-3 shadow-md btn bg-sky-100 hover:bg-sky-200"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Add Sentiment➕
            </button>
          </div>
          {isLoading ? (
            <p>Loading sentiment data...</p>
          ) : sentiment.length > 0 ? (
            sentiment.map((item) => (
              <div key={item.sentiment_id} className="flex flex-col gap-5">
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
            <p>No sentiment data available.</p>
          )}
        </div>

        {/* Statistic */}
        <div className="col-span-3 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="mb-3 text-3xl font-extrabold">🔎Statistic</h2>
        </div>
      </div>
    </div>
  );
};

export default SentimentPages;
