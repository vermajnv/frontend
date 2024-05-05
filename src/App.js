import React, { useCallback, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authenticate from "./user/pages/Authenticate";
import { AuthContext } from "./shared/context/auth-context";
import PrivateRoutes from "./shared/utils/PrivateRoutes";

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId, token) => {
    setToken(token);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ userId: userId, isLoggedIn: !!token, token : token, login: login, logout: logout }}
    >
      <Router>
        <main>
          <MainNavigation></MainNavigation>
          <Routes>
            <Route path="/" element={<Users></Users>} exact></Route>
            <Route path="/:userId/places" element={<UserPlaces />}></Route>
            <Route
              path="/places"
              element={<PrivateRoutes isAuthenticated={token} />}
            >
              <Route path="new" element={<NewPlace></NewPlace>}></Route>
              <Route
                path=":placeId"
                element={<UpdatePlace></UpdatePlace>}
              ></Route>
            </Route>
            <Route path="/auth" element={<Authenticate></Authenticate>}></Route>
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
