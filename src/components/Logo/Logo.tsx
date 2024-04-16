import React, { FC } from "react";
import "./Logo.style.scss";

interface ContentProps {
    content: string;
}

const Logo: FC<ContentProps> = ({ content }: ContentProps) => {
    return (
        <div className="content">
            <h2 className="pb-3 animate-text text-center bg-clip-text text-transparent font-black">
                {content}
            </h2>
            <h2 className="pb-3 animate-text text-center bg-clip-text text-transparent font-black">
                {content}
            </h2>
        </div>
    );
};

export default Logo;
