export interface ImageModelState {
    imgSrc: string | null;
    open: boolean;
    prompt: string;
}

export type Image = {
    _id: string;
    prompt: string;
    imageUrl: string;
    createdAt: string;
};

export interface ErrorModelState {
    open: boolean;
    error: string;
}
