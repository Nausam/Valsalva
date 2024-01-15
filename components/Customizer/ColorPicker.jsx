import React from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "@/store";
import { useControls } from "leva";

const ColorPicker = ({ handleClose }) => {
  const snap = useSnapshot(state);

  const { Model_Color } = useControls({
    Model_Color: {
      value: snap.color,
      onChange: (value) => (state.color = value),
    },
  });

  return (
    <div className="absolute top- left-0 z-50">
      <div
        style={{ backgroundColor: Model_Color }}
        className="p-4 rounded-lg mb-4"
      ></div>
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
