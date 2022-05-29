import React from "react";
import Giphy from "./components/Giphy";
import './App.css'
function App() {
  const apikey = process.env.REACT_APP_GIPHY_API;
  return (
    <div>
      <Giphy apikey={apikey} />
    </div>
  );
}

export default App;
