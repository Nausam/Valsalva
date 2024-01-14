import React from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "@/store";

const ColorPicker = ({ handleClose }) => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute top-20 left-0 z-50">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
      />
      <button
        className="bg-red-500 py-1 px-2 rounded-lg text-white mt-2"
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};

export default ColorPicker;
