import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./views/Homepage";
import Events from "./views/Events";
import Sports from "./views/Sports";
import About from "./views/About";
import Contact from "./views/Contact";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes navbar */}
          <Route path="/" Component={Homepage} />
          <Route path="/events" Component={Events} />
          <Route path="/sports" Component={Sports} />
          <Route path="/a-propos" Component={About} />
          <Route path="/contact" Component={Contact} />
          <Route path="/sign-in" Component={SignIn} />
          <Route path="/sign-up" Component={SignUp} />
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
