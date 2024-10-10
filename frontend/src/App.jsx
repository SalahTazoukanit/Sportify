import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./views/homepage/Homepage";
import Events from "./views/events/Events";
import Sports from "./views/sports/Sports";
import About from "./views/about/About";
import SignIn from "./views/sign-in/SignIn";
import SignUp from "./views/sign-up/SignUp";
import Dashboard from "./views/dashboard/Dashboard";
import LegalMentions from "./views/legal-mentions/LegalMentions";
import EventDetail from "./views/event-detail/EventDetail";
import AddEvent from "./views/add-event/AddEvent";
import UpdateEvent from "./views/update-event/UpdateEvent";
import MyFavouritesEvents from "./views/my-favourites-events/MyFavouritesEvents";
import ProtectedRoute from "./components/protected-route/ProtectedRoutes";
import SportDetails from "./views/sport-detail/SportDetails";
import AddCategory from "./views/add-category/AddCategory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sport-details/:id" element={<SportDetails />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/legal-mentions" element={<LegalMentions />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/my-events/add-event"
            element={
              <ProtectedRoute>
                <AddEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/categories/add-category"
            element={
              <ProtectedRoute>
                <AddCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/my-events/update/:id"
            element={
              <ProtectedRoute>
                <UpdateEvent />
              </ProtectedRoute>
            }
          />
          <Route path="/events/event-details/:id" element={<EventDetail />} />
          <Route
            path="/events/my-favourites-events"
            element={
              <ProtectedRoute>
                <MyFavouritesEvents />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
