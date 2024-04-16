import React, { FC, useContext, useEffect, useState } from "react";
import { Image } from "../types/types";
import ImageService from "../services/ImageService";
import { removeDuplicatedById } from "../utils/removeDuplicateElement";
import { ImageContext, ImageContextType } from "../context/ImageProvider";

// type Props = {}

const Explore: FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [isEnded, setIsEnded] = useState<boolean>(false);
    const { imageModelState, setImageModelState } = useContext(
        ImageContext
    ) as ImageContextType;

    const fetchData = async () => {
        try {
            setIsFetching(true);
            const response = await ImageService.fetchImage(page);

            if (response.status === 200 || response === 201) {
                const { metaData } = response.data;
                setIsEnded(metaData.length === 0);

                setImages((prevValue) =>
                    removeDuplicatedById([...prevValue, ...metaData])
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (!isEnded && !isFetching) {
            fetchData();
        }
    }, [page, imageModelState.imgSrc]);

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);

        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, []);

    const handleInfiniteScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            setPage((page) => page + 1);
        }
    };

    return (
        <div className="container mx-auto max-w-screen-xl mt-12">
            <div className="mb-5">
                <h2 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-3xl font-bold">
                    Explore
                </h2>
                <p className="mt-2 text-xs sm:text-sm">
                    Up unitl now, Our application has generated beautiful
                    images. Be jolted to see what it can do for you.
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images?.length > 0 &&
                    images?.map((image) => (
                        <div
                            key={image._id}
                            className="cursor-pointer hover:scale-105 transition-all duration-200 mb-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                setImageModelState((pre) => ({
                                    ...pre,
                                    open: true,
                                    imgSrc: image.imageUrl,
                                    prompt: image.prompt,
                                }));
                            }}
                        >
                            <img
                                key={image._id}
                                className="h-auto w-80 rounded-lg"
                                src={image.imageUrl}
                                alt={image.prompt}
                            />
                        </div>
                    ))}
                {isFetching &&
                    [1, 2, 3, 4].map((ele) => (
                        <div
                            key={ele}
                            className="h-48 lg:h-80 mb-5 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse"
                        ></div>
                    ))}
            </div>
        </div>
    );
};

export default Explore;
