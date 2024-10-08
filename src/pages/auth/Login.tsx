import { useContext, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'importer useNavigate
import { AuthContext } from '../../context/AuthContext.tsx';

const Login = () => {
    const { loginUser } = useContext(AuthContext)!;
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate(); // Utilisation de useNavigate

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await loginUser(credentials);
        navigate('/dashboard'); // Redirige vers la page d'accueil ou une autre page
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
