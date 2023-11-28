import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Components/App/Nav";
import Footer from "../Components/App/Footer";

export const ContextData = createContext();
export function useContextProvider() {
  return useContext(ContextData);
}

const API = process.env.REACT_APP_API_URL;

function Provider({ children }) {
  const localUserID = localStorage.getItem("userID");
  const localRecruiterID = localStorage.getItem("recruiterID");
  const [isSignedIn, setIsSignedIn] = useState(localUserID ? true : false);
  const [isRecruiterAcc, setIsRecruiterAcc] = useState(
    localRecruiterID ? true : false
  );
  // for the time being we will assign a fixed userID when clicking login
  const [userID, setUserID] = useState(localUserID);
  const [recruiterID, setRecruiterID] = useState(localRecruiterID);
  // authToken will be manually hardcoded for now
  const [authToken, setAuthToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRtQGVtYWlsLmNvbSIsImlhdCI6MTcwMTE5MTc2MCwiZXhwIjoxNzAzNzgzNzYwfQ.LuImdYYh5JoMm-6NRaGxrhJlEPyWzVqa9QVKi2v3M9g"
  );
  const [openNav, setOpenNav] = useState(false);
  const [accessRegTwo, setAccessRegTwo] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [triggerBonus, setTriggerBonus] = useState(false)

  function navbarClick() {
    setOpenNav(!openNav);
  }

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  axios.defaults.headers.common["authorization"] = `Bearer ${authToken}`;

  return (
    <div className={`${theme}`}>
      <ContextData.Provider
        value={{
          API,
          axios,
          isSignedIn,
          setIsSignedIn,
          userID,
          setUserID,
          setAuthToken,
          theme,
          setTheme,
          isRecruiterAcc,
          setIsRecruiterAcc,
          recruiterID,
          setRecruiterID,
          accessRegTwo,
          setAccessRegTwo,
          navbarClick,
          openNav,
          setOpenNav,
          triggerBonus,
          setTriggerBonus,
        }}
      >
        <Nav />
        {children}
        <Footer />
      </ContextData.Provider>
    </div>
  );
}

export default Provider;
