import { useContext, useEffect, useState } from "react";
import Explore from "../components/Explore";
import Header from "../components/Header";
import ImageService from "../services/ImageService";
import { ErrorModelState, ImageModelState } from "../types/types";
import Loader from "../components/Loader/Loader";
import ImageModel from "../components/ImageModel";
import { ImageContext, ImageContextType } from "../context/ImageProvider";

const HomePage = () => {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>("");
    const [errorModelState, setErrorModelState] = useState<ErrorModelState>({
        open: false,
        error: "",
    });
    const { imageModelState, setImageModelState, updateImageState } =
        useContext(ImageContext) as ImageContextType;

    const generateImage = async () => {
        try {
            setIsGenerating(true);
            const res = await ImageService.post("/generate", {
                prompt: prompt,
            });

            const { metaData } = res.data;
            updateImageState({
                imgSrc: metaData.imageUrl,
                open: true,
                prompt: metaData.prompt,
            });
            // setImageModelState((prev) => ({
            //     ...prev,
            //     imgSrc: metaData.imageUrl,
            //     open: true,
            //     prompt: metaData.prompt,
            // }));
        } catch (error: any) {
            if (error.data.status === "error") {
                setErrorModelState((prev) => ({
                    ...prev,
                    open: true,
                    error: error.data.message,
                }));
            }
        } finally {
            setIsGenerating(false);
        }
    };

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
                        <div className="flex gap-2 w-full row space-x-2 items-center">
                            <input
                                type="text"
                                value={prompt}
                                placeholder="Describe what you want the AI to draw"
                                onChange={(e) => setPrompt(e.target.value)}
                                className="block w-[90%] p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-purple-500"
                            />
                            {/* <div className="flex-1">Select AI model</div> */}

                            <button
                                type="button"
                                className="flex items-center justify-center text-white capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm w-[150px] px-6 h-[60px] text-center"
                                onClick={generateImage}
                            >
                                {isGenerating ? <Loader /> : "Generate"}
                            </button>
                        </div>
                    </div>
                </div>

                <Explore />
                <div className="mb-10"></div>
                <ImageModel />
                <div>Error Model</div>
            </main>
        </div>
    );
};

export default HomePage;
