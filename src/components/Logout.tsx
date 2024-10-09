import { useContext } from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const { logoutUser } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/login'); // Redirection après déconnexion
        } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
        }
    };

    return (
        <Button
            startIcon={<LogoutIcon />}
            fullWidth
            onClick={handleLogout}
            sx={{ justifyContent: 'flex-start', color: 'white', cursor: 'pointer' }} // Assurez-vous que le curseur est un pointeur
        >
            Logout
        </Button>
    );
};

export default Logout;
