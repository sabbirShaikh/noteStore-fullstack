import React, { createContext, useContext, useEffect, useState } from "react";

const myContext = createContext();
function ThemeContext({ children }) {
  const [color, setColor] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = color === "dark" ? "bg-gray-950" : "bg-gray-100";
  }, [color]);

  return (
    <>
      <myContext.Provider value={[color, setColor]}>
        {children}
      </myContext.Provider>
    </>
  );
}

export function useTheme() {
  return useContext(myContext);
}

export default ThemeContext;
