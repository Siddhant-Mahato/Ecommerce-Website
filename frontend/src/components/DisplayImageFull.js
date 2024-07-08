import React from "react";
import { IoClose } from "react-icons/io5";

const DisplayImageFull = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 right-0 top-0 left-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-4">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={() => onClose(false)}
        >
          <IoClose />
        </div>
        <div className="flex justify-center p-4 max-h-[70vh] max-w-[70vw]">
          <img
            src={imageUrl}
            alt="User Profile Pic"
            // className="w-full h-full "
            width={840}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImageFull;
