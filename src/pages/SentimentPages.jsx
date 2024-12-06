import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import tiktokImg from '../assets/images/tiktok.png';
import instagramImg from '../assets/images/instagram.jpeg';
import youtubeImg from '../assets/images/youtube.png';
import googlemapsImg from '../assets/images/googlemaps.png';

const SentimentPages = () => {
    const [sentiment, setSentiment] = useState(null);

    // useEffect should be used directly inside the component, not conditionally
    useEffect(() => {
        let isMounted = true;

        const fetchSentiment = async () => {
            try {
                const response = await axiosClient.get('/sentiment');
                if (isMounted) setSentiment(response.data);
            } catch (error) {
                if (isMounted) setSentiment(null);
                console.error("Failed to fetch sentiment data:", error);
            }
        };

        fetchSentiment();

        return () => {
            isMounted = false;
        };
    }, []);

    const getImage = (platform) => {
        switch(platform) {
            case 'instagram':
                return instagramImg;
                break;
            case 'tiktok':
                return tiktokImg;
                break;
            case 'youtube':
                return youtubeImg;
                break;
            case 'googlemaps':
                return googlemapsImg;
                break;
        }
    }

    return (
        <div className='py-5'>
            <div className='flex flex-row gap-5'>
                <div className='bg-white rounded-lg flex-1 flex flex-col p-5 shadow-lg'>
                    <h2 className='text-3xl font-extrabold mb-3'>My Sentiment</h2>
                    {sentiment ? (
                        <div>
                            {sentiment?.data.map((item, index) => (
                                <div key={index} className='flex flex-col gap-5'>
                                    <div className="flex my-1 menu bg-base-200 lg:menu-horizontal rounded-box">
                                        <li>
                                            <a>
                                                <img src={getImage(item.platform)} className='w-10' alt="" />
                                                {item.unique_id}
                                                <span className="badge badge-sm">99+</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Updates
                                                <span className="badge badge-sm badge-warning">NEW</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                Stats
                                                <span className="badge badge-xs badge-info"></span>
                                            </a>
                                        </li>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading sentiment data...</p>
                    )}
                </div>
                <div className='flex-2 p-10 bg-white rounded-lg shadow-lg'>
                    <span>this is chart</span>
                </div>
            </div>
        </div>
    );
}

export default SentimentPages;
