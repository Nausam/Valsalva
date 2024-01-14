"use client";

import React, { useState, useEffect } from "react";
import ColorPicker from "@/components/Customizer/ColorPicker";
import FilePicker from "@/components/Customizer/FilePicker";
import Tab from "@/components/Customizer/Tab";
import { DecalTypes, EditorTabs, FilterTabs } from "@/constants";
import CanvasModal from "@/components/Canvas/Canvas";

import state from "@/store";
import { useSnapshot } from "valtio";

const page = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  //SHOW TAB CONTENT DEPENDING THE ACTIVETAB
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker handleClose={() => setActiveEditorTab("")} />;
      case "filepicker":
        return (
          <FilePicker
            file={file}
            setFile={setFile}
            readFile={readFile}
            handleClose={() => setActiveEditorTab("")}
          />
        );
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
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

          {FilterTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              isFilterTab
              isActiveTab={activeFilterTab[tab.name]}
              handleClick={() => handleActiveFilterTab(tab.name)}
            />
          ))}

          <div className="mt-10">{generateTabContent()}</div>
        </div>
        <CanvasModal />
      </div>
      {/* <div className="flex justify-between items-center h-screen max-w-md">
        <div className="absolute bottom-0 right-0 flex gap-5 p-10 bg-transparent z-50">
          {EditorTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              handleClick={() => setActiveEditorTab(tab.name)}
            />
          ))}
        </div> */}

      {/* <div className="absolute bottom-0 left-0 flex gap-5 p-10">
          {FilterTabs.map((tab) => (
            <Tab
              key={tab.name}
              tab={tab}
              isFilterTab
              isActiveTab={activeFilterTab[tab.name]}
              handleClick={() => handleActiveFilterTab(tab.name)}
            />
          ))}
        </div> */}
      {/* </div> */}
    </section>
  );
};

export default page;
