import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-[#212121]">
            {/* Navbar en haut */}
            <Navbar />

            <div className="flex flex-row flex-grow">
                {/* Sidebar à gauche */}
                <Sidebar />

                {/* Contenu principal */}
                <main className="flex-grow p-4 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
