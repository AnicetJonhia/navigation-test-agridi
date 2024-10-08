import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Typage des données d'enregistrement et des credentials
interface UserData {
    username: string;
    password: string;
    email?: string;
}

interface Credentials {
    username: string;
    password: string;
}

// Enregistrement d'un nouvel utilisateur
export const register = async (userData: Record<string, unknown>) => {
    const response = await axios.post(`${API_URL}/auth/users/register/`, userData);
    return response.data;
};

// Connexion de l'utilisateur
export const login = async (credentials: Record<string, unknown>) => {
    const response = await axios.post(`${API_URL}/auth/users/login/`, credentials);
    return response.data;
};

// Déconnexion de l'utilisateur
export const logout = async (token: string) => {
    await axios.post(`${API_URL}/auth/users/logout/`, {}, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
};

// Récupérer les produits
export const getProducts = async (token: string) => {
    const response = await axios.get(`${API_URL}/products/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    return response.data;
};
