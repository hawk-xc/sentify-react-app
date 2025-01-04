import { createContext, useState, useEffect, useContext } from "react";
import axiosClient from "../api/axiosClient";

const SentimentContext = createContext();

export const SentimentProvider = ({ children }) => {
  const [sentimentData, setSentimentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSentimentData = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get("/sentiment");
        setSentimentData(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch sentiment data");
      } finally {
        setLoading(false);
      }
    };

    fetchSentimentData();
  }, []);

  return (
    <SentimentContext.Provider value={{ sentimentData, loading, error }}>
      {children}
    </SentimentContext.Provider>
  );
};

export const useSentiment = () => useContext(SentimentContext);
