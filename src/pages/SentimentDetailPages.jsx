import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import BarChart from "../particles/charts/KeywordsBarChart";
import DoughnutChart from "../particles/charts/KeywordsDoughnutChart";
import tiktokImg from "../assets/images/tiktok.png";
import instagramImg from "../assets/images/instagram.jpeg";
import youtubeImg from "../assets/images/youtube.png";
import googlemapsImg from "../assets/images/googlemaps.png";
import ExpandableText from '../particles/text/ExpandableText';
import { DeleteSentimentModal } from "../particles/Modals";

const SentimentDetailPages = ({ detailSentiment, fetchSentiment, handleBackToSentiments }) => {
  const [sentimentTitle, setSentimentTitle] = useState(detailSentiment.title || detailSentiment.unique_id);
  const [sentimentTitleUpdated, setSentimentTitleUpdated] = useState(false);

  const changeSentimentTitle = (e) => {
    setSentimentTitleUpdated(true);
    setSentimentTitle(e.target.value);
  };

  const handleUpdateSentimentTitle = async ({ sentimentId }) => {
    try {
      const response = axiosClient.put(`/sentiment/${sentimentId}`, {
        title: sentimentTitle,
      });

      if ((await response).status === 200) {
        setSentimentTitleUpdated(false);
        fetchSentiment();
      }
    } catch (error) {
      console.error(`error : ${error}`);
    }
  }

  const reaction = {
    positive: detailSentiment.statistic.data.positive,
    neutral: detailSentiment.statistic.data.neutral,
    negative: detailSentiment.statistic.data.negative,
  };

  // const totalReaction = reaction.reduce((a, b) => a + b, 0);
  const reactionOverall = Object.keys(reaction).find(
    (key) => reaction[key] === Math.max(...Object.values(reaction))
  );

  const timeAgo = (date) => {
    const now = new Date();
    const timeDifference = now - new Date(date);
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 30) {
      return `${days} days ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
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
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <DeleteSentimentModal sentimentId={detailSentiment.unique_id} />
      <div className="flex flex-row justify-between w-full max-sm:mb-4">
        <button
          onClick={handleBackToSentiments}
          className="mb-3 bg-gray-200 btn hover:bg-gray-300 max-sm:hidden"
        >
          <i className="ri-arrow-left-s-line"></i> Back to Sentiments
        </button>
        <button
          className="mb-3 bg-red-200 btn hover:bg-red-300 max-sm:hidden"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <i className="ri-delete-bin-line"></i> Delete
        </button>
        <button className="md:hidden btn text-xl" onClick={handleBackToSentiments}>
          <i className="ri-arrow-left-line"></i>
        </button>
        <button className="md:hidden btn bg-red-200 text-xl" onClick={() => document.getElementById("my_modal_2").showModal()}>
          <i className="ri-delete-bin-line"></i>
        </button>
      </div>
      <div className="flex flex-col border rounded-lg shadow-sm border-slate-200">
        <div className="flex flex-col p-5">
          <h1 className="text-2xl mb-3 max-sm:flex max-sm:flex-row">
            <input type="text" className="max-sm:w-64" placeholder="sentiment title..." value={sentimentTitle} onChange={(e) => changeSentimentTitle(e)} />
            {sentimentTitleUpdated &&
              sentimentTitle !== detailSentiment.title && (
                <>
                  {sentimentTitle.length !== 0 && (
                    <div className="tooltip ml-2 active:scale-95 duration-150" data-tip="save" onClick={() => handleUpdateSentimentTitle({ sentimentId: detailSentiment.unique_id })}>
                      <i className="ri-save-line text-blue-400 cursor-pointer"></i>
                    </div>
                  )}
                  <div className="tooltip ml-2 active:scale-95 duration-150" data-tip="cancel" onClick={() => setSentimentTitle(detailSentiment.title)}>
                    <i className="ri-reset-left-line text-red-400 cursor-pointer"></i>
                  </div>
                </>
              )
            }
          </h1>
          <div id="tags" className="flex flex-row gap-2">
            {detailSentiment.tags.map((tag, index) => (
              <span className="badge badge-md cursor-pointer" key={index}>{tag} <span className="hover:block hidden"><i className="ri-close-line"></i></span></span>
            ))}
          </div>
          <span className="flex flex-col mt-4">
            {detailSentiment.sentiment_link.split(", ").map((link, index) => (
              <a
                href={link}
                target="_blank"
                key={index}
                className="text-blue-300 hover:text-blue-500"
              >
                <i className="ri-links-line"></i> {detailSentiment.platform} link{" "}
                {index + 1}
              </a>
            ))}
          </span>
        </div>
        <hr className="w-full border" />
        <div className="flex flex-row justify-between p-5">
          <div className="flex flex-row justify-between w-full flex-wrap max-sm:gap-2">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-blue-400">
                Status <i className="ri-arrow-down-s-line"></i>
              </span>
              <span className="flex flex-row items-center justify-center gap-2 p-4 align-middle badge border-slate-200">
                <span className="badge badge-xs badge-success"></span>
                Success
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-blue-400">
                Platform <i className="ri-arrow-down-s-line"></i>
              </span>
              <span className="flex flex-row items-center justify-center gap-2 p-4 align-middle badge border-slate-200">
                <img
                  src={getImage(detailSentiment.platform)}
                  className="w-5"
                  alt=""
                />
                {detailSentiment.platform}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-blue-400">
                Reaction Avg <i className="ri-arrow-down-s-line"></i>
              </span>
              <span className="flex flex-row items-center justify-center gap-2 p-4 align-middle badge border-slate-200">
                {reactionOverall === "positive" && "😊 "}
                {reactionOverall === "neutral" && "😐 "}
                {reactionOverall === "negative" && "😡 "}
                {reactionOverall}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-blue-400">
                Limit Total <i className="ri-arrow-down-s-line"></i>
              </span>
              <span className="flex flex-row items-center justify-center gap-2 p-4 align-middle badge border-slate-200">
                💬 {detailSentiment.comments_limit}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-blue-400">
                Created At <i className="ri-arrow-down-s-line"></i>
              </span>
              <span className="flex flex-row items-center justify-center gap-2 p-4 align-middle badge border-slate-200">
                ⏲️ {timeAgo(detailSentiment.sentiment_created_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-5 mt-3 border rounded-lg shadow-sm border-slate-200">
        <h1 className="text-xl">Resumes</h1>
        <span className="">{detailSentiment.statistic.data.resume}</span>
      </div>
      <div className="flex flex-row gap-2 p-5 mt-3 border rounded-lg shadow-sm border-slate-200">
        <div className="flex flex-row flex-wrap w-full justify-evenly max-sm:gap-14">
          <div>
            <h1 className="text-xl">Positive Keywords</h1>
            <BarChart
              graphData={
                detailSentiment.statistic.data.key_words.graph_positive
              }
              datasetLabel="Positive Graph Keywords"
              colors={{ background: "rgba(102, 187, 106, 0.6)" }}
            />
            <span>
              Total Positive Reaction :{" "}
              {detailSentiment.statistic.data.key_words.graph_positive.reduce(
                (accumulator, current) => {
                  return accumulator + current.value;
                },
                0
              )}
            </span>
          </div>
          <div>
            <h1 className="text-xl">Negative Keywords</h1>
            <BarChart
              graphData={
                detailSentiment.statistic.data.key_words.graph_negative
              }
              datasetLabel="Negative Graph Keywords"
            />
            <span>
              Total Negative Reaction :{" "}
              {detailSentiment.statistic.data.key_words.graph_negative.reduce(
                (accumulator, current) => {
                  return accumulator + current.value;
                },
                0
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row max-sm:flex-col gap-2 p-5 mt-3 border rounded-lg shadow-sm border-slate-200">
        <h2 className="text-xl">Reaction</h2>
        <div className="flex flex-row flex-wrap items-center justify-center w-full p-5 align-middle">
          <div className="flex-1">
            <DoughnutChart
              data={{
                positive: detailSentiment.statistic.data.positive,
                neutral: detailSentiment.statistic.data.neutral,
                negative: detailSentiment.statistic.data.negative,
              }}
            />
          </div>
          <div className="flex flex-col justify-center flex-1 px-10 align-middle gap-7 max-sm:hidden">
            <div className="flex flex-col ">
              <span className="text-lg">Top Positive Reaction</span>
              {detailSentiment.statistic.data.topstatus.positive.length > 0
                ? detailSentiment.statistic.data.topstatus.positive.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-2 my-1 border rounded-lg shadow-md border-slate-100 active:shadow-md hover:shadow-lg duration-150 transition-all hover:cursor-pointer"
                    >
                      <div className="flex flex-row justify-between">
                        <span className="font-semibold">
                          {item.username[0] == '@' ? item.username : '@' + item.username}
                        </span>
                        <span className="text-xs text-slate-500">
                          {detailSentiment.comments.filter(
                            (sentiment) =>
                              sentiment.username === item.username
                          )[0].createdAt && timeAgo(
                            detailSentiment.comments.filter(
                              (sentiment) =>
                                sentiment.username === item.username
                            )[0].createdAt
                          )
                          }
                        </span>
                      </div>
                      <span className="mb-3">
                        <ExpandableText text={item.text} maxWords={20} />
                      </span>
                      {detailSentiment.comments.filter(
                        (sentiment) => sentiment.username === item.username
                      )[0].likes > 0 ? (
                        <div className="block mt-3">
                          👍{" "}
                          {
                            detailSentiment.comments.filter(
                              (sentiment) =>
                                sentiment.username === item.username
                            )[0].likes
                          }
                        </div>
                      ) : (
                        <div className="block mt-3">👍 0</div>
                      )}
                    </div>
                  )
                )
                : "No Positive Reaction"}
            </div>
            <div className="flex flex-col">
              <span className="text-lg">Top Negative Reaction</span>
              {detailSentiment.statistic.data.topstatus.negative.length > 0
                ? detailSentiment.statistic.data.topstatus.negative.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-2 my-1 border rounded-lg shadow-md border-slate-100 active:shadow-md hover:shadow-lg duration-150 transition-all hover:cursor-pointer"
                    >
                      <div className="flex flex-row justify-between">
                        <span className="font-semibold">
                          {item.username[0] == '@' ? item.username : '@' + item.username}
                        </span>
                        <span className="text-xs text-slate-500">
                          {detailSentiment.comments.filter(
                            (sentiment) =>
                              sentiment.username === item.username
                          )[0].createdAt && timeAgo(
                            detailSentiment.comments.filter(
                              (sentiment) =>
                                sentiment.username === item.username
                            )[0].createdAt
                          )
                          }
                        </span>
                      </div>
                      <span className="mb-3">
                        <ExpandableText text={item.text} maxWords={20} />
                      </span>
                      {detailSentiment.comments.filter(
                        (sentiment) => sentiment.username === item.username
                      )[0].likes > 0 ? (
                        <div className="block mt-3">
                          👍{" "}
                          {
                            detailSentiment.comments.filter(
                              (sentiment) =>
                                sentiment.username === item.username
                            )[0].likes
                          }
                        </div>
                      ) : (
                        <div className="block mt-3">👍 0</div>
                      )}
                    </div>
                  )
                )
                : "No Negative Reaction"}
            </div>
          </div>
        </div>
        <div className="mt-2 md:hidden">
          <h2 className="text-xl">Top Positive Reaction</h2>
          <div className="flex flex-col">
            {detailSentiment.statistic.data.topstatus.positive.length > 0
              ? detailSentiment.statistic.data.topstatus.positive.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-2 my-1 border rounded-lg shadow-md border-slate-100 active:shadow-md hover:shadow-lg duration-150 transition-all hover:cursor-pointer"
                  >
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">
                        {item.username[0] == '@' ? item.username : '@' + item.username}
                      </span>
                      <span className="text-xs text-slate-500">
                        {detailSentiment.comments.filter(
                          (sentiment) =>
                            sentiment.username === item.username
                        )[0].createdAt && timeAgo(
                          detailSentiment.comments.filter(
                            (sentiment) =>
                              sentiment.username === item.username
                          )[0].createdAt
                        )
                        }
                      </span>
                    </div>
                    <span className="mb-3">
                      <ExpandableText text={item.text} maxWords={20} />
                    </span>
                    {detailSentiment.comments.filter(
                      (sentiment) => sentiment.username === item.username
                    )[0].likes > 0 ? (
                      <div className="block mt-3">
                        👍{" "}
                        {
                          detailSentiment.comments.filter(
                            (sentiment) =>
                              sentiment.username === item.username
                          )[0].likes
                        }
                      </div>
                    ) : (
                      <div className="block mt-3">👍 0</div>
                    )}
                  </div>
                )
              )
              : "No Positive Reaction"}
          </div>
          <h2 className="text-xl mt-7">Top Negative Reaction</h2>
          <div className="flex flex-col">
            {detailSentiment.statistic.data.topstatus.negative.length > 0
              ? detailSentiment.statistic.data.topstatus.negative.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-2 my-1 border rounded-lg shadow-md border-slate-100 active:shadow-md hover:shadow-lg duration-150 transition-all hover:cursor-pointer"
                  >
                    <div className="flex flex-row justify-between">
                      <span className="font-semibold">
                        {item.username[0] == '@' ? item.username : '@' + item.username}
                      </span>
                      <span className="text-xs text-slate-500">
                        {detailSentiment.comments.filter(
                          (sentiment) =>
                            sentiment.username === item.username
                        )[0].createdAt && timeAgo(
                          detailSentiment.comments.filter(
                            (sentiment) =>
                              sentiment.username === item.username
                          )[0].createdAt
                        )
                        }
                      </span>
                    </div>
                    <span className="mb-3">
                      <ExpandableText text={item.text} maxWords={20} />
                    </span>
                    {detailSentiment.comments.filter(
                      (sentiment) => sentiment.username === item.username
                    )[0].likes > 0 ? (
                      <div className="block mt-3">
                        👍{" "}
                        {
                          detailSentiment.comments.filter(
                            (sentiment) =>
                              sentiment.username === item.username
                          )[0].likes
                        }
                      </div>
                    ) : (
                      <div className="block mt-3">👍 0</div>
                    )}
                  </div>
                )
              )
              : "No Negative Reaction"}
          </div>
        </div>
      </div>
      {detailSentiment.statistic.data.assistances.length > 0 ? (<div className="flex flex-col gap-2 p-5 mt-3 border rounded-lg shadow-sm border-slate-200">
        <h1 className="text-xl">Assistance</h1>
        <div className="flex md:flex-row max-sm:flex-col flex-wrap md:items-center w-full md:gap-3 md:p-5 align-middle">
          {detailSentiment.statistic.data.assistances.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-2 my-1 border rounded-lg shadow-md border-slate-100 md:w-80 hover:shadow-xl active:shadow-md duration-150 transition-all hover:cursor-pointer"
            >
              <div className="flex flex-row justify-between">
                <span className="font-semibold">
                  {item.username[0] == '@' ? item.username : '@' + item.username}
                </span>
                <span className="text-xs text-slate-500">
                  {detailSentiment.comments.filter(
                    (sentiment) =>
                      sentiment.username === item.username
                  )[0].createdAt && timeAgo(
                    detailSentiment.comments.filter(
                      (sentiment) =>
                        sentiment.username === item.username
                    )[0].createdAt
                  )
                  }
                </span>
              </div>
              <span className="mb-3">
                <ExpandableText text={item.text} maxWords={20} />
              </span>
              {detailSentiment.comments.filter(
                (sentiment) => sentiment.username === item.username
              )[0].likes > 0 ? (
                <div className="block mt-3">
                  👍{" "}
                  {
                    detailSentiment.comments.filter(
                      (sentiment) => sentiment.username === item.username
                    )[0].likes
                  }
                </div>
              ) : (
                <div className="block mt-3">👍 0</div>
              )}
            </div>
          ))}
        </div>
      </div>
      ) : ""}
      {detailSentiment.statistic.data.questions.length > 0 ? (<div className="flex flex-col gap-2 p-5 mt-3 border rounded-lg shadow-sm border-slate-200">
        <h1 className="text-xl">Questions</h1>
        <div className="flex md:flex-row max-sm:flex-col flex-wrap md:items-center w-full md:gap-3 md:p-5 align-middle">
          {detailSentiment.statistic.data.questions.map((item, index) => (
            <div
              key={index}
              className="flex flex-col p-2 my-1 border rounded-lg shadow-md border-slate-100 md:w-80 hover:shadow-xl active:shadow-md duration-150 transition-all hover:cursor-pointer"
            >
              <div className="flex flex-row justify-between">
                <span className="font-semibold">
                  {item.username[0] == '@' ? item.username : '@' + item.username}
                </span>
                <span className="text-xs text-slate-500">
                  {detailSentiment.comments.filter(
                    (sentiment) =>
                      sentiment.username === item.username
                  )[0].createdAt && timeAgo(
                    detailSentiment.comments.filter(
                      (sentiment) =>
                        sentiment.username === item.username
                    )[0].createdAt
                  )
                  }
                </span>
              </div>
              <span className="mb-3">
                <ExpandableText text={item.text} maxWords={20} />
              </span>
              {detailSentiment.comments.filter(
                (sentiment) => sentiment.username === item.username
              )[0].likes > 0 ? (
                <div className="block mt-3">
                  👍{" "}
                  {
                    detailSentiment.comments.filter(
                      (sentiment) => sentiment.username === item.username
                    )[0].likes
                  }
                </div>
              ) : (
                <div className="block mt-3">👍 0</div>
              )}
            </div>
          ))}
        </div>
      </div>
      ) : ""}
    </div>
  );
};

export default SentimentDetailPages;
