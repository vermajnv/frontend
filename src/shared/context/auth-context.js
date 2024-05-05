import { createContext } from "react";

export const AuthContext = createContext({
    userId : null,
    token : false,
    isLoggedIn : false,
    login : () => {},
    logout : () => {}
});