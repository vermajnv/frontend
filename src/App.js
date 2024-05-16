import React, { Suspense} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import PrivateRoutes from "./shared/utils/PrivateRoutes";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/Loading/LoadingSpinner";

const Users = React.lazy(() => import('./user/pages/Users'))
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'))
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))
const Authenticate = React.lazy(() => import('./user/pages/Authenticate'))

function App() {
  const {login, logout, token, userId} = useAuth();

  return (
    <GoogleOAuthProvider clientId='521198341432-7tgcu82n0gg5ivbron2mq7gm95k76f9n.apps.googleusercontent.com'>
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
            <Suspense fallback={<div className="center"><LoadingSpinner asOverlay></LoadingSpinner></div>}>
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
            </Suspense>
          </main>
        </Router>
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
