
import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback
} from "react";

import api from "../Services/api";

// Create Context
const AuthContext = createContext(null);

// Create Provider
export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        () => sessionStorage.getItem("token")
    );

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch logged-in user's profile
    const refreshProfile = useCallback(async () => {

        const savedToken = sessionStorage.getItem("token");

        if (!savedToken) {
            setUser(null);
            return;
        }

        try {
            const response = await api.get("/api/users/profile");

            setUser(response.data);
        }
        catch (error) {
            console.error("Error fetching profile:", error);

            if (error.response?.status === 401) {
                sessionStorage.removeItem("token");
                setToken(null);
                setUser(null);
            }
        }

    }, []);

    // Load profile when application starts
    useEffect(() => {

        async function loadUser() {
            try {
                await refreshProfile();
            }
            finally {
                setIsLoading(false);
            }
        }

        loadUser();

    }, [refreshProfile]);

    // Login function
    async function login(newToken) {

        sessionStorage.setItem("token", newToken);

        setToken(newToken);

        await refreshProfile();
    }

    // Logout function
    function logout() {

        sessionStorage.removeItem("token");

        setToken(null);
        setUser(null);
    }

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                isAuthenticated,
                isLoading,
                login,
                logout,
                refreshProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Custom Hook
export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}
