const SentimentDetailPages = ({ detailSentiment, handleBackToSentiments }) => {
  const reaction = {
    positive: detailSentiment.statistic.data.positive,
    neutral: detailSentiment.statistic.data.neutral,
    negative: detailSentiment.statistic.data.negative,
  };

  // const totalReaction = reaction.reduce((a, b) => a + b, 0);
  const reactionOverall = Object.keys(reaction).find(
    (key) => reaction[key] === Math.max(...Object.values(reaction))
  );

  console.log(reactionOverall);

  console.log(detailSentiment);
  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <button
        onClick={handleBackToSentiments}
        className="mb-3 bg-gray-200 btn hover:bg-gray-300"
      >
        <i class="ri-arrow-left-s-line"></i> Back to Sentiments
      </button>
      <div className="flex flex-col border rounded-lg shadow-sm border-slate-200">
        <div className="flex flex-col p-5">
          <h1 className="text-2xl">
            {detailSentiment.title || `Sentiment ${detailSentiment.unique_id}`}
          </h1>
          <span className="flex flex-col">
            {detailSentiment.sentiment_link.split(", ").map((item, index) => (
              <a
                href={item}
                target="_blank"
                key={index}
                className="text-blue-300 hover:text-blue-500"
              >
                <i class="ri-links-line"></i> {detailSentiment.platform} link{" "}
                {index + 1}
              </a>
            ))}
          </span>
        </div>
        <hr className="w-full border" />
        <div className="flex flex-row justify-between p-5">
          <div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-blue-400">
                <i class="ri-information-line"></i> Status
              </span>
              <span className="flex flex-row items-center justify-center gap-2 p-4 align-middle badge border-slate-200">
                <span className="badge badge-xs badge-success"></span>
                Success
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-blue-400">
                <i class="ri-time-line"></i> Reaction
              </span>
              <span className="flex flex-row items-center justify-center gap-2 p-4 align-middle badge border-slate-200">
                <span className="badge badge-xs badge-success"></span>
                {reactionOverall}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <p>Platform: {detailSentiment.platform}</p>
      <p>Created At: {detailSentiment.created_at}</p>
      <p>
        Details: {detailSentiment.details || "No additional details provided."}
      </p>
      <div className="w-full p-5 rounded-lg bg-orange-50">
        <h3 className="mb-3">Comments</h3>
        <div className="flex flex-wrap w-full gap-4">
          {detailSentiment.comments.map((comment, index) => (
            <div
              key={index}
              className="flex-1 p-5 rounded-lg justify-between flex shadow-md bg-sky-100 min-w-[200px] max-w-[300px] flex-col"
            >
              <div>
                <span className="block font-semibold break-words text-md">
                  {comment.name || comment.username || "Guest"}
                </span>
                <span className="text-xs break-words">
                  {comment.text || "blank comment"}
                </span>
              </div>
              {comment.likes > 0 ? (
                <div className="block mt-3">👍 {comment.likes}</div>
              ) : (
                <div className="block mt-3">👍 0</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentimentDetailPages;
