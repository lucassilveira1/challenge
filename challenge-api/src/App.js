import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Show from "./components/Show/Show";
import Insert from "./components/Insert/Insert";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path="/insert" element={<Insert />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
