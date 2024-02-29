import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuth() {
    let auth_contexts = useContext(AuthContext);

    if (auth_contexts === undefined) {
        new Error('Theme Context should be only used in ThemeContextProvider.');
    }

    return auth_contexts;
}