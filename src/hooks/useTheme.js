import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";


export default function useTheme() {
    let contexts = useContext(ThemeContext);   // {theme : "dark"}

    if (contexts === undefined) {
        new Error('Theme Context should be only used in ThemeContextProvider.');
    }

    return contexts;
}