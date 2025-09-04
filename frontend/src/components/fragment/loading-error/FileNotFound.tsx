"use client";
import Lottie from "lottie-react";
import React from "react";
import FileNotFound from "../../../../public/animations/FileNotFound.json";

const FileNotFoundPages = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full text-center px-4 pt-10 overflow-x-hidden">
      <div className="max-w-full overflow-hidden">
        <Lottie
          animationData={FileNotFound}
          loop={true}
          className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-56 lg:h-56 xl:w-72 xl:h-72"
        />
      </div>
      <h1 className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
        File Not Found
      </h1>
      <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>
    </div>
  );
};

export default FileNotFoundPages;
