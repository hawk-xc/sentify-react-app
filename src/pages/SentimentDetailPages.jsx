const SentimentDetailPages = ({ detailSentiment, handleBackToSentiments }) => {
  console.log(detailSentiment);
  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <button
        onClick={handleBackToSentiments}
        className="mb-3 bg-gray-200 btn hover:bg-gray-300"
      >
        Back to Sentiments
      </button>
      <h1 className="items-center justify-center text-3xl font-bold text-center">
        〰️{detailSentiment.title || detailSentiment.unique_id}〰️
      </h1>
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
