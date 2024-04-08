import Header from "../components/Header";

const HomePage = () => {
    return (
        <div>
            <Header />
            <main className="container mx-auto max-w-screen-xl px-2">
                <h1 className="mt-10 pb-7 sm:mt-15 animate-text text-center bg-gradient-to-r from-green-200 via-green-400 to-purple-700 bg-clip-text text-transparent text-md sm:text-5xl font-black">
                    Text to image with AI model
                </h1>
                <p className="text-center">
                    Unleash your creativity using our platform and experience
                    the awe-inspiring capabilities of computer-generated
                    imagery!
                </p>
                <div className="max-w-screen-xl mt-10 mx-auto">
                    <div className="mb-6 flex space-y-5 flex-col sm:flex-row sm:items-baseline sm:space-x-5">
                        <div className="flex w-full row space-x-2 items-center">
                            <input
                                type="text"
                                // value={prompt}
                                placeholder="Describe what you want the AI to draw"
                                // onChange={(e) => setPrompt(e.target.value)}
                                className="block w-full p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-purple-500"
                            />
                            <div>Select AI model</div>
                        </div>
                        <button
                            type="button"
                            // onClick={generateImage}
                            // className={classNames(
                            //     "text-white btn capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center",
                            //     { "btn-disabled": prompt === "" },
                            //     { loading: isGenerating }
                            // )}
                        >
                            {/* {isGenerating ? "Generating..." : "Generate"} */}
                        </button>
                    </div>

                    <div className="pl-1">
                        <h2 className="inline-block mr-2 font-bold text-sm sm:text-base">
                            No Inspiration ? Try &rArr;
                        </h2>
                        <button
                            className="btn btn-xs sm:btn-sm btn-outline capitalize"
                            // onClick={() => {
                            //     setPrompt(getSurprisePrompt(prompt));
                            // }}
                        >
                            Surprise Me
                        </button>
                    </div>
                </div>
                <div>Explore</div>
                <div className="mb-10"></div>
                <div>Image Model</div>
                <div>Error Model</div>
            </main>
        </div>
    );
};

export default HomePage;
