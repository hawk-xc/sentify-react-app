import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import tiktokImg from "../assets/images/tiktok.png";
import instagramImg from "../assets/images/instagram.jpeg";
import youtubeImg from "../assets/images/youtube.png";
import googlemapsImg from "../assets/images/googlemaps.png";
import SentimentDetailPages from "./SentimentDetailPages";
import SentimentSkeletonLoader from "../particles/loading/SentimentSkeletonLoader";
import LoadingBasic from "../particles/loading/loadingBasic";
import DashboardReactionChart from "../particles/charts/DashboardReactionChart";
import { SentimentSearchModal } from "../particles/Modals";
import {
  CreateTagModal,
  CreateSentimentModal,
  DeleteTagModal,
} from "../particles/Modals";
import EmptyDataPart from "../particles/EmptyDataPart";

const SentimentPages = () => {
  const [tags, setTags] = useState([]);
  const [sentiment, setSentiment] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tagId, setTagId] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [detailSentiment, setDetailSentiment] = useState(null);

  // socket client
  const [processUpdates, setProcessUpdates] = useState([]);
  const [message, setMessage] = useState(null);

  const fetchTags = async () => {
    try {
      const response = await axiosClient.get("/tags");
      setTags(response.data.data);
    } catch (error) {
      // console.error("Failed to fetch tags:", error);
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
      setSentiment([]);
      // console.error("Failed to fetch sentiment:", error);
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

  useEffect(() => {
    if (message?.step === 6) {
      fetchSentiment();
      setMessage(null);
    }
  }, [message]);

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

  const clearTagClick = () => {
    setActiveTag(null);
    fetchSentiment();
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
          fetchSentiment={fetchSentiment}
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
          clearTagClick={clearTagClick}
          activeTag={activeTag}
          isLoading={isLoading}
          detailLoading={detailLoading}
          LoadingBasic={LoadingBasic}
          fetchSentiment={fetchSentiment}
          fetchTags={fetchTags}
          tagId={tagId}
          setTagId={setTagId}
          setActiveTag={setActiveTag}
          getImage={getImage}
          SentimentSkeletonLoader={SentimentSkeletonLoader}
          EmptyDataPart={EmptyDataPart}
          processUpdates={processUpdates}
          setProcessUpdates={setProcessUpdates}
          setMessage={setMessage}
          SentimentSearchModal={SentimentSearchModal}
          message={message}
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
  clearTagClick,
  activeTag,
  isLoading,
  detailLoading,
  LoadingBasic,
  fetchSentiment,
  fetchTags,
  tagId,
  setTagId,
  setActiveTag,
  getImage,
  SentimentSkeletonLoader,
  EmptyDataPart,
  processUpdates,
  setProcessUpdates,
  setMessage,
  SentimentSearchModal,
  message,
}) => {
  const BadgeSelector = ({ step }) => {
    switch (step) {
      case 1:
        return <span className="badge badge-xs badge-primary"></span>;
      case 2:
        return <span className="badge badge-xs badge-info"></span>;
      case 3:
        return <span className="badge badge-xs badge-info"></span>;
      case 4:
        return <span className="badge badge-xs badge-info"></span>;
      case 5:
        return <span className="badge badge-xs badge-info"></span>;
      case 6:
        return <span className="badge badge-xs badge-success"></span>;
      default:
        return <span className="badge badge-xs badge-error"></span>;
    }
  };
  return (
    <div>
      <CreateSentimentModal
        tags={tags}
        processUpdates={processUpdates}
        setProcessUpdates={setProcessUpdates}
        setMessage={setMessage}
      />
      <CreateTagModal fetchTags={fetchTags} />
      <DeleteTagModal
        fetchTags={fetchTags}
        tagId={tagId}
        fetchSentiment={fetchSentiment}
        setActiveTag={setActiveTag}
      />
      <SentimentSearchModal dashboardData={sentiment} fetchSentimentDetail={handleSentimentClick} detailLoading={detailLoading} loadingBasic={LoadingBasic} />
      <div className="grid grid-cols-12 gap-5">
        <div className="flex flex-col col-span-3 p-5 bg-white rounded-lg shadow-lg max-sm:hidden">
          <h2 className="mb-3 text-3xl font-extrabold opacity-85">
            🏷️ My Tags
          </h2>
          {tags.length > 0 ? (
            <div className="flex flex-row flex-wrap">
              <button
                onClick={() => handleTagClick(null)}
                className={`hover:cursor-pointer active:scale-95 duration-150 flex flex-row gap-1 m-1 p-2 rounded-box ${activeTag === null ? "bg-blue-500 text-white" : "bg-base-200"
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
                  className={`hover:cursor-pointer active:scale-95 duration-150 flex flex-row gap-1 m-1 px-3 py-2 text-sm rounded-box ${activeTag === tag.unique_id
                    ? "bg-blue-500 text-white"
                    : "bg-base-200"
                    }`}
                >
                  🏷️ {tag.tag_name}
                  <button
                    className={`rounded-full flex justify-center align-middle items-center opacity-55 hover:opacity-100 z-50 active:scale-105 duration-150 ${activeTag === tag.unique_id ? "" : "hidden"
                      } ml-2`}
                    onClick={() => {
                      setTagId(tag.unique_id);
                      document.getElementById("my_modal_3").showModal();
                    }}
                  >
                    <i className="ri-delete-bin-5-line"></i>
                    delete
                  </button>
                </div>
              ))}
              <div
                className="flex flex-row gap-1 px-3 py-2 m-1 text-sm duration-150 hover:cursor-pointer active:scale-95 rounded-box bg-base-200"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                <i className="ri-add-fill"></i> New Tag
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex w-52 flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  <div className="skeleton h-4 w-16"></div>
                  <div className="skeleton h-4 w-16"></div>
                  <div className="skeleton h-4 w-16"></div>
                  <div className="skeleton h-4 w-16"></div>
                  <div className="skeleton h-4 w-16"></div>
                  <div className="skeleton h-4 w-16"></div>
                  <div className="skeleton h-4 w-16"></div>
                  <div className="skeleton h-4 w-16"></div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-row gap-1 px-3 py-2 m-1 text-sm duration-150 hover:cursor-pointer active:scale-95 rounded-box bg-base-200"
              onClick={() =>
                document.getElementById("my_modal_2").showModal()
              }
            >
              <i className="ri-add-fill"></i> New Tag
            </div>
          )}
        </div>

        <div className="flex flex-col md:col-span-6 max-sm:col-span-12 p-5 bg-white rounded-lg shadow-lg">
          <div className="flex flex-row items-center justify-between">
            <h2 className="mb-3 text-3xl font-extrabold opacity-85">
              😃 My Sentiment
            </h2>
            {sentiment.length > 0 && (
              <>
                <button
                  className="max-sm:hidden mb-3 shadow-md rounded-xl btn bg-sky-100 hover:bg-sky-200"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Add Sentiment ➕
                </button>
                <section className="flex flex-row gap-1 md:hidden mb-3">
                  <button className="btn" onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }>
                    <i className="ri-add-line text-lg"></i>
                  </button>
                  <button className="btn">
                    <i className="ri-search-2-line text-lg" onClick={() => document.getElementById("my_modal_3").showModal()}></i>
                  </button>
                </section>
              </>
            )}
          </div>
          <div className="md:hidden flex gap-2 overflow-x-scroll mb-4 p-5 border border-opacity-50 rounded-lg flex-row flex-nowrap items-baseline text-sm">
            <span key="addNewTag" className="inline-flex px-4 py-2 items-center rounded-xl cursor-pointer bg-sky-100" onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }>
              new <i className="ri-add-line"></i>
            </span>
            <span key="allTag" className={`
            inline-flex px-4 py-2 items-center rounded-xl cursor-pointer ${activeTag === null ? "bg-blue-500 text-white" : "bg-base-200"}
              `} onClick={() => handleTagClick(null)}>
              all
            </span>
            
            {tags.map((tag, index) => (
              <span key={index} className={`rounded-xl inline-flex px-4 py-2 items-center cursor-pointer ${activeTag === tag.unique_id
                ? "bg-blue-500 text-white"
                : "bg-base-200"
                }`} onClick={() =>
                detailLoading ? null : handleTagClick(tag.unique_id)
              }>{tag.tag_name}</span>
            ))}
          </div>
          {detailLoading ? (
            <LoadingBasic />
          ) : isLoading ? (
            <SentimentSkeletonLoader />
          ) : sentiment.length > 0 ? (
            <>
              {sentiment.map((item, index) => (
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
              ))}
            </>
          ) :
            message ? (
              message.step > 1 ? (
                <div className="relative flex items-center my-1 duration-150 bg-base-200 rounded-box menu lg:menu-horizontal active:bg-base-300 active:scale-95 disabled">
                  <li className="w-full justify-between active:bg-base-300 border border-transparent rounded-lg bg-gradient-to-r from-transparent via-blue-300 to-transparent bg-[length:200%_200%] animate-gradient">
                    <span
                      className="flex justify-between"
                      data-tip="Tooltip on hover"
                    >
                      <span className="flex flex-row items-center w-full gap-2">
                        <img
                          src={getImage(message.message[2])}
                          className="w-10"
                          alt=""
                        />
                        <span className="text-lg font-normal">
                          {message.message[3] || "Sentiment Processing"}
                        </span>
                      </span>
                      <span className="flex flex-row items-center justify-center gap-2 align-middle bg-white rounded-lg w-80 text-xs p-2">
                        {message.message[0]}
                        <BadgeSelector step={message.step} />
                      </span>
                    </span>
                  </li>
                </div>
              ) : (
                ""
              )
            ) :
              <EmptyDataPart clearTagClick={clearTagClick} />
          }
        </div>

        <div className="flex flex-col col-span-3 gap-3 p-5 bg-white rounded-lg shadow-lg max-sm:hidden">
          <h2 className="mb-3 text-3xl font-extrabold opacity-85">
            🔎 Statistic
          </h2>
          <div className="p-4 rounded-lg bg-orange-50">
            <span className="text-sm">All Sentiment</span>
            <h3 className="text-4xl font-bold opacity-80">
              {dashboardData.sentiment_count || 0}
            </h3>
          </div>
          <div className="p-4 rounded-lg bg-orange-50">
            <span className="text-sm">All Comments</span>
            <h3 className="text-4xl font-bold opacity-80">
              {dashboardData.total_comments || 0}
            </h3>
          </div>
          <div className="flex flex-col items-center justify-center w-full p-3 align-middle rounded-lg bg-orange-50">
            <div className="flex items-start w-full mb-3">
              <span className="text-sm">All Reactions</span>
            </div>
            <DashboardReactionChart
              data={
                dashboardData.total_reactions || {
                  positive: 0,
                  negative: 0,
                  neutral: 0,
                }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentPages;