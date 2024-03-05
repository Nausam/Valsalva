import React from "react";
import CustomButton from "./CustomButton";

const FilePicker = ({ file, setFile, readFile, handleClose }) => {
  return (
    <section className="absolute top-10 left-0 z-50 bg-white rounded-lg shadow-lg p-2">
      <div className="flex flex-col">
        <label
          htmlFor="file-upload"
          className="text-lg font-semibold text-gray-700 mb-2"
        >
          Upload File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:border-blue-500"
        />

        <p className="mt-2 text-sm text-gray-600 truncate">
          {file ? file.name : "No file selected"}
        </p>
      </div>

      <div className="mt-4 flex space-x-3 gap-3">
        {/* <CustomButton
          title="Logo"
          handleClick={() => readFile("logo")}
          customStyles="text-semibold text-black border-black border shadow-md"
        /> */}
        <CustomButton
          title="Apply"
          handleClick={() => readFile("full")}
          customStyles="text-semibold text-black border-black border shadow-md"
        />
      </div>

      <button
        className="bg-red-500 text-sm px-4 py-2 rounded-md text-white mt-5 hover:bg-red-600 transition duration-300"
        onClick={() => handleClose("filepicker")}
      >
        Close
      </button>
    </section>
  );
};

export default FilePicker;
