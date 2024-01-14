import React from "react";

import CustomButton from "./CustomButton";

const FilePicker = ({ file, setFile, readFile, handleClose }) => {
  return (
    <section className="absolute top-24 left-0 z-50 bg-slate-500 rounded-lg shadow-lg p-2">
      <div className="flex flex-col p-3">
        <div className="flex-1 flex flex-col">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="rounded-lg text-white"
          />
          {/* <label htmlFor="file-upload" className="filepicker-label">
            Upload File
          </label> */}

          <p className="mt-2 text-white text-xs truncate">
            {file === "" ? "No file selected" : file.name}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <CustomButton
            title="Logo"
            handleClick={() => readFile("logo")}
            customStyles="text-semibold bg-white text-black"
          />
          <CustomButton
            title="Full"
            handleClick={() => readFile("full")}
            customStyles="text-semibold bg-white text-black"
          />
        </div>
      </div>

      <button
        className="bg-red-500 px-2 py-1 rounded-lg text-white m-5 mt-2"
        onClick={() => handleClose("filepicker")}
      >
        Close
      </button>
    </section>
  );
};

export default FilePicker;
