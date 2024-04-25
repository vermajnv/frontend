import React,{ useCallback, useState }   from "react";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authenticate from "./user/pages/Authenticate";
import { AuthContext } from "./shared/context/auth-context";
import PrivateRoutes from "./shared/utils/PrivateRoutes";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((userId) => {
    setIsLogin(true);
    setUserId(userId);
  }, [])

  const logout = useCallback(() => {
    setIsLogin(false)
  }, [])

  return (
    <AuthContext.Provider value={{userId : userId, isLogin : isLogin, login : login, logout : logout}}>
      <Router>
        <main>
        <MainNavigation></MainNavigation>
          <Routes>
              <Route path="/" element={<Users></Users>} exact></Route>
              <Route path="/:userId/places" element={<UserPlaces/>}></Route>
              <Route path="/places" element={<PrivateRoutes isAuthenticated={isLogin}/>}>
                <Route path="new" element={<NewPlace></NewPlace>}></Route>
                <Route path=":placeId" element={<UpdatePlace></UpdatePlace>}></Route>
              </Route>
              <Route path="/auth" element={<Authenticate></Authenticate>}></Route>
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
