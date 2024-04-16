import React, { FC } from "react";
import "./Title.style.scss";

interface TitleProps {
    content: string;
}

const Title: FC<TitleProps> = ({ content }: TitleProps) => {
    return (
        <div className="mt-2  md:mt-6 pb-7 sm:mt-15 text-center">
            <h2 className="animate-character text-2xl sm:text-5xl font-black">
                {content}
            </h2>
        </div>
    );
};

export default Title;
