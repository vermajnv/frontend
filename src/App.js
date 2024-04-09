import React  from "react";

import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

function App() {

  return (
      <Router>
        <MainNavigation></MainNavigation>
        <main>

          <Routes>
              <Route path="/" element={<Users></Users>} exact></Route>
              <Route path="/:userId/places" element={<UserPlaces/>}></Route>
              <Route path="/places/new" element={<NewPlace></NewPlace>}></Route>
              <Route path="/places/:placeId" element={<UpdatePlace></UpdatePlace>}></Route>
              <Route path="*" element={<Navigate to="/not-found"></Navigate>}></Route>
          </Routes>
        </main>
      </Router>
  );
}

export default App;
