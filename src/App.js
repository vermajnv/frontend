import React,{ useCallback, useState }   from "react";

import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authenticate from "./user/pages/Authenticate";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const login = useCallback(() => {
    setIsLogin(true)
  }, [])

  const logout = useCallback(() => {
    setIsLogin(false)
  }, [])

  return (
    <AuthContext.Provider value={{isLogin : isLogin, login : login, logout : logout}}>
      <Router>
        <main>
        <MainNavigation></MainNavigation>
          <Routes>
              <Route path="/" element={<Users></Users>} exact></Route>
              <Route path="/:userId/places" element={<UserPlaces/>}></Route>
              <Route path="/places/new" element={<NewPlace></NewPlace>}></Route>
              <Route path="/places/:placeId" element={<UpdatePlace></UpdatePlace>}></Route>
              <Route path="/auth" element={<Authenticate></Authenticate>}></Route>
              <Route path="*" element={<Navigate to="/not-found"></Navigate>}></Route>
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
