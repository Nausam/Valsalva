"use client";

import React, { useState, useEffect } from "react";
import FilePicker from "@/components/Customizer/FilePicker";
import Tab from "@/components/Customizer/Tab";
import { DecalTypes, EditorTabs } from "@/constants";
import CanvasModal from "@/components/Canvas/CanvasModal";
import state from "@/store";
import { useSnapshot } from "valtio";
import { useControls } from "leva";

const page = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const colorMap = {
    Black: "#353535",
    White: "#A9A9A9",
  };

  const customColorNames = Object.keys(colorMap);

  const { Model_Color, isLogoTexture, isFullTexture } = useControls(
    "Color Settings",
    {
      footPocketColor: {
        label: "Foot Pocket Color",
        options: customColorNames,
        getValueToStore: (value) => colorMap[value], // Map the selected color name to its hex value
        onChange: (value) => (state.footPocketColor = colorMap[value]),
      },
      finColor: {
        label: "Fin Color",
        value: snap.finColor,
        onChange: (value) => (state.finColor = value),
      },
      bezelColor: {
        label: "Bezel Color",
        value: snap.bezelColor,
        onChange: (value) => (state.bezelColor = value),
      },
      // isLogoTexture: { label: "Logo Texture", value: state.isLogoTexture },
      // isFullTexture: { label: "Full Texture", value: state.isFullTexture },
    }
  );

  useEffect(() => {
    state.isLogoTexture = isLogoTexture;
    state.isFullTexture = isFullTexture;
  }, [isLogoTexture, isFullTexture]);

  //SHOW TAB CONTENT DEPENDING THE ACTIVETAB
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "filepicker":
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
            handleClose={() => setActiveEditorTab("")}
          />
        );
      default:
        return null;
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const reader = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        resolve(event.target.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      fileReader.readAsDataURL(file);
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <section className="w-full relative h-screen">
      <div className="flex flex-col w-full h-screen">
        <div className="absolute top-0 ml-10 gap-5 z-50 mt-20 py-5 flex">
          {EditorTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              handleClick={() => setActiveEditorTab(tab.name)}
            />
          ))}

          <div className="mt-10">{generateTabContent()}</div>

          <div
            style={{ backgroundColor: Model_Color }}
            className="p-4 rounded-lg mb-4"
          ></div>
        </div>
        <CanvasModal />
      </div>
    </section>
  );
};

export default page;
