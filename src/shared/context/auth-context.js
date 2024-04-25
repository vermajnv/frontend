import { createContext } from "react";

export const AuthContext = createContext({
    userId : null,
    isLogin : false,
    login : () => {},
    logout : () => {}
});