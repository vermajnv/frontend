import {useCallback, useEffect, useState} from 'react'

let logoutTimer;

export const useAuth = () => {
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
      console.log("here in login");
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  useEffect(() => {
    if (tokenExpirationTime) {
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();

      if (token && remainingTime > 0) {
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }
  }, [tokenExpirationTime, logout, token]);

  return { login, logout, token, userId}
}
