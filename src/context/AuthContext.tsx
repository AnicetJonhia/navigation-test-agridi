import { createContext, useReducer, ReactNode } from 'react';
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
        user: Record<string, unknown>;
        token: string;
    };
}

// Updated context interface
interface AuthContextType {
    state: AuthState;
    loginUser: (credentials: Record<string, unknown>) => Promise<void>;
    registerUser: (userData: Record<string, unknown>) => Promise<void>;
    logoutUser: () => Promise<void>;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload?.user || null,
                token: action.payload?.token || null,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
            };
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload?.user || null,
                token: action.payload?.token || null,
            };

        default:
            return state;
    }
};

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const loginUser = async (credentials: Record<string, unknown>) => {
        try {
            const data = await login(credentials);
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        } catch (error) {
            console.error('Login failed:', error);
            // Optionally, you can dispatch an action here to handle the error
        }
    };

    const registerUser = async (userData: Record<string, unknown>) => {
        try {
            const data = await register(userData);
            dispatch({ type: 'REGISTER_SUCCESS', payload: data });
        } catch (error) {
            console.error('Registration failed:', error);
            // Optionally, you can dispatch an action here to handle the error
        }
    };

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
        <AuthContext.Provider value={{ state, loginUser, registerUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
