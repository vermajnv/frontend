import React, { useCallback, useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authenticate from "./user/pages/Authenticate";
import { AuthContext } from "./shared/context/auth-context";
import PrivateRoutes from "./shared/utils/PrivateRoutes";

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null);

  const login = useCallback((userId, token, tokenExpIn) => {
    setToken(token);
    console.log(tokenExpIn);
    const expirationTime =
      tokenExpIn || new Date(new Date().getTime() + 2000 * 60 * 60);
    setTokenExpirationTime(expirationTime);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: token,
        expiration: expirationTime.toISOString(),
      })
    );

    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
    setTokenExpirationTime(null);
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      console.log('here in login');
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if(tokenExpirationTime)
    {
      const remainingTime = tokenExpirationTime.getTime() - new Date().getTime();
      
      if (token && remainingTime > 0) {
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }
  }, [tokenExpirationTime, logout, token]);

  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout,
      }}
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
