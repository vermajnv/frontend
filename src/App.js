import React  from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Users></Users>} exact></Route>
        <Route path="/places/new" element={<NewPlace></NewPlace>}></Route>
        <Route path="*" element={<Navigate to="/not-found"></Navigate>}></Route>
    </Routes>
  );
}

export default App;
