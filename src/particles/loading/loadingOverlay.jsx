const LoadingOverlay = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="flex flex-col items-center">
                <div className="w-36 h-2 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="h-full bg-green-500 rounded-lg animate-loading"></div>
                </div>
                <p className="mt-4 text-white">Stil load data, please wait...</p>
            </div>
        </div>
    );
}

export default LoadingOverlay;