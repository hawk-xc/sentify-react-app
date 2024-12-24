const loadingBacic = () => {
    return (
        <div className="flex items-center justify-center w-full h-full flex-col align-middle">
            <div className="flex flex-col items-center">
                <div className="w-36 h-2 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="h-full bg-green-500 rounded-lg animate-loading"></div>
                </div>
                <p className="mt-4 text-black opacity-80">Still load data, please wait...</p>
            </div>
        </div>
    );
}

export default loadingBacic;