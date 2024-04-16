import { ChangeEvent, useContext, useState } from "react";
import Explore from "../components/Explore";
import Header from "../components/Header";
import ImageService from "../services/ImageService";
import { ErrorModelState } from "../types/types";
import Loader from "../components/Loader/Loader";
import ImageModel from "../components/Model/ImageModel";
import { ImageContext, ImageContextType } from "../context/ImageProvider";
import ErrorModel from "../components/Model/ErrorModel";
import Title from "../components/Title/Title";

const HomePage = () => {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [errorModelState, setErrorModelState] = useState<ErrorModelState>({
        open: false,
        error: "",
    });
    const { imageModelState, updateImageState, setImageModelState } =
        useContext(ImageContext) as ImageContextType;

    const generateImage = async () => {
        try {
            setIsGenerating(true);
            const res = await ImageService.post("/generate", {
                prompt: imageModelState.prompt,
            });

            const { metaData } = res.data;
            updateImageState({
                imgSrc: metaData.imageUrl,
                open: true,
                prompt: metaData.prompt,
            });
        } catch (error: any) {
            if (error?.data.status === "error") {
                setErrorModelState((prev) => ({
                    ...prev,
                    open: true,
                    error: error.data.message,
                }));
            } else {
                setErrorModelState((prev) => ({
                    ...prev,
                    open: true,
                    error: "Internal server error!",
                }));
            }
        } finally {
            setIsGenerating(false);
        }
    };

    const handleChangePrompt = (e: ChangeEvent<HTMLInputElement>) =>
        setImageModelState((prev) => ({
            ...prev,
            prompt: e.target.value,
        }));

    return (
        <div>
            <Header />
            <main className="container mx-auto max-w-screen-xl px-2">
                <Title content=" Text to image with AI model" />
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
                                value={imageModelState.prompt}
                                placeholder="Describe what you want the AI to draw"
                                onChange={handleChangePrompt}
                                className="block w-[90%] p-4 text-gray-700 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-purple-500"
                            />

                            <button
                                type="button"
                                className={`flex items-center justify-center text-white capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm w-[150px] px-6 h-[60px] text-center 
                                `}
                                disabled={isGenerating}
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
                {errorModelState.open && (
                    <ErrorModel
                        setOpen={setErrorModelState}
                        messageError={errorModelState.error}
                    />
                )}
            </main>
        </div>
    );
};

export default HomePage;
