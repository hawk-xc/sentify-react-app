import RoundedLineChart from "../particles/charts/RoundedLineChart";
import GaugeChart from "../particles/charts/GaugeChart";

const homePages = () => {
  const dummyData = [
    { date: "2024-12-01", totalSentiment: 300 },
    { date: "2024-12-02", totalSentiment: 350 },
    { date: "2024-12-03", totalSentiment: 400 },
    { date: "2024-12-04", totalSentiment: 450 },
    { date: "2024-12-05", totalSentiment: 420 },
    { date: "2024-12-06", totalSentiment: 480 },
    { date: "2024-12-07", totalSentiment: 500 },
  ];

  const data = {
    positive: 150,
    neutral: 100,
    negative: 80,
  };

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
            <h3 className="text-3xl font-extrabold">234</h3>
            <span>Total Sentiments</span>
          </div>
        </div>
        <div className="flex flex-row flex-1 col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7 w-96">
          <i className="flex items-center justify-center text-2xl align-middle rounded-full w-14 h-14 ri-message-3-line bg-sky-100 aspect-square"></i>
          <div className="opacity-80">
            <h3 className="text-3xl font-extrabold">3435</h3>
            <span>Total Comments</span>
          </div>
        </div>
        <div className="flex flex-row flex-1 col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7 w-96">
          <i className="flex items-center justify-center text-2xl align-middle rounded-full w-14 h-14 ri-user-smile-line bg-sky-100 aspect-square"></i>
          <div className="opacity-80">
            <h3 className="text-3xl font-extrabold">345</h3>
            <span>Total Reaction</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-1 w-full col-span-3 gap-3 align-middle bg-white rounded-lg shadow-sm p-7">
        <RoundedLineChart data={dummyData} className="flex-1" />
        <GaugeChart data={data} className="flex-1" />
      </div>
    </div>
  );
};

export default homePages;
