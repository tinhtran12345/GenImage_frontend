import React, { Dispatch, SetStateAction, useRef } from "react";
import { useOnClickOutSide } from "../../hooks/useOnClickOutSide";
import { ErrorModelState } from "../../types/types";
import errorImg from "../../assets//error_500.jpg";

interface ErrorModelProps {
    setOpen: Dispatch<SetStateAction<ErrorModelState>>;
    messageError: string;
}

const ErrorModel = ({ setOpen, messageError }: ErrorModelProps) => {
    const handleClose = () =>
        setOpen((prev) => ({
            ...prev,
            open: false,
            error: "",
        }));

    const ref = useOnClickOutSide(() => {
        handleClose();
    });

    return (
        <>
            <div className="backdrop-blur-sm fixed top-0 left-0 w-full h-[100vh]">
                <div
                    className="relative w-[600px] mx-auto my-8 text-black rounded-md shadow-2xl bg-gradient-to-b from-rose-100 to-teal-100"
                    ref={ref}
                >
                    <label
                        className="cursor-pointer absolute text-lg font-bold right-10 top-10 hover:scale-105 transition-all duration-150"
                        onClick={handleClose}
                    >
                        X
                    </label>

                    <div className="overflow-y-auto">
                        <div className="mt-7 w-full flex justify-center">
                            <img
                                className="rounded-xl max-h-96"
                                src={errorImg}
                                alt={"Internal Server Error"}
                            />
                        </div>
                        <p className="mb-7 mt-4 text-center text-base text-red-500 font-bold capitalize">
                            {messageError}
                        </p>
                    </div>

                    <div className="p-2 flex justify-center">
                        <button
                            type="button"
                            className={`mx-auto text-white capitalize border-none bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm w-[150px] px-6 py-3 text-center 
                                `}
                            onClick={handleClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorModel;
