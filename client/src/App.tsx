
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ManageEvents from "./components/ManageEvents/ManageEvents";
import Navbar from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-events" element={<ManageEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
