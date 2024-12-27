import { useState, useEffect } from "react";
import tiktokImg from "../assets/images/tiktok.png";
import instagramImg from "../assets/images/instagram.jpeg";
import youtubeImg from "../assets/images/youtube.png";
import googlemapsImg from "../assets/images/googlemaps.png";
import axiosClient from "../api/axiosClient";
import LoadingOverlay from './loading/loadingOverlay';

import { io } from 'socket.io-client';
import Cookies from "js-cookie";

const socket = io(import.meta.env.VITE_BACKEND_SOCKET_ENDPOINT || 'http://localhost:8080', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
});

export const CreateSentimentModal = (props) => {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState("");
  const [sentimentTitle, setSentimentTitle] = useState("");
  const [sentimentLink, setSentimentLink] = useState("");
  const [resultLimit, setResultLimit] = useState(5);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.on('process-update', (update) => {
      props.setProcessUpdates((prev) => [...prev, update]);
    });

    return () => {
      socket.off('process-update');
    };
  }, []);

  const handleSocialMediaChange = (event) => {
    setSelectedSocialMedia(event.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const socketId = socket.id;
    console.log("socket : " + socketId);

    setIsLoading(true);
    try {
      const response_data = {
        link: sentimentLink,
        platformName: selectedSocialMedia,
        title: sentimentTitle,
        tags: tags,
        resultLimit: parseInt(resultLimit, 10)
      }

      document.getElementById("my_modal_1").close();

      await fetch(import.meta.env.VITE_BACKEND_SOCKET_API || 'http://localhost:8080/1.0.0-beta/sentiment-socket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'socket-id': socketId,
          'Authorization': 'Bearer ' + Cookies.get('token')
        },
        body: JSON.stringify(response_data),
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (props.processUpdates.length > 0) {
      const latestUpdate = props.processUpdates[props.processUpdates.length - 1];
      props.setMessage({
        step: latestUpdate.step,
        message: latestUpdate.message
      });
    }
  }, [props.processUpdates]);

  props.processUpdates.map((update) => console.log("step " + update.step + " " + update.message));

  return (
    <dialog id="my_modal_1" className="modal">
      {isLoading && <LoadingOverlay />}
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
        <form className="flex flex-col gap-3 px-2 my-5" onSubmit={(e) => handleSubmitForm(e)}>
          <div className="flex flex-row gap-4">
            {/* TikTok Option */}
            <label
              className={`flex flex-col items-center w-24 align-middle justify-center transition-all rounded-lg cursor-pointer h-24 ${selectedSocialMedia === "tiktok"
                ? "bg-sky-200 border-blue-500"
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
              className={`flex flex-col items-center w-24 align-middle justify-center transition-all rounded-lg cursor-pointer h-24 ${selectedSocialMedia === "instagram"
                ? "bg-sky-200 border-pink-500"
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
              className={`flex flex-col items-center w-24 align-middle justify-center transition-all rounded-lg cursor-pointer h-24 ${selectedSocialMedia === "youtube"
                ? "bg-sky-200 border-red-500"
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

            {/* Googlemaps Option */}
            <label
              className={`flex flex-col items-center w-24 align-middle justify-center transition-all rounded-lg cursor-pointer h-24 ${selectedSocialMedia === "googlemaps"
                ? "bg-sky-200 border-red-500"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}
            >
              <input
                type="radio"
                name="socialMedia"
                value="googlemaps"
                className="hidden peer"
                onChange={handleSocialMediaChange}
              />
              <img
                src={googlemapsImg}
                alt="GoogleMaps"
                className="w-12 h-12 mb-2"
              />
              <span className="text-sm font-medium">Google Maps</span>
            </label>
          </div>

          <div className="flex flex-col gap-1">
            Sentiment Title
            <label className="flex items-center gap-2 input input-bordered">
              〰️
              <input type="text" className="grow" placeholder="Title" onChange={(e) => setSentimentTitle(e.target.value)} value={sentimentTitle} />
            </label>
          </div>
          <div className="flex flex-col gap-1">
            Sentiment Link
            <label className="flex items-center gap-2 input input-bordered">
              🔗
              <input type="text" className="grow" placeholder="Link" required onChange={(e) => setSentimentLink(e.target.value)} value={sentimentLink} />
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
                onChange={(e) => setResultLimit(e.target.value)}
                value={resultLimit}
              />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            Tags
            <div className="flex flex-row flex-wrap gap-2 p-3 rounded-lg bg-slate-50">
              {props.tags.map((item, index) => {
                return (
                  <label
                    className="flex items-center text-sm font-medium transition-colors rounded-full cursor-pointer"
                    key={index}
                  >
                    <input type="checkbox" className="hidden peer" onChange={(e) => (e.target.checked ? setTags([...tags, item.tag_name]) : setTags(tags.filter((tag) => tag !== item.tag_name)))} />
                    <span className="px-3 py-1 border rounded-full peer-checked:bg-sky-200 peer-checked:text-black bg-slate-200 hover:bg-slate-300 peer-checked:border-slate-500">
                      🏷️{item.tag_name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="modal-action">
            <button className="btn bg-sky-200" type="submit">
              Add Sentiment
            </button>
            <button className="btn" onClick={() => document.getElementById("my_modal_1").close()}>Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export const CreateTagModal = (props) => {
  const [tagname, setTagname] = useState('');
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post("/tags", {
        tag_name: tagname,
      });

      if (response.status === 200) {
        setTagname('');
        props.fetchTags();
        document.getElementById("my_modal_2").close();
      }
    } catch (error) {
      console.error(`error : ${error}`);
    }
  }
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Let's Create Tag! 🏷️</h3>
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
        <form onSubmit={(e) => handleSubmitForm(e)} className="p-3">
          <div className="flex flex-col gap-1">
            Tag Name
            <label className="flex items-center gap-2 input input-bordered">
              🏷️
              <input type="text" className="grow" placeholder="e.g Technology" onChange={(e) => setTagname(e.target.value)} value={tagname} />
            </label>
          </div>
          <div className="modal-action">
            <button className="btn bg-sky-200" type="submit">
              Add Tag
            </button>
            <button className="btn" onClick={() => document.getElementById("my_modal_2").close()}>Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export const DeleteSentimentModal = (props) => {
  const deleteSentiment = async () => {
    try {
      const response = await axiosClient.delete(
        `/sentiment/${props.sentimentId}`
      );

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to delete sentiment:", error);
    }
  };
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Delete Sentiment?</h3>
        <div role="alert" className="my-3 shadow-lg alert ">
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
              Are you sure you want to delete this sentiment? this action cannot
              be undone
            </p>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex flex-row gap-2">
            <button className="btn btn-error" onClick={deleteSentiment}>
              Yes, Delete this sentiment
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export const DeleteTagModal = (props) => {
  const deleteSentiment = async () => {
    try {
      const response = await axiosClient.delete(
        `/tags/${props.tagId}`
      );

      if (response.status === 200) {
        props.fetchTags();
        props.setActiveTag(null);
        props.fetchSentiment();
      }
    } catch (error) {
      console.error("Failed to delete sentiment:", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Delete Tag?</h3>
        <div role="alert" className="my-3 shadow-lg alert ">
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
              Are you sure you want to delete this tag? this action cannot
              be undone
            </p>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex flex-row gap-2">
            <button className="btn btn-error" onClick={deleteSentiment}>
              Yes, Delete this Tag
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
