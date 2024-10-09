import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';
import Products from './pages/Products.tsx';

import Dashboard from "./pages/Dashboard.tsx";
import Blogs from "./pages/Blogs.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Seasons from "./pages/Seasons.tsx";
import PrivateChat from "./pages/PrivateChat.tsx";
import GroupChat from "./pages/GroupChat.tsx";
import Stats from "./pages/Stats.tsx";
import Needs from "./pages/Needs.tsx";
import Orders from "./pages/Orders.tsx";

import Logout from "./components/Logout.tsx";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Routes accessibles sans authentification */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path={"/logout"} element={<Logout />} />

                    {/* Routes accessibles après authentification avec le layout principal */}
                    <Route element={<MainLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/stats" element={<Stats />} />
                          <Route path="/needs" element={<Needs/>} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/seasons" element={<Seasons />} />
                          <Route path="/private-chat" element={<PrivateChat />} />
                          <Route path="/group-chat" element={<GroupChat />} />


                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
