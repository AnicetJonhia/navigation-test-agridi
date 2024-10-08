import { Link } from 'react-router-dom';
import { useState } from 'react';


import dashboard from "../assets/images/dashboard.png";
import blog from "../assets/images/blog.png";
import product from "../assets/images/product.png";
import stat from "../assets/images/stat.png";
import need from "../assets/images/need.png";
import order from "../assets/images/order.png";
import season from "../assets/images/season.png";
import chat from "../assets/images/chat.png";
import bottom from "../assets/images/bottom.png";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false); // To track if the chat section is open

  return (
    <div className="relative h-screen text-white flex flex-col justify-start items-start w-64 border border-[#5c5f65ff] bg-[rgba(22,26,35,1)]">



      {/* Menu Items */}
      <div className="flex flex-col justify-start items-start gap-2 w-full px-6 pt-6 h-[560px]">
        <SidebarItem icon={dashboard} label="Dashboard" link="/dashboard" activeItem={activeItem} setActiveItem={setActiveItem} />
        <SidebarItem icon={blog} label="Blogs" link="/blogs" activeItem={activeItem} setActiveItem={setActiveItem} />
        <SidebarItem icon={product} label="Products" link="/products" activeItem={activeItem} setActiveItem={setActiveItem} />
        <SidebarItem icon={stat} label="Stats" link="/stats" activeItem={activeItem} setActiveItem={setActiveItem} />
        <SidebarItem icon={need} label="Needs" link="/needs" activeItem={activeItem} setActiveItem={setActiveItem} />
        <SidebarItem icon={order} label="Orders" link="/orders" activeItem={activeItem} setActiveItem={setActiveItem} />
        <SidebarItem icon={season} label="Seasons" link="/seasons" activeItem={activeItem} setActiveItem={setActiveItem} />

        {/* Chat Section */}
        <div className="flex flex-col justify-start items-end w-full gap-3">
          <div
            className="flex flex-row justify-start items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setIsChatOpen(!isChatOpen)} // Toggle chat section open/close
          >
            <img src={chat} alt="" className="w-5 h-full"/>
            <p className="text-sm leading-[143%] font-inter font-[500] tracking-[-0.28px]">Chat</p>
            <img
              src={bottom}
              alt=""
              className={`w-4 h-4 ml-auto transition-transform duration-300 ${isChatOpen ? '' : 'rotate-180' }`}
            />
          </div>

          {/* SubItems - only show when chat section is open */}
          {isChatOpen && (
            <div className="flex flex-col gap-1 w-full">
              <SidebarSubItem label="Private Chat" link="/private-chat" activeItem={activeItem} setActiveItem={setActiveItem} />
              <SidebarSubItem label="Group Chat" link="/group-chat" activeItem={activeItem} setActiveItem={setActiveItem} />
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="absolute bottom-0 flex flex-col justify-center items-center gap-2.5 w-full h-[99px]">
        <p className="text-[13.87px] leading-[13.87px] font-poppins font-[600]">© Copyright, Anicet 2024</p>
      </div>
    </div>
  );
}

// SidebarItem Component
// @ts-ignore
function SidebarItem({ icon, label, link, activeItem, setActiveItem }) {
  return (
    <Link
      to={link}
      className={`flex flex-row justify-start items-center gap-3 w-full px-3 py-2.5 rounded-lg ${activeItem === label ? 'bg-[#149911]' : 'hover:bg-gray-700'} transition-all duration-300 ease-in-out cursor-pointer`}
      onClick={() => setActiveItem(label)}
    >
      <img src={icon} alt="" className="w-5 h-5" />
      <p className="text-sm leading-[143%] font-inter font-[500] tracking-[-0.28px]">{label}</p>
    </Link>
  );
}

// SidebarSubItem Component
// @ts-ignore
function SidebarSubItem({ label, link, activeItem, setActiveItem }) {
  return (
    <Link
      to={link}
      className={`flex flex-row justify-center items-center gap-3 w-full px-3 py-2.5 rounded-lg ${activeItem === label ? 'bg-[#149911]' : 'hover:bg-gray-700'} transition-all duration-300 ease-in-out cursor-pointer`}
      onClick={() => setActiveItem(label)}
    >
      <p className="text-xs leading-[133%] font-inter font-[500] tracking-[-0.24px]">{label}</p>
    </Link>
  );
}
