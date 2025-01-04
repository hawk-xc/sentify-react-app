const SentimentSkeletonLoader = () => {
    return (
        <div className="flex flex-col items-center md:w-full h-full align-middle transition-all duration-150">
            <div className="flex w-full flex-col gap-4 p-5">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 md:w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-4 md:w-96"></div>
                        <div className="skeleton h-4 md:w-full max-sm:w-56"></div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 md:w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-4 md:w-96"></div>
                        <div className="skeleton h-4 md:w-full max-sm:w-56"></div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 md:w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-4 md:w-96"></div>
                        <div className="skeleton h-4 md:w-full max-sm:w-56"></div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 md:w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-4 md:w-96"></div>
                        <div className="skeleton h-4 md:w-full max-sm:w-56"></div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 md:w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="skeleton h-4 md:w-96"></div>
                        <div className="skeleton h-4 md:w-full max-sm:w-56"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SentimentSkeletonLoader;