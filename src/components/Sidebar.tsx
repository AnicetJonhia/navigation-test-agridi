import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import dashboard from "../assets/images/dashboard.png";
import blog from "../assets/images/blog.png";
import product from "../assets/images/product.png";
import stat from "../assets/images/stat.png";
import need from "../assets/images/need.png";
import order from "../assets/images/order.png";
import season from "../assets/images/season.png";
import chat from "../assets/images/chat.png";
import bottom from "../assets/images/bottom.png";
import privateChat from "../assets/images/private-chat.png";
import groupChat from "../assets/images/group-chat.png";
import logo from "../assets/images/logo.png";
import exit from "../assets/images/exit.png";

import { CoolMode }  from "../components/ui/cool-mode.tsx";

// @ts-ignore
export default function Sidebar({ setIsSidebarOpen }) {
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Utiliser un effet pour vérifier la taille de l'écran
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Si la largeur est inférieure à 768px, on considère qu'il s'agit d'un petit écran
        };

        handleResize(); // Appeler une fois lors du montage
        window.addEventListener('resize', handleResize);

        // Nettoyer l'écouteur d'événements lors du démontage du composant
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="h-full flex flex-col justify-between items-start w-64 border-[#A1A1A1] border-r rounded-tr-3xl rounded-br-3xl bg-[rgba(22,26,35,1)] overflow-y-scroll">
            {/* Menu Items */}
            <div className="flex flex-col justify-start items-start gap-2 w-full px-6 pt-6 flex-grow">
                <div className="md:hidden flex flex-row justify-between items-center gap-3 w-[100%] px-6 pt-6 pb-[22px] box-border bg-[rgba(22,26,35,1)]">
                    <div className="flex flex-row gap-1 items-center mb-2 ">
                        <img src={logo} alt="" className="w-6 h-6" />
                        <p className="text-[24px] leading-6 font-inter font-[400] text-white">AgriD</p>
                    </div>
                    {/* Ajouter onClick pour cacher le sidebar */}
                    <img
                        src={exit}
                        alt=""
                        className="w-5 h-5 ml-auto cursor-pointer"
                        onClick={() => {
                            setIsSidebarOpen(false); // Fermer le sidebar
                        }}
                    />
                </div>

                {/* Les éléments du sidebar */}
                <SidebarItem icon={dashboard} label="Dashboard" link="/dashboard" activeItem={activeItem} setActiveItem={setActiveItem} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
                <SidebarItem icon={blog} label="Blogs" link="/blogs" activeItem={activeItem} setActiveItem={setActiveItem} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
                <SidebarItem icon={product} label="Products" link="/products" activeItem={activeItem} setActiveItem={setActiveItem} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
                <SidebarItem icon={stat} label="Stats" link="/stats" activeItem={activeItem} setActiveItem={setActiveItem} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
                <SidebarItem icon={need} label="Needs" link="/needs" activeItem={activeItem} setActiveItem={setActiveItem} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
                <SidebarItem icon={order} label="Orders" link="/orders" activeItem={activeItem} setActiveItem={setActiveItem} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
                <SidebarItem icon={season} label="Seasons" link="/seasons" activeItem={activeItem} setActiveItem={setActiveItem} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />

                {/* Section Chat */}
                <div className="flex flex-col justify-start items-end w-full gap-3">
                    <div className="flex flex-row justify-start items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer" onClick={() => setIsChatOpen(!isChatOpen)}>
                        <img src={chat} alt="" className="w-5 h-full" />
                        <p className="text-sm leading-[143%] font-inter font-[500] tracking-[-0.28px]">Chat</p>
                        <img src={bottom} alt="" className={`w-4 h-4 ml-auto transition-transform duration-300 ${isChatOpen ? '' : 'rotate-180'}`} />
                    </div>

                    {/* Sous-éléments - afficher seulement lorsque la section de chat est ouverte */}
                    {isChatOpen && (
                        <div className="flex flex-col gap-1 w-full">
                            <SidebarSubItem icon={privateChat} label="Private Chat" link="/private-chat" activeItem={activeItem} setActiveItem={setActiveItem} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
                            <SidebarSubItem icon={groupChat} label="Group Chat" link="/group-chat" activeItem={activeItem} setActiveItem={setActiveItem} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
                        </div>
                    )}
                </div>
            </div>

            {/* Section de pied de page */}
            <div className="flex flex-col justify-center items-center gap-2.5 w-full h-[99px]">
                <p className="text-[13.87px] leading-[13.87px] font-poppins font-[600]">© Copyright, Anicet 2024</p>
            </div>
        </div>
    );
}

// Composant SidebarItem
// @ts-ignore
function SidebarItem({ icon, label, link, activeItem, setActiveItem, setIsSidebarOpen, isMobile }) {
    return (

      <CoolMode>
            <Link
            to={link}
            className={`flex flex-row justify-start items-center gap-3 w-full px-3 py-2.5 rounded-lg ${activeItem === label ? 'bg-[#149911]' : 'hover:bg-gray-700'} transition-all duration-300 ease-in-out cursor-pointer`}
            onClick={() => {
                setActiveItem(label);
                if (isMobile) setIsSidebarOpen(false); // Fermer le sidebar sur mobile
            }}
        >
            <img src={icon} alt="" className="w-5 h-5" />
            <p className="text-sm leading-[143%] font-inter font-[500] tracking-[-0.28px]">{label}</p>
        </Link>
      </CoolMode>
    );
}

// Composant SidebarSubItem
// @ts-ignore
function SidebarSubItem({ icon, label, link, activeItem, setActiveItem, setIsSidebarOpen, isMobile }) {
    return (
        <CoolMode>
            <Link
            to={link}
            className={`flex flex-row justify-center items-center gap-3 w-full px-3 py-2.5 rounded-lg ${activeItem === label ? 'bg-[#149911]' : 'hover:bg-gray-700'} transition-all duration-300 ease-in-out cursor-pointer`}
            onClick={() => {
                setActiveItem(label);
                if (isMobile) setIsSidebarOpen(false); // Fermer le sidebar sur mobile
            }}
        >
            <img src={icon} alt="" className="w-5 h-5" />
            <p className="text-xs leading-[133%] font-inter font-[500] tracking-[-0.24px]">{label}</p>
        </Link>
        </CoolMode>
    );
}
