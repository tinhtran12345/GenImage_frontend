import React, { useContext, useRef, useState } from "react";

import { ImageContext, ImageContextType } from "../../context/ImageProvider";

import FileSaver from "file-saver";
import { copyTextToClipBoard } from "../../utils/copyTextToClipBoard";

type Action = {
    isCopied: boolean;
    isDownloaded: boolean;
};

const ImageModel = () => {
    const modelRef = useRef<HTMLDivElement>(null);
    const [action, setAction] = useState<Action>({
        isCopied: false,
        isDownloaded: false,
    });
    const { imageModelState, setImageModelState, clearModelContent } =
        useContext(ImageContext) as ImageContextType;

    const clearAction = () => {
        setTimeout(() => {
            setAction({ ...action, isCopied: false, isDownloaded: false });
        }, 500);
    };

    const handleClose = () => {
        setImageModelState({
            ...imageModelState,
            open: false,
        });
        clearModelContent();
        clearAction();
    };

    const handleCopyImage = async (url: string | null) => {
        if (!url) {
            return;
        }
        try {
            await copyTextToClipBoard(url).then(() => {
                setAction((prev) => ({
                    ...prev,
                    isCopied: true,
                }));
                setTimeout(() => {
                    setAction((prev) => ({
                        ...prev,
                        isCopied: false,
                    }));
                }, 3000);
            });
        } catch (error) {
            console.log(error);
            alert("something went wrong");
        }
    };

    const handleDownload = (url: string | null) => {
        if (url) {
            FileSaver.saveAs(
                url,
                `download_${new Date().toLocaleDateString()}.jpeg`
            );
        }
        setAction((prev) => ({
            ...prev,
            isDownloaded: true,
        }));
    };

    return (
        <>
            {imageModelState.open && (
                <div className="backdrop-blur-sm fixed top-0 left-0 w-full h-[100vh]">
                    <div
                        className="relative w-[600px] mx-auto my-8 rounded-md shadow-2xl bg-gradient-to-b from-rose-100 to-teal-100"
                        ref={modelRef}
                    >
                        <label
                            className="cursor-pointer absolute text-lg text-black font-bold right-10 top-10 hover:scale-105 transition-all duration-150"
                            onClick={handleClose}
                        >
                            X
                        </label>

                        <div className="p-2">
                            <div className="mt-[80px] w-full flex justify-center">
                                <img
                                    className="rounded-xl max-h-96"
                                    src={imageModelState.imgSrc || ""}
                                    alt={imageModelState.prompt}
                                ></img>
                            </div>
                            <p className="mb-3 mt-4 text-center text-base text-black">
                                {imageModelState.prompt}
                            </p>
                        </div>
                        <div className="relative">
                            <div className="flex items-center justify-between w-full p-4">
                                {action.isCopied ? (
                                    <button
                                        type="button"
                                        className="w-[150px] p-3 flex gap-2 items-center rounded-md disabled capitalize bg-purple-500 border-none hover:bg-purple-500 text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"
                                            />
                                        </svg>
                                        Copied URL
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="w-[150px] p-3 flex gap-2 items-center hover:text-white rounded-md capitalize  border border-purple-600 hover:bg-purple-500 text-purple-600"
                                        onClick={() =>
                                            handleCopyImage(
                                                imageModelState.imgSrc
                                            )
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M5 22q-.825 0-1.413-.588T3 20V6h2v14h11v2H5Zm4-4q-.825 0-1.413-.588T7 16V4q0-.825.588-1.413T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.588 1.413T18 18H9Zm0-2h9V4H9v12Zm0 0V4v12Z"
                                            />
                                        </svg>
                                        Copy URL
                                    </button>
                                )}

                                {action.isDownloaded ? (
                                    <button
                                        type="button"
                                        className="w-[150px] p-3 flex gap-2 items-center rounded-md disabled capitalize bg-purple-500 border-none hover:bg-purple-500 text-white"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"
                                            />
                                        </svg>
                                        Downloaded
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="w-[150px] p-3 flex gap-2 items-center rounded-md capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-purple-200"
                                        onClick={() =>
                                            handleDownload(
                                                imageModelState.imgSrc
                                            )
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M6 20q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Zm6-4l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11l-5 5Z"
                                            />
                                        </svg>
                                        Download
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageModel;
