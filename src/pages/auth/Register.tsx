import { useContext, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'importer useNavigate
import { AuthContext } from '../../context/AuthContext.tsx';

const Register = () => {
    const { registerUser } = useContext(AuthContext)!;
    const [userData, setUserData] = useState({ username: '', password: '', email: '' });
    const navigate = useNavigate(); // Utilisation de useNavigate

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await registerUser(userData);
        navigate('/dashboard'); // Redirige vers la page d'accueil ou une autre page
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
