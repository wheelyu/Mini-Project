import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Check from "./pages/Check";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check" element={<Check />} />
      </Routes>
    </Router>
  );
}

export default App;
