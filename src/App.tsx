import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route  path="/login" element={<Login />}  />
                    <Route  path="/register" element={<Register />}  />
                    <Route  path="/products" element={<ProductList />}  />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
