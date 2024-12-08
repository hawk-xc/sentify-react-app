import { useState } from "react";
import tiktokImg from "../assets/images/tiktok.png";
import instagramImg from "../assets/images/instagram.jpeg";
import youtubeImg from "../assets/images/youtube.png";
import googlemapsImg from "../assets/images/googlemaps.png";

export const CreateSentimentModel = (props) => {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState("");

  const handleSocialMediaChange = (event) => {
    setSelectedSocialMedia(event.target.value);
  };

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
          <div className="flex gap-4">
            {/* TikTok Option */}
            <label
              className={`flex flex-col items-center p-4 transition-all rounded-lg cursor-pointer ${
                selectedSocialMedia === "tiktok"
                  ? "bg-gray-300 border-blue-500"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
            >
              <input
                type="radio"
                name="socialMedia"
                value="tiktok"
                className="hidden peer"
                onChange={handleSocialMediaChange}
              />
              <img src={tiktokImg} alt="TikTok" className="w-12 h-12 mb-2" />
              <span className="text-sm font-medium">TikTok</span>
            </label>

            {/* Instagram Option */}
            <label
              className={`flex flex-col items-center p-4 transition-all rounded-lg cursor-pointer ${
                selectedSocialMedia === "instagram"
                  ? "bg-gray-300 border-pink-500"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
            >
              <input
                type="radio"
                name="socialMedia"
                value="instagram"
                className="hidden peer"
                onChange={handleSocialMediaChange}
              />
              <img
                src={instagramImg}
                alt="Instagram"
                className="w-12 h-12 mb-2"
              />
              <span className="text-sm font-medium">Instagram</span>
            </label>

            {/* YouTube Option */}
            <label
              className={`flex flex-col items-center p-4 transition-all rounded-lg cursor-pointer ${
                selectedSocialMedia === "youtube"
                  ? "bg-gray-300 border-red-500"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
            >
              <input
                type="radio"
                name="socialMedia"
                value="youtube"
                className="hidden peer"
                onChange={handleSocialMediaChange}
              />
              <img src={youtubeImg} alt="YouTube" className="w-12 h-12 mb-2" />
              <span className="text-sm font-medium">YouTube</span>
            </label>
          </div>

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
              <input type="text" className="grow" placeholder="Link" required />
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
          <div className="flex flex-col gap-2">
            Tags
            <div className="flex flex-row flex-wrap gap-2 p-3 rounded-lg bg-slate-50">
              {props.tags.map((item) => {
                return (
                  <label className="flex items-center text-sm font-medium transition-colors rounded-full cursor-pointer">
                    <input type="checkbox" className="hidden peer" />
                    <span className="px-3 py-1 rounded-full peer-checked:bg-sky-200 peer-checked:text-black bg-slate-200 hover:bg-slate-300">
                      🏷️{item.tag_name}
                    </span>
                  </label>
                );
              })}
            </div>
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
