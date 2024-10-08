import  { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const { registerUser } = useContext(AuthContext)!;
    const [userData, setUserData] = useState({ username: '', password: '', email: '' });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        registerUser(userData);
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
