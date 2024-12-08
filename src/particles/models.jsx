export const createSentimentModel = (props) => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Let's Create Sentiment!🩷</h3>
        <div role="alert" className="my-3 shadow-lg alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-info shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <p className="py-2">
              Press ESC key or click the button below to close
            </p>
          </div>
        </div>
        <form className="flex flex-col gap-3 px-2 my-5">
          <div className="flex flex-col gap-1">
            Sentiment Title
            <label className="flex items-center gap-2 input input-bordered">
              〰️
              <input type="text" className="grow" placeholder="Title" />
            </label>
          </div>
          <div className="flex flex-col gap-1">
            Sentiment Link
            <label className="flex items-center gap-2 input input-bordered">
              🔗
              <input type="text" className="grow" placeholder="Link" />
            </label>
          </div>
          <div className="flex flex-col gap-1">
            Total Comments
            <label className="flex items-center gap-2 input input-bordered">
              #️⃣
              <input
                type="number"
                className="grow"
                placeholder="Total Comments"
                defaultValue={5}
              />
            </label>
          </div>
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export const CreateTagModel = (props) => {
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Let's Create Tag!🩷</h3>
        <div role="alert" className="my-3 shadow-lg alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-info shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <p className="py-2">
              Press ESC key or click the button below to close
            </p>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
