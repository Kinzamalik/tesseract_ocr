// src/App.tsx
import React from "react";
import OcrComponent from "./components/OcrComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tesseract OCR Example</h1>
        <OcrComponent />
      </header>
    </div>
  );
};

export default App;
