import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './Home';
import NotFound from './NotFound';
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
