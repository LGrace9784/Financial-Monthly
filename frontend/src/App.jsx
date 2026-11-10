// Purpose: sets up the frontend routing so the app can switch between the home form view and the results view.

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Results from "./pages/Results";

// Defines the app's available routes and the page shown for each URL.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;