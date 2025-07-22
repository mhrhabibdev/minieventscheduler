
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ManageEvents from "./components/ManageEvents/ManageEvents";
import Navbar from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import Footer from "./shared/Footer/Footer";
import { ThemeProvider } from "./components/ThemeProvider/theme-provider";

function App() {
  return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage-events" element={<ManageEvents />} />
      </Routes>
      <footer className="mt-10">
        <Footer />
      </footer>
    </Router>
</ThemeProvider>
  );
}

export default App;

