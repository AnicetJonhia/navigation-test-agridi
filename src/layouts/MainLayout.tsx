import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

import Particles from "../components/ui/particles";

export default function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar fermée par défaut

    return (
        <div className="text-white flex flex-col h-screen bg-[#171717]">
            {/* Navbar en haut, passer l'état du sidebar */}
            <div className="relative">
                <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
            </div>

            <div className="flex flex-row flex-grow h-full">
                {/* Sidebar à gauche avec transition pour les grands écrans */}
                {isSidebarOpen && (
                    <div
                        className={`transition-transform duration-1000 ease-in-out transform hidden md:block w-64 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <Sidebar setIsSidebarOpen={setIsSidebarOpen} /> {/* Passer la fonction ici */}
                    </div>
                )}

                {/* Drawer pour petits écrans */}
                <div
                    className={`md:hidden  fixed inset-0 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
                    <div
                        className={`fixed left-0 top-0 w-64 bg-white h-full  rounded-tr-3xl rounded-br-3xl  transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <Sidebar setIsSidebarOpen={setIsSidebarOpen} /> {/* Passer la fonction ici */}
                    </div>
                </div>

                {/* Contenu principal */}
                <main className="flex-grow p-4 ">
                    <Outlet />
                    <Particles
                        className="absolute inset-0"
                        quantity={100}
                        ease={80}
                        color={"#ffffff"}
                        refresh
                      />
                </main>
            </div>
        </div>
    );
}
