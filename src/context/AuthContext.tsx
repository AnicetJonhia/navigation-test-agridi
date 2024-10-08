import { createContext, useReducer, ReactNode, useContext } from 'react';
import { login, register, logout } from '../services/api';

// Updated state interface
interface AuthState {
    isAuthenticated: boolean;
    user: Record<string, unknown> | null;
    token: string | null;
}

// Updated action types
interface AuthAction {
    type: 'LOGIN_SUCCESS' | 'LOGOUT' | 'REGISTER_SUCCESS' | 'SET_USER';
    payload?: {
        user?: Record<string, unknown>;
        token?: string;
    };
}

// Updated context interface
interface AuthContextType {
    state: AuthState;
    loginUser: (credentials: Record<string, unknown>) => Promise<void>;
    registerUser: (userData: Record<string, unknown>) => Promise<void>;
    logoutUser: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial state
const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('token'), // Check token in localStorage
    user: null,
    token: localStorage.getItem('token'), // Load token from localStorage
};

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload?.user || null,
                token: action.payload?.token || null,
            };
        case 'LOGOUT':
            localStorage.removeItem('token'); // Remove token on logout
            return initialState; // Reset to initial state on logout
        default:
            return state;
    }
};

// AuthProvider props interface
interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider component
const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Login function
    const loginUser = async (credentials: Record<string, unknown>) => {
        try {
            const data = await login(credentials);
            if (data.token) {
                localStorage.setItem('token', data.token); // Store token in localStorage
                dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Optionally, you can dispatch an action here to handle the error
        }
    };

    // Register function
    const registerUser = async (userData: Record<string, unknown>) => {
        try {
            const data = await register(userData);
            if (data.token) {
                localStorage.setItem('token', data.token); // Store token in localStorage
                dispatch({ type: 'REGISTER_SUCCESS', payload: data });
            }
        } catch (error) {
            console.error('Registration failed:', error);
            // Optionally, you can dispatch an action here to handle the error
        }
    };

    // Logout function
    const logoutUser = async () => {
        try {
            await logout(state.token!);
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally, you can dispatch an action here to handle the error
        }
    };

    return (
        <AuthContext.Provider value={{ state, loginUser, registerUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using AuthContext
const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthContext, AuthProvider, useAuth };
