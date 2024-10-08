import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { loginUser } = useContext(AuthContext)!;
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        loginUser(credentials);
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
