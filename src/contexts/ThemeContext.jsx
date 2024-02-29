import { createContext, useReducer } from "react";

const ThemeContext = createContext();

let ThemeReducer = (state, action) => {
  //   console.log(state, action);

  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, theme: action.payload }; // {theme: 'dark'}
    default:
      return state; // {theme: 'light'}
  }
};

const ThemeContextProvider = ({ children }) => {
  const themeFromStorage = localStorage.getItem("theme") || "light";
  let [state, dispatch] = useReducer(ThemeReducer, {
    theme: themeFromStorage,
  });

  let changeTheme = (theme) => {
    localStorage.setItem("theme", theme);
    // action -> type + payload -> {type, payload}
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };

  const isDark = state.theme === "dark";

  return (
    <ThemeContext.Provider value={{ ...state, changeTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
