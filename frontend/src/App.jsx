import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./views/homepage/Homepage";
import Events from "./views/events/Events";
import Sports from "./views/sports/Sports";
import About from "./views/about/About";
import Contact from "./views/contact/Contact";
import SignIn from "./views/sign-in/SignIn";
import SignUp from "./views/sign-up/SignUp";
import Dashboard from "./views/dashboard/Dashboard";
import LegalMentions from "./views/legal-mentions/LegalMentions";
import EventDetail from "./views/event-detail/EventDetail";
import AddEvent from "./views/add-event/AddEvent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes navbar */}
          <Route path="/" element={<Homepage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal-mentions" element={<LegalMentions />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/add-event" element={<AddEvent />} />
          <Route path="/events/event-details/:id" element={<EventDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
