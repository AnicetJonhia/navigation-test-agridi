import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'importer useNavigate
import { AuthContext } from '../../context/AuthContext.tsx';

const Logout = () => {
    const { logoutUser } = useContext(AuthContext)!;
    const navigate = useNavigate(); // Utilisation de useNavigate

    const handleLogout = async () => {
        await logoutUser();
        navigate('/login'); // Redirige vers la page d'accueil ou la page de connexion
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
