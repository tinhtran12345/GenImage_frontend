import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { ImageModelState } from "../types/types";

export type ImageContextType = {
    imageModelState: ImageModelState;
    setImageModelState: Dispatch<SetStateAction<ImageModelState>>;
    updateImageState: (ImageModelState: ImageModelState) => void;
    clearModelContent: () => void;
};

export const ImageContext = createContext<ImageContextType | null>(null);

export const ImageProvider: FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [imageModelState, setImageModelState] = useState<ImageModelState>({
        imgSrc: null,
        open: false,
        prompt: "",
    });

    const updateImageState = (imageModelState: ImageModelState) => {
        setImageModelState((prev) => ({
            ...prev,
            ...imageModelState,
        }));
    };
    const clearModelContent = () => {
        setTimeout(() => {
            setImageModelState({
                ...imageModelState,
                open: false,
                imgSrc: "",
                prompt: "",
            });
        }, 500);
    };
    return (
        <ImageContext.Provider
            value={{
                imageModelState,
                setImageModelState,
                updateImageState,
                clearModelContent,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};
