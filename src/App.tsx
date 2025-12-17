import { HexColorPicker } from "react-colorful";
import "./App.css";
import { useState } from "react";

function App() {
  const [color, setColor] = useState("");
  const clickHandler = async () => {
    console.log("button is clicked");
    let [tab] = await chrome.tabs.query({ active: true });
    if (!tab?.id || !tab.url || tab.url.startsWith("chrome://")) return;
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
    });
  };
  return (
    <div className="h-full w-full p-3 ">
      <div className="flex justify-center w-full mt-2">
        <h1 className="text-xl text-orange-500 font-bold mb-2 font-serif">
          Color Pulse
        </h1>
      </div>

      <div className="flex items-center gap-2 w-full">
        {/* <input
          className="flex-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
          type="color"
          onChange={(e) => setColor(e.currentTarget.value)}
          value={color}
        /> */}
        <HexColorPicker
          className="mt-2 h-2 w-2"
          color={color}
          onChange={setColor}
        />

        <button
          className="bg-orange-400 text-white px-3 py-1 rounded hover:bg-orange-500 transition-colors duration-300 flex-2"
          onClick={clickHandler}
        >
          Change BG
        </button>
      </div>
    </div>
  );
}

export default App;
