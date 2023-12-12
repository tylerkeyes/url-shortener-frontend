import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Signup from './components/Signup'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
