import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ChartBarIcon from './icons/ChartBarIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import CogIcon from './icons/CogIcon';
import LogoutIcon from './icons/LogoutIcon';
import TruckIcon from './icons/TruckIcon';

const Sidebar: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (auth) {
            auth.logout();
            navigate('/login');
        }
    };

    const navLinks = [
        { to: '/statistics', icon: <ChartBarIcon className="w-6 h-6" />, text: 'الإحصائيات' },
        { to: '/all-shipments', icon: <ClipboardListIcon className="w-6 h-6" />, text: 'كل الشحنات' },
        { to: '/manage-companies', icon: <CogIcon className="w-6 h-6" />, text: 'إدارة الشركات' },
    ];
    
    const activeLinkClass = "bg-primary-100 text-primary-600";
    const inactiveLinkClass = "text-gray-600 hover:bg-gray-100";


    return (
        <aside className="w-64 bg-white flex flex-col h-screen shadow-lg flex-shrink-0">
            <div className="flex items-center justify-center h-20 border-b">
                <TruckIcon className="w-10 h-10 text-primary-600" />
                <h1 className="text-2xl font-bold mr-2 text-gray-800">شحناتي</h1>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => 
                            `flex items-center p-3 rounded-lg transition-colors ${isActive ? activeLinkClass : inactiveLinkClass}`
                        }
                    >
                        {link.icon}
                        <span className="mr-4 font-medium">{link.text}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 text-gray-600 rounded-lg hover:bg-gray-100"
                >
                    <LogoutIcon className="w-6 h-6" />
                    <span className="mr-4 font-medium">تسجيل الخروج</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;